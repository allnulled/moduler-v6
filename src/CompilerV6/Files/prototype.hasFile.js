/**
 * @name CompilerV6.Files.prototype.hasFile
 * @type 
 * @description 
 */
hasFile(fileBrute) {
  const file = this.compiler.moduler.normalizationOf(fileBrute);
  return require("fs").promises.access(file).then(() => true).catch(error => false);
}