/**
 * @name CompilerV6.Files.prototype.hasDirectory
 * @type 
 * @description 
 */
hasDirectory(dir) {
  return require("fs").promises.access(dir).then(() => true).catch(error => false);
}