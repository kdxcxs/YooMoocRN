import iconv from 'iconv-lite';
import {Buffer} from 'buffer';

function post(url, data) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (request.status === 200) {
        resolve(iconv.decode(Buffer.from(request.response), 'gbk'));
      } else {
        reject(new Error(request.statusText));
      }
    };
    request.onerror = () => reject(new Error(request.statusText));
    request.responseType = 'arraybuffer';

    request.open('POST', url);
    for (let headerKey in data.headers) {
      request.setRequestHeader(headerKey, data.headers[headerKey]);
    }
    request.send(data.body);
  });
}

export {post};
