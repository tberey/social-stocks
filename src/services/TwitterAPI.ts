import { Rollbar } from './Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';
import { Database } from './Database';
import { IncomingMessage, ClientRequest } from "http";
import https from "https";

export class TwitterAPI {

    private apihostname: string;
    private apibearerToken: string | undefined;

    private txtLogger: SimpleTxtLogger;
    private rollbarLogger: Rollbar;

    private db: Database;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private streamConnection: any; // Causes unresolvable errors.
    private apiData: object[];
    private capture: boolean;
    private tweetStreamActive: boolean;
    private tweetCountActive: boolean;
    private tweetsLimit: number;
    private tweetsCount: number;
    private preventClose: boolean;

    constructor(txtLogger: SimpleTxtLogger, rollbarLogger: Rollbar) {
        this.txtLogger = txtLogger;
        this.rollbarLogger = rollbarLogger;

        this.db = new Database(txtLogger, rollbarLogger);

        this.apihostname = 'api.twitter.com';
        this.apibearerToken = process.env['TWITTER_BEARER_TOKEN'];

        this.apiData = [];
        this.capture = false;
        this.tweetStreamActive = false;
        this.tweetCountActive = false;
        this.preventClose = true;
        this.tweetsLimit = 0;
        this.tweetsCount = 0;

        this.txtLogger.writeToLogFile('Configured TwitterAPI.');
    }


    public async tweetStreamRules(requestType: string, id?: string, rule?: string, description?: string): Promise<object[] | number> {
        let reqBody: object = {};
        const options: https.RequestOptions = {
            hostname: this.apihostname,
            path: '/2/tweets/search/stream/rules',
            method: 'GET',
            headers: { 
                Authorization: `Bearer ${this.apibearerToken}`,
                'Content-Type': 'application/json'
            }
        }

        if (rule && requestType == 'add') {
            options.method = 'POST';
            reqBody = {
                'add': [{
                    "value": `${rule}`,
                    "tag": `${description}`
                }]
            };
        } else if (id && requestType == 'delete') {
            options.method = 'POST';
            reqBody = {  'delete': {  'ids': [`${id}`]  }  };
        }

        return await new Promise<object[] | number> ((resolve): void => {
            const apidata: object[] = [];
            const req: ClientRequest = https.request(options, (r: IncomingMessage): void => {

                r.on('data', (data) => apidata.push(JSON.parse(data)));

                r.on('end'||'close', () => {
                    this.txtLogger.writeToLogFile(`Rules Request Response:\n${JSON.stringify(apidata)}`);
                    resolve(apidata);
                });

                r.on('error', (err: Error) => { throw(err); });
                if (r.statusCode && (r.statusCode < 200 || r.statusCode > 299)) { throw new Error(`Status: ${r.statusCode}, Message: ${r.statusMessage}`); }

            }).on('error', (err:Error) => { throw(err); });
            
            if (requestType && requestType != 'get') {
                this.txtLogger.writeToLogFile(`${requestType.toUpperCase()} a Tweet Stream Rule.`);
                req.write(JSON.stringify(reqBody));
            } else this.txtLogger.writeToLogFile('List All Tweet Stream Rules.');
            
            req.end(()=>{
                if (requestType == 'add') resolve(200);
            });
        })
        .catch((err: Error | string) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            return 500;
        });
    }


    public async tweetStream(requestType: string, capture?: string, requestedNumber?: number): Promise<object[] | number> {
        const agent = new https.Agent({
            keepAlive: true,
            maxSockets: 2,
            maxFreeSockets: 1,
            maxTotalSockets: 2
        });

        const options = {
            agent: agent,
            hostname: this.apihostname,
            path: '/2/tweets/search/stream?tweet.fields=text',
            method: 'GET',
            headers: {  Authorization: `Bearer ${this.apibearerToken}`  }
        };

        return await new Promise<object[] | number> ((resolve): void => {

            if (this.tweetStreamActive && requestType == 'close') {
                this.txtLogger.writeToLogFile('Closing Tweet Stream.');
                this.preventClose = false;
                this.streamConnection.destroy();
                resolve(this.apiData);

            } else if (!this.tweetStreamActive && requestType == 'open') {

                (capture && capture == "true") ? this.capture = true : this.capture = false;

                this.streamConnection = https.request(options, (r: IncomingMessage): void => {
                    this.txtLogger.writeToLogFile('Opening Tweet Stream.');

                    const resolveReq = () => {
                        this.apiData = [];
                        this.tweetStreamActive = true;
                        this.preventClose = true;
                        this.txtLogger.writeToLogFile('Successfully Opened Tweet Stream.');

                        if (requestedNumber) {
                            this.tweetsLimit = requestedNumber;
                            this.tweetsCount = 0;
                            this.tweetCountActive = true;
                        }

                        resolve(200);
                    }

                    r.on('data', (data) => {
                        if (!this.tweetStreamActive) resolveReq();
                        if (data.length < 3) return;

                        this.apiData.push(JSON.parse(data));
                        if (this.capture) {
                            this.db.addTickerData(JSON.parse(data));
                        }

                        if (this.tweetCountActive) this.tweetsCount++;
                        if (this.tweetCountActive && this.tweetsCount >= this.tweetsLimit) {
                            this.txtLogger.writeToLogFile('User Tweet Limit Reached. Closing Stream...');
                            this.preventClose = false;
                            r.destroy();
                        }
                    });

                    r.on('close'||'end', () => {
                        this.txtLogger.dumpToNewTxtFile(`${JSON.stringify(this.apiData)}`.replace(/({"data":)/g, '\n{"data":'),`tweets_data#${JSON.stringify(this.apiData).length}`);
                        this.txtLogger.writeToLogFile('Successfully Closed Tweet Stream. Outputted tweet data to txt file, in logs folder.');
                        this.tweetStreamActive = false;
                        this.tweetCountActive = false;
                        if (this.preventClose) this.restartStream();
                    });

                    r.on('error', (err: Error) => { throw(err); });

                    if (r.statusCode && (r.statusCode < 200 || r.statusCode > 299)) { throw new Error(`Status: ${r.statusCode}, Message: ${r.statusMessage}`); }
                })
                .on('error', (err:Error) => { throw(err); })
                .end();

            } else { resolve(400); }

        })
        .catch((err: Error | string) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            this.preventClose = false;
            this.streamConnection.destroy();
            this.tweetStreamActive = false;
            this.tweetCountActive = false;
            return 500;
        });
    }

    private restartStream(): void {
        this.txtLogger.writeToLogFile('Auto-Close Occurred. Restarting Tweet Stream...');
        this.tweetStream('open', this.capture.toString());
    }
}