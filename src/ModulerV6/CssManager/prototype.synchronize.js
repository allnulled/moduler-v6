/**
 * @name ModulerV6.CssManager.prototype.synchronize
 * @type 
 * @description 
 */
synchronize() {
  let outputCss = "";
  const sorted = this.getSortedSheets().map(sheet => {
    return `\n/*!file:${JSON.stringify(sheet.id)}*/\n${sheet.source}`;
  }).join("\n").replace(/\/\*\@requires\:/g, "/*!requires:");
  return sorted;
}