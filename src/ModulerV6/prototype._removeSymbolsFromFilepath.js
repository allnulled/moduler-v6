/**
 * @name ModulerV6.prototype._removeSymbolsFromFilepath
 * @type 
 * @description 
 */
_removeSymbolsFromFilepath(filepathInput, returnData = false) {
  let output = filepathInput;
  const activeOptions = {};
  Remove_justTry_prefix: {
    if(output.startsWith("!")) {
      output = output.substr(1);
      activeOptions.justTry = true;
    }
  }
  if(returnData) {
    return [output, activeOptions];
  }
  return output;
}