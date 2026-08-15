/**
 * @name CompilerV6.prototype._compileAsInlineMarkdownComment
 * @type 
 * @description 
 */
async _compileAsInlineMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  let output = " ";
  output += this._removeInitialSpace(token.inner);
  this._prependToParentCompilationFile(compilationFile, {
    prefix: " ",
    tabulation: 0,
    body: output
  }, "md");
}