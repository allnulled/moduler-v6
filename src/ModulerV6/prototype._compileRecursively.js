/**
 * @name ModulerV6.prototype._compileRecursively
 * @type private class method
 * @description 
 */
async _compileRecursively(compilationFile = {}, compilationProcess = {}) {
  this._traceIn("_compileRecursively", arguments);
  this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._compileRecursively»");
  this._assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.prototype._compileRecursively»");
  this._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.prototype._compileRecursively»");
  const metadataForFile = this.constructor.CompilationFile.from(compilationFile, compilationProcess, this);
  const metadataForProcess = this.constructor.CompilationProcess.from(compilationFile, compilationProcess, this);
  const submoduler = this._cloneForFile(metadataForFile.resource, this);
  await submoduler._fetchCompilable(metadataForFile, metadataForProcess);
  submoduler._tokenizeText(metadataForFile, metadataForProcess);
  await submoduler._compileTokens(metadataForFile, metadataForProcess);
  const output = this._getPreferredOutput(metadataForFile, metadataForProcess);
  this._traceOut("_compileRecursively", arguments);
  return output;
}