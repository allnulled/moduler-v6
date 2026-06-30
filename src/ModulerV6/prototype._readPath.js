/**
 * @name ModulerV6.prototype.readPath
 * @type 
 * @description 
 */
readPath(url) {
  return this._isBrowser ? this._readUrl(url) : this._readFile(url);
}