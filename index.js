import readline from 'readline';
import {handle} from './lib';
import debug from 'debug';

const logger = debug('easybak');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('input file path or directory > ');
rl.prompt();
const cmds = [];
const META_DATA = './data/meta.json';
const EXIT_MSG = 'Thanks for using, now exit ...';
const UNKOWN_CMD = 'Unkow command, try again ...';

function wrap(){
  const outerArgs = Array.prototype.slice.call(arguments);
  const fn = outerArgs[0];
  if(typeof fn !== 'function'){
    logger('wrong arguments for wrap method');
    throw new Error('wrong arguments for wrap method');
  }
  return function(){
    const args = Array.prototype.slice.call(arguments);
    args.unshift(outerArgs.slice(1));
    return fn.apply(null, args).then(() => {
      rl.prompt();
    }).catch((e) => {
      logger(e);
    });
  };
}

const operate = wrap(handle, META_DATA);

rl.on('line', (line) => {
  const cmd = line.toLowerCase().split(' ');
  switch(cmd[0]){
    case 'rt':
    case 'bk':
      cmds.push(line);
      rl.prompt();
      break;
    case 'ok':
      operate(cmds);
      break;
    case 'close':
    case 'exit':
    case 'quit':
      operate(cmds);
      console.log(EXIT_MSG);
      process.exit(0);
    default:
      console.log(UNKOWN_CMD);
  }
}).on('close', () => {
  console.log(EXIT_MSG);
  process.exit(0);
});
