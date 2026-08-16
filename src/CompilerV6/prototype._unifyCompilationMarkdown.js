/**
 * @name CompilerV6.prototype._unifyCompilationMarkdown
 * @type 
 * @description 
 */
_unifyCompilationMarkdown(compilationFile) {
  let tabulation = 0;
  compilationFile.compilation.md += compilationFile.mdUnification.reverse().map(it => {
    if(typeof it === "string") {
      return it;
    }
    if(typeof it.tabulation === "number") {
      tabulation += it.tabulation;
    } else if(typeof it.tabulation === "string") {
      tabulation = parseInt(it.tabulation.substr(1));
    }
    return it.prefix + ("   ".repeat(tabulation)) + it.body;
  }).join("");
}