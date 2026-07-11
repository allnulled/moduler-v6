/**
 * @name DevBinaryV6.Utils.prototype.existsFile
 * @type 
 * @description 
 */
existsFile(file) {
  return require("fs").promises.access(file).then(() => true).catch(error => false);
}