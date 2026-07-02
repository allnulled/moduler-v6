/**
 * @name ModulerV6.prototype._readFile
 * @type 
 * @description 
 */
_readFile(file) {
  return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
}