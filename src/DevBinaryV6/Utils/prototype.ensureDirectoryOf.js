/**
 * @name DevBinaryV6.Utils.prototype.ensureDirectoryOf
 * @type 
 * @description 
 */
ensureDirectoryOf(file) {
  return require("fs").promises.mkdir(require("path").dirname(file), { recursive: true }).catch(error => false);
}