
export function splitCmd(cmd){
  const ret = {
    operation:'',
    param:[],
  };
  if(cmd){
    const parts = cmd.split(' ');
    ret.operation = parts[0];
    ret.param = parts.slice(1);
  }
  return ret;
}

export function judge(operation, operationType){
  if(operation && operationType){
    return operation.toUpperCase() === operationType;
  }
  return false;
}
