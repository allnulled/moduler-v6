/**
 * @name CompilerV6.Files.prototype.hasFile
 * @type 
 * @description 
 */
hasFile(file) {
  return require("fs").promises.access(file).then(() => true).catch(error => false);
}