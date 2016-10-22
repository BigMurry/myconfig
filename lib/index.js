import debug from 'debug';
import Promise from 'bluebird';
import {backup, restore} from './action';
import Operation from './type';
import {splitCmd, judge} from 'util';

const logger = debug('easybak');

export function handle(cmds, metaPath){
  if(!Array.isArray(cmds)){
    logger('handle function accept an array as the argument');
    return;
  }

  //const _meta = fs.readFileSync(metadata, 'utf8')
  //const meta = JSON.parse(_meta);

  const bks = [];
  const rts = [];
  cmds.forEach((cmd, idx) => {
    const {operation, param} = splitCmd(cmd);
    if(judge(operation, Operation.BACKUP)){
      bks.push(backup(param, metaPath));
    }
    if(judge(operation, Operation.RESTORE)){
      rts.push(restore(param, metaPath));
    }
    logger('invalid command, pass by: %s', cmd);
  });
  return new Promise((resolve, reject) => {
    Promise.all(bks)
      .then(() => {
          Promise.all(rts)
            .then(() => {
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
      })
      .catch((e) => {
        reject(e);
      });
  });
}
