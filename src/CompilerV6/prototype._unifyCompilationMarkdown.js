/**
 * @name CompilerV6.prototype._unifyCompilationMarkdown
 * @type 
 * @description 
 */
_unifyCompilationMarkdown(compilationFile) {
  compilationFile.compilation.md += compilationFile.mdUnification.reverse().map(it => {
    if(typeof it === "string") {
      return it;
    }
    return it.prefix + ("   ".repeat(it.tabulation)) + it.body;
  }).join("");
}