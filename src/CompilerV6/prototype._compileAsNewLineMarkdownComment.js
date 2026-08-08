/**
 * @name CompilerV6.prototype._compileAsNewLineMarkdownComment
 * @type 
 * @description 
 */
async _compileAsNewLineMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  let output = "";
  output += "\n"
  output += state.tabule(0);
  output += this._removeInitialSpace(token.inner);
  this._prependToParentCompilationFile(compilationFile, output, "md");
}