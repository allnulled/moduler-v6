/**
 * @name ModulerV6.prototype._readPath
 * @type 
 * @description 
 */
_readPath(url) {
  return this._isBrowser ? this._readUrl(url) : this._readFile(url);
}