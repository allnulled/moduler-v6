/**
 * @name DevBinaryV6.Utils.prototype.requireAgain
 * @type 
 * @description 
 */
requireAgain(fileBrute) {
  const file = this.devbin.moduler.normalizationOf(fileBrute);
  const normalized = require("path").resolve(file);
  return require(normalized);
}