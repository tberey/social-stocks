import axios from 'axios';
import { Chartjs } from '../Chartjs';
import { SimpleTxtLogger } from '../SimpleTxtLogger';
import { Rollbar } from '../Rollbar';
import { HelperService } from '../HelperService';
import { ServerSetup } from '../../ServerSetup';

const txtLogger: SimpleTxtLogger = new SimpleTxtLogger(HelperService.newDateTime(), 'Client', ServerSetup.appName);
const rollbarLogger: Rollbar = new Rollbar(txtLogger, ServerSetup.appName);
txtLogger.writeToLogFile('...::CLIENT-SIDE APPLICATION STARTING::...');
const chartjs = new Chartjs(txtLogger, rollbarLogger);

/* eslint-disable */
window.addEventListener('DOMContentLoaded', async () => {
  txtLogger.writeToLogFile('Client Ready to Serve.');

  const ctx = <HTMLCanvasElement>document.getElementById('chart');
  chartjs.renderChart(ctx);

  document.getElementById('chart-refresh-submit')?.addEventListener('click', () => {
    const reqType: string | null = (<HTMLInputElement>document.getElementById('chart-filter-select')).value;
    chartjs.renderChart(ctx, false, reqType);
  });

  document.getElementById('chart-filter-select')?.addEventListener('change', () => {
    const reqType: string | null = (<HTMLInputElement>document.getElementById('chart-filter-select')).value;
    chartjs.renderChart(ctx, false, reqType);
  });

  document.getElementById('chart-swap-submit')?.addEventListener('click', () => {
    if (!document.getElementById('chart-filter-select')!.hidden) document.getElementById('chart-filter-select')!.hidden = true;
    else document.getElementById('chart-filter-select')!.hidden = false;
    
    const reqType: string | null = (<HTMLInputElement>document.getElementById('chart-filter-select')).value;
    chartjs.renderChart(ctx, true, reqType);
  });

  document.getElementById('list-buckets-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('list-buckets-submit')).disabled = true;
    document.getElementById('list-buckets-list')!.innerHTML = '';

    await axios.get('http://localhost:3030/listBuckets')
    .then(res => {
      rollbarLogger;
      console.log(`statusCode: ${res.status}`);
      res.data?.forEach((val: string) => {
        const node = document.createElement("TR");
        const text = document.createTextNode(val);
        node.appendChild(text); 
        document.getElementById('list-buckets-list')?.appendChild(node);
        (<HTMLInputElement>document.getElementById('list-buckets-submit')).disabled = false;
      });
    })
    .catch((err: Error) => {
      document.getElementById('list-buckets-list')!.innerHTML = 'Failed to List Buckets.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('list-buckets-submit')).disabled = false;
    });
  });

  document.getElementById('upload-file-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('upload-file-submit')).disabled = true;

    const bucket: string = (<HTMLInputElement>document.getElementById('upload-file-input-bucket')).value;
    const file: FileList | null = (<HTMLInputElement>document.getElementById('upload-file-input-file')).files;

    if (!file?.length) return;

    const payload: object = {  "bucket": bucket, "filePath": file?.item(0)?.path  };

    await axios.post('http://localhost:3030/uploadFile', payload)
    .then(res => {
      document.getElementById('upload-file-message')!.innerHTML = 'Successfully Uploaded File!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('upload-file-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('upload-file-input-file')).value = '';
      (<HTMLInputElement>document.getElementById('upload-file-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('upload-file-message')!.innerHTML = 'Failed to Upload File.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('upload-file-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('upload-file-input-file')).value = '';
      (<HTMLInputElement>document.getElementById('upload-file-submit')).disabled = false;
    });
  });

  document.getElementById('download-file-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('download-file-submit')).disabled = true;

    const bucket: string = (<HTMLInputElement>document.getElementById('download-file-input-bucket')).value;
    const file: string = (<HTMLInputElement>document.getElementById('download-file-input-object')).value;

    if (!file?.length) return;

    const payload: object = {  "bucket": bucket, "file": file  };

    await axios.post('http://localhost:3030/downloadFile', payload)
    .then(res => {
      document.getElementById('download-file-message')!.innerHTML = 'Successfully Downloaded File!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('download-file-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('download-file-input-object')).value = '';
      (<HTMLInputElement>document.getElementById('download-file-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('download-file-message')!.innerHTML = 'Failed to Download File.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('download-file-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('download-file-input-object')).value = '';
      (<HTMLInputElement>document.getElementById('download-file-submit')).disabled = false;
    });
  });

  document.getElementById('find-bucket-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('find-bucket-submit')).disabled = true;

    const bucket: string | null = (<HTMLInputElement>document.getElementById('find-bucket-input')).value;
    const payload: object = {  'bucket': bucket  };

    await axios.get('http://localhost:3030/findBucket', {  params: payload  })
    .then(res => {
      document.getElementById('find-bucket-message')!.innerHTML = 'Found Bucket!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('find-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('find-bucket-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('find-bucket-message')!.innerHTML = 'Failed to Find Bucket.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('find-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('find-bucket-submit')).disabled = false;
    });
  });

  document.getElementById('find-object-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('find-object-submit')).disabled = true;

    const bucket: string | null = (<HTMLInputElement>document.getElementById('find-object-input-bucket')).value;
    const object: string | null = (<HTMLInputElement>document.getElementById('find-object-input-object')).value;
    const payload: object = {  'bucket': bucket, 'object': object  };

    await axios.get('http://localhost:3030/findObject', {  params: payload  })
    .then(res => {
      document.getElementById('find-object-message')!.innerHTML = 'Found Object!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('find-object-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('find-object-input-object')).value = '';
      (<HTMLInputElement>document.getElementById('find-object-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('find-object-message')!.innerHTML = 'Failed to Find Object.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('find-object-input-bucket')).value = '';
      (<HTMLInputElement>document.getElementById('find-object-input-object')).value = '';
      (<HTMLInputElement>document.getElementById('find-object-submit')).disabled = false;
    });
  });

  document.getElementById('create-bucket-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('create-bucket-submit')).disabled = true;

    const bucket: string | null = (<HTMLInputElement>document.getElementById('create-bucket-input')).value;
    const payload: object = {  "bucket": bucket  };

    await axios.post('http://localhost:3030/createBucket', payload)
    .then(res => {
      document.getElementById('create-bucket-message')!.innerHTML = 'Successfully Created Bucket!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('create-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('create-bucket-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('create-bucket-message')!.innerHTML = 'Failed to Create Bucket.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('create-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('create-bucket-submit')).disabled = false;
    });
  });

  document.getElementById('list-objects-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('list-objects-submit')).disabled = true;
    document.getElementById('list-objects-list')!.innerHTML = '';
    
    const bucket: string | null = (<HTMLInputElement>document.getElementById('list-objects-input')).value;
    if (!bucket) return;
    const payload: object = {  "bucket": bucket  };

    await axios.get('http://localhost:3030/listObjects', {  params: payload  })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      res.data?.forEach((val: string) => {
        const node = document.createElement("TR");
        const text = document.createTextNode(val);
        node.appendChild(text); 
        document.getElementById('list-objects-list')?.appendChild(node);
        (<HTMLInputElement>document.getElementById('list-objects-input')).value = '';
        (<HTMLInputElement>document.getElementById('list-objects-submit')).disabled = false;
      });
    })
    .catch((err: Error) => {
      document.getElementById('list-objects-list')!.innerHTML = 'Failed to List Objects.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('list-objects-input')).value = '';
      (<HTMLInputElement>document.getElementById('list-objects-submit')).disabled = false;
    });
  });

  document.getElementById('delete-bucket-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('delete-bucket-submit')).disabled = true;

    const bucket: string | null = (<HTMLInputElement>document.getElementById('delete-bucket-input')).value;
    if (!bucket) return;
    const payload: object = {  "bucket": bucket  };

    await axios.delete('http://localhost:3030/deleteBucket', {  data: payload  })
    .then(res => {
      document.getElementById('delete-bucket-message')!.innerHTML = 'Successfully Deleted Bucket!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('delete-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('delete-bucket-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('delete-bucket-message')!.innerHTML = 'Failed to Delete Bucket.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('delete-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('delete-bucket-submit')).disabled = false;
    });
  });

  document.getElementById('empty-bucket-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('empty-bucket-submit')).disabled = true;

    const bucket: string | null = (<HTMLInputElement>document.getElementById('empty-bucket-input')).value;
    if (!bucket) return;
    const payload: object = {  "bucket": bucket  };

    await axios.delete('http://localhost:3030/emptyBucket', {  data: payload  })
    .then(res => {
      document.getElementById('empty-bucket-message')!.innerHTML = 'Successfully Emptied Bucket!';
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('empty-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('empty-bucket-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('empty-bucket-message')!.innerHTML = 'Failed to Empty Bucket.';
      console.error(err);
      (<HTMLInputElement>document.getElementById('empty-bucket-input')).value = '';
      (<HTMLInputElement>document.getElementById('empty-bucket-submit')).disabled = false;
    });
  });

  document.getElementById('tweet-rules-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('tweet-rules-submit')).disabled = true;

    const reqType: string | null = (<HTMLInputElement>document.getElementById('tweet-rules-input-req')).value;
    const id: string | null = (<HTMLInputElement>document.getElementById('tweet-rules-input-id')).value;
    const rule: string | null = (<HTMLInputElement>document.getElementById('tweet-rules-input-rule')).value;
    const desc: string | null = (<HTMLInputElement>document.getElementById('tweet-rules-input-desc')).value;
    const payload: object = 
      {
        "reqType": reqType,
        "id": id,
        "rule": rule,
        "description": desc
      };

    await axios.post('http://localhost:3030/tweetStreamRules', payload)
    .then(res => {
      document.getElementById('tweet-rules-message')!.innerHTML = `Successfully ${reqType}ed Tweet Stream!`;
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('tweet-rules-input-id')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-input-desc')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-input-rule')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('tweet-rules-message')!.innerHTML = `Failed to ${reqType} Tweet Stream.`;
      console.error(err);
      (<HTMLInputElement>document.getElementById('tweet-rules-input-id')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-input-desc')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-input-rule')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-rules-submit')).disabled = false;
    });
  });

  document.getElementById('tweet-stream-submit')?.addEventListener('click', async () => {
    (<HTMLInputElement>document.getElementById('tweet-stream-submit')).disabled = true;

    const reqType: string | null = (<HTMLInputElement>document.getElementById('tweet-stream-input')).value;
    const reqNo: string | null = (<HTMLInputElement>document.getElementById('tweet-stream-input-number')).value;
    const capture: string | null = (<HTMLInputElement>document.getElementById('tweet-stream-input-capture')).value;
    const payload: object = {  "reqType": reqType, "reqNo": reqNo, "capture": capture  };

    await axios.post('http://localhost:3030/tweetStream', payload)
    .then(res => {
      document.getElementById('tweet-stream-message')!.innerHTML = `Successfully ${reqType}ed Tweet Stream!`;
      console.log(`statusCode: ${res.status}`);
      (<HTMLInputElement>document.getElementById('tweet-stream-input-number')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-stream-submit')).disabled = false;
    })
    .catch((err: Error) => {
      document.getElementById('tweet-stream-message')!.innerHTML = `Failed to ${reqType} Tweet Stream.`;
      console.error(err);
      (<HTMLInputElement>document.getElementById('tweet-stream-input-number')).value = '';
      (<HTMLInputElement>document.getElementById('tweet-stream-submit')).disabled = false;
    });
  });
});
/* eslint-enable */