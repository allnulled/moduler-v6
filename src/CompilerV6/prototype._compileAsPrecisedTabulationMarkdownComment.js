/**
 * @name CompilerV6.prototype._compileAsPrecisedTabulationMarkdownComment
 * @type 
 * @description 
 */
async _compileAsPrecisedTabulationMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  const precisionMatch = token.inner.match(/^[0-9]+/g);
  const precisionText = precisionMatch[0];
  const precisionNumber = parseInt(precisionText);
  const innerText = token.inner.substr(precisionText.length + 1);
  if(!innerText.trim()) {
    state.tabule(0, precisionNumber);
  } else {
    let output = "";
    output += "\n";
    output += state.tabule(0, precisionNumber);
    output += this._removeInitialSpace(innerText);
    this._prependToParentCompilationFile(compilationFile, output, "md");
  }
}