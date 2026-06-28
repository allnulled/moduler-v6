/**
 * @name CompilerV6.prototype._getPreferredOutput
 * @type 
 * @description 
 */
_getPreferredOutput(compilationFile, compilationProcess) {
  this._trace("_getPreferredOutput", arguments);
  return {
    file: compilationFile.resource,
    report: compilationProcess.to === "data" ? compilationFile.report : false,
    ...compilationFile.compilation,
  };
}