/**
 * @name CompilerV6.prototype._readFile
 * @type 
 * @description 
 */
_readFile(file) {
  this._trace("_readFile", arguments);
  return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
}