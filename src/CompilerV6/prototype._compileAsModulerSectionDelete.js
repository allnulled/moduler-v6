/**
 * @name CompilerV6.prototype._compileAsModulerSectionDelete
 * @type 
 * @description 
 */
_compileAsModulerSectionDelete(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionDelete", arguments);
    return false;
  }
}