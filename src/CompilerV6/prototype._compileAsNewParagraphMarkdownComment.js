/**
 * @name CompilerV6.prototype._compileAsNewParagraphMarkdownComment
 * @type 
 * @description 
 */
async _compileAsNewParagraphMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  let output = "";
  // output += "\n\n";
  // output += state.tabule(0);
  output += this._removeInitialSpace(token.inner);
  this._prependToParentCompilationFile(compilationFile, {
    prefix: "\n\n",
    tabulation: 0,
    body: output
  }, "md");
}