/**
 * @name DevBinaryV6.Utils.prototype.copyFile
 * @type 
 * @description 
 */
copyFile(src, dst) {
  return require("fs").promises.copyFile(this.devbin.moduler.normalizationOf(src), this.devbin.moduler.normalizationOf(dst));
}