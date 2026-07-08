/**
 * @name CompilerV6.prototype._compileAsModulerSectionExpand
 * @type 
 * @description 
 */
_compileAsModulerSectionExpand(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionExpand", arguments);
    return false;
  }
}