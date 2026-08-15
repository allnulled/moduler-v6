/**
 * @name CompilerV6.prototype._compileAsMultilineMarkdownComment
 * @type 
 * @description 
 */
async _compileAsMultilineMarkdownComment(compilationFile, compilationProcess, { token, tokenIndex, state }) {
  let output = "";
  // output += "\n";
  // output += state.tabule(0);
  output += this._removeInitialSpace(token.inner).split("\n").map(line => {
    return line.replace(/^[ \t]*\* ?/g, "");
  }).join("\n").replace(/\n[\t ]*$/g, "");
  this._prependToParentCompilationFile(compilationFile, {
    prefix: "\n",
    tabulation: 0,
    body: output
  }, "md");
}