
import Promise from 'bluebird';
const fs =Promise.promisifyAll(require('fs'));
const logger = require('debug')('easybak');
//param: backup file path or directory
//meta:
export function backup(param, metaPath){
  const meta = getMeta(metaPath);
  if(!param || param.length < 1){
    logger('parameter error for backup');
    return Promise.reject('parameter error for backup');
  }
  const src = param[0], dst = param[1];
  return copyfile(src, dst);
}

export function restore(param, metaPath){
  const meta = getMeta(metaPath);
  if(!param || param.length < 1){
    logger('parameter error for restore');
    return Promise.reject('parameter error for restore');
  }
  const src = param[]
}

function copyfile(src, dst){}

function getMeta(metaPath){
  return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
}
