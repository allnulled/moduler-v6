/**
 * @name CompilerV6.prototype._prependToParentCompilationFile
 * @type 
 * @description 
 */
_prependToParentCompilationFile(compilationFile, content, extension = "md", betterAppend = false) {
  const method = betterAppend ? "unshift" : "push";
  compilationFile.mdUnification[method](content);
  if (compilationFile.parentCompilation) {
    compilationFile.parentCompilation.mdUnification[method](content);
  }
  return;
  // @ANTES:
  // if (compilationFile.parentCompilation) {
  //     compilationFile.parentCompilation.compilation[extension] = content + compilationFile.parentCompilation.compilation[extension];
  // }
  // compilationFile.compilation[extension] = content + compilationFile.compilation[extension];
}