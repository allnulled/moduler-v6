/**
 * @name ModulerV6.prototype._getPreferredOutput
 * @type 
 * @description 
 */
_getPreferredOutput(compilationFile, compilationProcess) {
  this._trace("_getPreferredOutput", arguments);
  let output = undefined;
  if(compilationFile.to === "data") {
    output = compilationFile.report;
  } else {
    output = compilationFile.compilation;
  }
  Object.assign(output, {
    file: compilationFile.resource,
  });
  return output;
}