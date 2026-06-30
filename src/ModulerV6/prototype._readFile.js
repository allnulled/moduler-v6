/**
 * @name ModulerV6.prototype.readFile
 * @type 
 * @description 
 */
readFile(file) {
  return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
}