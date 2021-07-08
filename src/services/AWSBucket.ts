import { Rollbar } from './Rollbar';
import { SimpleTxtLogger } from './SimpleTxtLogger';
import { HelperService } from './HelperService';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';

// AWS Backing Service Class - This class is for full interactions with AWS S3 Buckets.
// This includes bucket management & S3 directory structure, and also both local & remote file management to/from S3.
export class AWSBucket {

    private AWS_S3: S3;
    private fullFileName: string;

    private txtLogger: SimpleTxtLogger;
    private rollbarLogger: Rollbar;

    // Initialise the AWS Connection and Client.
    constructor(txtLogger: SimpleTxtLogger, rollbarLogger: Rollbar) {
        this.txtLogger = txtLogger;
        this.rollbarLogger = rollbarLogger;

        this.fullFileName = '';

        aws.config.update({  region: process.env['AWS_REGION']  });
        this.AWS_S3 = new aws.S3({
            accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
            secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
        });

        this.txtLogger.writeToLogFile('Configured AWS S3.');
    }

    // S3 Bucket Infrastructure Methods: ----------------------------------------------------------------------------------------------

    public async findBucket(findBucket: string): Promise<number> {
        findBucket = HelperService.bucketFormat(findBucket);
        this.txtLogger.writeToLogFile(`Find bucket '${findBucket}'.`);

        let bucketFound = false;
        let status = false;
        
        await this.AWS_S3.listBuckets()
        .promise()
        .then((data: S3.ListBucketsOutput) => {
            if (!data.Buckets?.length) return;

            this.txtLogger.writeToLogFile('All Buckets:');
            data.Buckets.forEach((val, i) => {
                if (!val.Name) return;
                this.txtLogger.writeToLogFile(`${i+1}, '${val.Name}';`);
                if (findBucket == val.Name) bucketFound = true;
            });
        })
        .catch((err: Error) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            status = true;
        });

        if (status) return 500;
        else if (bucketFound) {
            this.txtLogger.writeToLogFile(`Found bucket '${findBucket}'.`);
            return 200;
        } else {
            this.txtLogger.writeToLogFile('Bucket Not Found.');
            return 404;
        }
    }

    public async listOrFindObjects(bucketName: string, findObject?: string): Promise< number | string[] > {
        bucketName = HelperService.bucketFormat(bucketName);
        this.txtLogger.writeToLogFile((findObject) ? `Find object '${findObject}' in bucket '${bucketName}'.`:`List all objects in bucket '${bucketName}'.`);

        const result: number = await this.findBucket(bucketName);

        if (result == 500) return 500;
        else if (result !== 200) {
            this.txtLogger.writeToLogFile(`Could not find Bucket '${bucketName}'. Failed to list Objects.`);
            return 400;
        }

        const objectsArray: string[] = [];
        let objectFound = false;
        let status = false;

        await this.AWS_S3.listObjectsV2({  Bucket: bucketName  })
        .promise()
        .then(async (data: S3.ListObjectsV2Output) => {
            if (!data.Contents?.length) return;
            this.txtLogger.writeToLogFile(`All Objects in Bucket '${bucketName}':`);

            data.Contents.forEach((val, i) => {
                if (!val.Key) return;
                this.txtLogger.writeToLogFile(`${i+1}, '${val.Key}';`);

                if (!findObject) objectsArray.push(`'${val.Key}'`);
                else if (findObject && HelperService.searchTerm(findObject) == HelperService.searchTerm(val.Key.toString())) {
                    objectFound = true;
                    this.fullFileName = val.Key.toString();
                }
            });
        })
        .catch((err: Error) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            status = true;
        });

        if (status) return 500;
        else if (objectFound) {
            this.txtLogger.writeToLogFile(`Found object '${findObject}'`);
            return 200;
        }
        else if (objectsArray.length) return objectsArray;
        else if (findObject) {
            this.txtLogger.writeToLogFile(`Could not find '${findObject}' in bucket '${bucketName}'.`);
            return 404;
        }
        else this.txtLogger.writeToLogFile(`Bucket '${bucketName}' is empty.`);
        return 400;
    }

    public async createBucket(newBucket: string): Promise<number> {
        newBucket =  HelperService.bucketFormat(newBucket);
        this.txtLogger.writeToLogFile(`Create bucket '${newBucket}'.`);

        const result: number = await this.findBucket(newBucket);

        if (result == 200) {
            this.txtLogger.writeToLogFile(`Bucket '${newBucket}' already exists. Failed to create a new bucket.`);
            return 400;
        } else if (result == 500) return 500;

        let status = false;
        const params: S3.CreateBucketRequest = {
            "Bucket": newBucket,
            "CreateBucketConfiguration": {
                "LocationConstraint": process.env['AWS_REGION']
            }
        };
        
        await this.AWS_S3.createBucket(params)
        .promise()
        .then(() => this.txtLogger.writeToLogFile(`Successfully created bucket '${newBucket}'.`))
        .catch((err: Error) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            status = true;
        });

        if (status) return 500;
        return 200;
    }

    // S3 File Management Methods: ----------------------------------------------------------------------------------------

    public async uploadFile(filePath: string, bucketName: string): Promise<number> {
        if (bucketName) bucketName = HelperService.bucketFormat(bucketName);
        const file: string = filePath.substr(filePath.lastIndexOf('/')+1);
        this.txtLogger.writeToLogFile(`Upload item '${filePath}' to bucket '${bucketName}'.`);

        const result: number | string[] = await this.listOrFindObjects(bucketName, file);

        if (result == 200) {
            this.txtLogger.writeToLogFile(`File already in bucket '${bucketName}'. Failed to upload '${file}'.`);
            return 400;
        } else if (result == 400) {
            this.txtLogger.writeToLogFile(`Bucket '${bucketName}' does not exist. Failed to upload '${file}'.`);
            return 400;
        } else if (result == 500) return 500;

        let status = false;
        const fsFile: fs.ReadStream = fs.createReadStream(filePath);
        const params: S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: file,
            Body: fsFile,
            ServerSideEncryption: process.env['AWS_ENCRYPTION']
        };

        await this.AWS_S3.upload(params)
        .promise()
        .then((data: S3.ManagedUpload.SendData) => this.txtLogger.writeToLogFile(`Successfully uploaded '${data.Key}' to bucket '${data.Bucket}'`))
        .catch((err: Error) => {
            this.rollbarLogger.rollbarError(err);
            this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
            status = true;
        })
        .finally(() => fsFile.destroy());

        if (status) return 500;
        return 200;
    }

    public async downloadFile(fileName: string, bucketName: string): Promise<number> {
        bucketName = HelperService.bucketFormat(bucketName);
        let fileExists = false;

        const result: number | string[] | S3.DeleteObjectsRequest = await this.listOrFindObjects(bucketName, fileName);

        if (result == 400) {
            this.txtLogger.writeToLogFile(`Bucket '${bucketName}' does not exist. Failed to download '${fileName}'.`);
            return 400;
        } else if (result == 404) {
            this.txtLogger.writeToLogFile(`'${bucketName}' does not contain '${fileName}'. Failed to download file.`);
            return 400;
        } else if (result == 500) return 500;

        if (!fs.existsSync('downloads')) fs.mkdirSync('downloads'); // '../downloads'

        if (this.fullFileName) try {
            await fs.promises.access(`downloads/${this.fullFileName}`);
            fileExists = true;
        } catch {
            this.txtLogger.writeToLogFile(`Download item '${fileName}' from bucket '${bucketName}'.`);
        }

        if (fileExists) {
            this.txtLogger.writeToLogFile(`'${this.fullFileName}' already exists locally in downloads folder. Failed to download file.`);
            return 400;
        }

        let status = false;
        const fsFile: fs.WriteStream = fs.createWriteStream(`downloads/${this.fullFileName}`);
        const params: S3.GetObjectRequest = {  Bucket: bucketName, Key: this.fullFileName  };

        await new Promise((resolve) => {
            const pipe = this.AWS_S3.getObject(params).createReadStream().pipe(fsFile);
            pipe.on('error', (err:Error) =>{
                this.rollbarLogger.rollbarError(err);
                this.txtLogger.writeToLogFile(`Error reported to Rollbar: ${err}`);
                status = true;
                resolve(this);
                pipe.destroy();
            });

            pipe.on('close', () => {
                this.txtLogger.writeToLogFile(`Successfully downloaded '${this.fullFileName}' from bucket '${bucketName}' to './downloads'`);
                resolve(this);
                pipe.destroy();
            });
        }).finally(() => fsFile.destroy());

        if (status) return 500;
        return 200;
    }
}