/**
 * @name CompilerV6.Files.prototype.ensureDirectory
 * @type 
 * @description 
 */
ensureDirectory(dir) {
  return require("fs").promises.mkdir(dir, { recursive: true }).catch(error => -2);
};