/**
 * @name CompilerV6.prototype._compileAsIncreasedTabulationMarkdownComment
 * @type 
 * @description 
 */
async _compileAsIncreasedTabulationMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  const increasionMatch = token.inner.match(/^(\+)+/g);
  const increasionText = (increasionMatch || [""])[0];
  const increasionNumber = increasionText.length+1;
  let output = "";
  // output += state.tabule(increasionNumber);
  output += this._removeInitialSpace(token.inner.substr(increasionNumber + 1));
  this._prependToParentCompilationFile(compilationFile, {
    prefix: "\n",
    tabulation: 1,
    body: output
  }, "md");
}