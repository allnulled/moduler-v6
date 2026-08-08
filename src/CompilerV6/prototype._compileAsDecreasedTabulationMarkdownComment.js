/**
 * @name CompilerV6.prototype._compileAsDecreasedTabulationMarkdownComment
 * @type 
 * @description 
 */
async _compileAsDecreasedTabulationMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  const decreasionMatch = token.inner.match(/^(\-)+/g);
  const decreasionText = (decreasionMatch || [""])[0];
  const decreasionNumber = decreasionText.length+1;
  let output = "\n";
  output += state.tabule(-1*decreasionNumber);
  output += this._removeInitialSpace(token.inner.substr(decreasionNumber + 1));
  this._prependToParentCompilationFile(compilationFile, output, "md");
}