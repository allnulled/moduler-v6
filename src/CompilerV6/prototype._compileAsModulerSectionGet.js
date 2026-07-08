/**
 * @name CompilerV6.prototype._compileAsModulerSectionGet
 * @type 
 * @description 
 */
_compileAsModulerSectionGet(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionGet", arguments);
    return false;
  }
}