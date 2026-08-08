/**
 * @name CompilerV6.prototype._prependToParentCompilationFile
 * @type 
 * @description 
 */
_prependToParentCompilationFile(compilationFile, content, extension = "md") {
  if(compilationFile.parentCompilation) {
    compilationFile.parentCompilation.compilation[extension] = content + compilationFile.parentCompilation.compilation[extension];
  }
  compilationFile.compilation[extension] = content + compilationFile.compilation[extension];
}