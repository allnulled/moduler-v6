/**
 * @name CompilerV6.prototype._prependToParentCompilationFile
 * @type 
 * @description 
 */
_prependToParentCompilationFile(compilationFile, content, extension = "md", betterAppend = false) {
  const method = betterAppend ? "unshift" : "push";
  /*
  const mdItemMetadata = typeof content === "object" ? {
    ...content,
    titleIndentation: content.titleIndentation || compilationFile.titleIndentation,
  } : content;
  //*/
  let mdItemMetadata = content;
  Set_title_indentation: {
    if(typeof content === "object") {
      if(!("titleIndentation" in content)) {
        content.titleIndentation = compilationFile.titleIndentation;
      }
    }
  }
  compilationFile.mdUnification[method](mdItemMetadata);
  // @RECURSIVIDAD: sí, es recursivo esto, no está muy bien, pero tú, si tira, ha tirao!
  // if (compilationFile.parentCompilation) {
  //   this._prependToParentCompilationFile(compilationFile.parentCompilation, content, extension, betterAppend);
  // }
  // 
  return;
  // @ANTES:
  // if (compilationFile.parentCompilation) {
  //     compilationFile.parentCompilation.compilation[extension] = content + compilationFile.parentCompilation.compilation[extension];
  // }
  // compilationFile.compilation[extension] = content + compilationFile.compilation[extension];
}