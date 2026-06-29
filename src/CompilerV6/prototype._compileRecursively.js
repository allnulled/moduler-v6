/**
 * @name CompilerV6.prototype._compileRecursively
 * @type private class method
 * @description 
 */
async _compileRecursively(fileParameters = {}, processParameters = {}) {
  this._traceIn("_compileRecursively", arguments);
  this.assert(typeof fileParameters === "object", "Parameter «fileParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof fileParameters.resource === "string", "Parameter «fileParameters.resource» must be string on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof processParameters === "object", "Parameter «processParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  const compilationFile = this.constructor.CompilationFile.from(fileParameters, processParameters, this);
  const compilationProcess = this.constructor.CompilationProcess.from(fileParameters, processParameters, this);
  Entry_in_tree: {
    const id = this.rootpathOf(compilationFile.resource);
    compilationFile.report.tree[id] = compilationFile.report.tree[id] || {};
  }
  const subcompiler = this._cloneForFile(compilationFile.resource, this);
  compilationFile.subcompiler = subcompiler;
  await subcompiler._fetchCompilable(compilationFile, compilationProcess);
  subcompiler._tokenizeText(compilationFile, compilationProcess);
  await subcompiler._compileTokens(compilationFile, compilationProcess);
  const output = subcompiler._getPreferredOutput(compilationFile, compilationProcess);
  this._traceOut("_compileRecursively", arguments);
  return output;
}