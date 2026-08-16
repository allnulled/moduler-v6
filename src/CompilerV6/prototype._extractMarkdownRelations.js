/**
 * @name CompilerV6.prototype._extractMarkdownRelations
 * @type 
 * @description 
 */
_extractMarkdownRelations(compilationFile) {
  let output = "";
  const input = compilationFile.report.tree;
  const files = Object.keys(input);
  for(let indexFile=0; indexFile<files.length; indexFile++) {
    const fileId = files[indexFile];
    const file = input[fileId];
    const tokens = Object.keys(file);
    output += `- **${fileId}**`;
    output += !tokens.length ? " *free*\n" : ` uses **${tokens.length} files**\n`;
    let counter = 0;
    for(let indexToken=0; indexToken<tokens.length; indexToken++) {
      const tokenId = tokens[indexToken];
      const token = file[tokenId];
      const bestId = (() => {
        if(!token.referenceOf?.rootpath) {
          return token.inner;
        } else {
          return token.referenceOf.rootpath;
        }
      })();
      output += `  ${++counter}. *${bestId}* with **${token.syntax}**\n`;
    }
  }
  return output;
}