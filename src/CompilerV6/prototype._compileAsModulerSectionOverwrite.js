/**
 * @name CompilerV6.prototype._compileAsModulerSectionOverwrite
 * @type 
 * @description 
 */
_compileAsModulerSectionOverwrite(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionOverwrite", arguments);
    return false;
  }
}