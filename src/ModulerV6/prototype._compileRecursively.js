/**
 * @name ModulerV6.prototype._compileRecursively
 * @type private class method
 * @description 
 */
async _compileRecursively(fileParameters = {}, processParameters = {}) {
  this._traceIn("_compileRecursively", arguments);
  this._assert(typeof fileParameters === "object", "Parameter «fileParameters» must be object on «ModulerV6.prototype._compileRecursively»");
  this._assert(typeof fileParameters.resource === "string", "Parameter «fileParameters.resource» must be string on «ModulerV6.prototype._compileRecursively»");
  this._assert(typeof processParameters === "object", "Parameter «processParameters» must be object on «ModulerV6.prototype._compileRecursively»");
  const compilationFile = this.constructor.CompilationFile.from(fileParameters, processParameters, this);
  const compilationProcess = this.constructor.CompilationProcess.from(fileParameters, processParameters, this);
  Entry_in_tree: {
    const id = this.rootpathOf(compilationFile.resource);
    compilationFile.report.tree[id] = compilationFile.report.tree[id] || {};
  }
  const submoduler = this._cloneForFile(compilationFile.resource, this);
  await submoduler._fetchCompilable(compilationFile, compilationProcess);
  submoduler._tokenizeText(compilationFile, compilationProcess);
  await submoduler._compileTokens(compilationFile, compilationProcess);
  const output = this._getPreferredOutput(compilationFile, compilationProcess);
  this._traceOut("_compileRecursively", arguments);
  return output;
}