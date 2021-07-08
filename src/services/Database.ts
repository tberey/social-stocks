import { Rollbar } from './Rollbar';
import { SimpleTxtLogger } from './SimpleTxtLogger';
import { HelperService } from './HelperService';
import mysql, { Pool } from 'mysql';
import Json2csvParser, { Parser } from 'json2csv';
import fs from 'fs';

export interface QueryReturnData extends Object {
    "Ticker_Symbol": string,
    "Tally": number
}

export class Database {

    private dbConnection: Pool;
    private dbTable: string;

    private txtLogger: SimpleTxtLogger;
    private rollbarLogger: Rollbar;

    private csvParser: Parser<object>;

    static dbTxtLogger = new SimpleTxtLogger(HelperService.newDateTime(), 'Database', 'MySQL DB');

    constructor(txtLogger: SimpleTxtLogger, rollbarLogger: Rollbar) {
        this.txtLogger = txtLogger;
        this.rollbarLogger = rollbarLogger;

        this.csvParser = new Json2csvParser.Parser({ header: true});

        this.dbTable = process.env['DB_TABLE'] || 'Error: Missing Table in .env';
        this.dbConnection = mysql.createPool({
            connectionLimit: 30,
            'host': process.env['DB_HOST'],
            'user': process.env['DB_USER'],
            'password': process.env['DB_PASSWORD'],
            'database': process.env['DB_NAME']
        });
        
        this.txtLogger.writeToLogFile('Configured Database.');
    }

    public close(): void {
        this.dbConnection.end((err) => {
            if (err) {
                this.rollbarLogger.rollbarError(err);
                this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            }
        });
        this.txtLogger.writeToLogFile('Database Disconnected.');
    }

    public addTickerData(data: object): void {
        const processedData: string[] | null = HelperService.tickerDataBuilder(`${JSON.stringify(data)}`);

        if (processedData && processedData.length) processedData.forEach((term:string) => {
            const sqlGap: string = HelperService.sentimentAnalysis(`${JSON.stringify(data)}`);
            const sql =
            `INSERT INTO ${this.dbTable}_${HelperService.dayOfWeek()} (Ticker_Symbol,Day) VALUES('${term.toUpperCase()}','${new Date().getDay()}') `+
            `ON DUPLICATE KEY UPDATE${sqlGap}Tally = Tally + 1`;

            Database.dbTxtLogger.appendToLogFile(sql);

            this.dbConnection.query(sql, (err, result) => {
                if (err) {
                    this.rollbarLogger.rollbarError(err);
                    this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                    Database.dbTxtLogger.appendToLogFile(`Error reported to Rollbar: ${err}`);
                } else if (result) Database.dbTxtLogger.appendToLogFile(`Results INSERT('${term.toUpperCase()}'): ${JSON.stringify(result)}`);
            });
        });
    }

    public async getDailyTopData(day = HelperService.dayOfWeek()): Promise<QueryReturnData[] > {
        return await new Promise<QueryReturnData[] > ((resolve,reject): void => {

            let data: QueryReturnData[] = [];
            const sql = `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_${day} ORDER BY Tally DESC LIMIT 8`;

            Database.dbTxtLogger.appendToLogFile(sql);

            this.dbConnection.query(sql, (err, result) => {
                if (err) {
                    this.rollbarLogger.rollbarError(err);
                    this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                    Database.dbTxtLogger.appendToLogFile(`Error reported to Rollbar: ${err}`);
                    reject(err);
                } else if (result) {
                    data = result;
                    Database.dbTxtLogger.appendToLogFile(`Results SELECT('Ticker_Symbol','Tally'): ${JSON.stringify(result)}`);
                    resolve(data);
                }
            });
        });
    }

    public async getWeeklyTopData(): Promise<QueryReturnData[] > {
        return await new Promise<QueryReturnData[] > ((resolve,reject): void => {

            let data: QueryReturnData[] = [];
            const sql =
                'SELECT Ticker_Symbol, SUM(Tally) FROM ('+
                    `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_monday UNION ALL `+
                    `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_tuesday UNION ALL `+
                    `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_wednesday UNION ALL `+
                    `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_thursday UNION ALL `+
                    `SELECT Ticker_Symbol,Tally FROM ${this.dbTable}_friday `+
                ') X GROUP BY Ticker_Symbol ORDER BY SUM(Tally) DESC LIMIT 8';

            Database.dbTxtLogger.appendToLogFile(sql);

            this.dbConnection.query(sql, (err, result) => {
                if (err) {
                    this.rollbarLogger.rollbarError(err);
                    this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                    Database.dbTxtLogger.appendToLogFile(`Error reported to Rollbar: ${err}`);
                    reject(err);
                } else if (result) {
                    data = result;
                    Database.dbTxtLogger.appendToLogFile(`Results SELECT('Ticker_Symbol','Tally'): ${JSON.stringify(result)}`);
                    resolve(data);
                }
            });
        });
    }

    public async getWeeklySingleTickerData(ticker: string): Promise<QueryReturnData[] > {
        return await new Promise<QueryReturnData[] > ((resolve,reject): void => {

            let data: QueryReturnData[] = [];
            const sql =
                `(SELECT * from ${this.dbTable}_monday WHERE Ticker_Symbol = '${ticker}') `+
                'UNION '+
                `(SELECT * from ${this.dbTable}_tuesday WHERE Ticker_Symbol = '${ticker}') `+
                'UNION '+
                `(SELECT * from ${this.dbTable}_wednesday WHERE Ticker_Symbol = '${ticker}') `+
                'UNION '+
                `(SELECT * from ${this.dbTable}_thursday WHERE Ticker_Symbol = '${ticker}') `+
                'UNION '+
                `(SELECT * from ${this.dbTable}_friday WHERE Ticker_Symbol = '${ticker}') ORDER BY Day ASC`;

            Database.dbTxtLogger.appendToLogFile(sql);

            this.dbConnection.query(sql, (err, result) => {
                if (err) {
                    this.rollbarLogger.rollbarError(err);
                    this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                    Database.dbTxtLogger.appendToLogFile(`Error reported to Rollbar: ${err}`);
                    reject(err);
                } else if (result) {
                    data = result;
                    Database.dbTxtLogger.appendToLogFile(`Results SELECT('Ticker_Symbol','Tally'): ${JSON.stringify(result)}`);
                    resolve(data);
                }
            });
        });
    }

    public async exportTable(day: string = HelperService.dayOfWeek(), fileName: string = HelperService.newDateTime()): Promise<string> {
        return await new Promise<string> ((resolve): void => {
            
            let data: QueryReturnData[] = [];
            const sql = `SELECT * from ${this.dbTable}_${day}`;
            Database.dbTxtLogger.appendToLogFile(sql);

            this.dbConnection.query(sql, (err, result) => {
                if (err) throw err;
                else if (result) {
                    data = result;
                    Database.dbTxtLogger.appendToLogFile(`Results SELECT *: ${JSON.stringify(result)}`);

                    const jsonData = JSON.parse(JSON.stringify(data));
                    const csv: string = this.csvParser.parse(jsonData);

                    if (!fs.existsSync('exports')) fs.mkdirSync('exports');
                    fs.writeFile(`exports/${fileName}.csv`, csv, (err) => {
                        if (err) throw err;
                        this.txtLogger.writeToLogFile(`Successfully exported table ${day} to file: ${fileName}.csv`);
                        resolve(csv);
                    });
                }
            })
        }).catch((err: Error) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            Database.dbTxtLogger.appendToLogFile(`Error reported to Rollbar: ${err}`);
            return 'Error'
        });
    }
}