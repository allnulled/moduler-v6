/**
 * @name CompilerV6.prototype._readPath
 * @type 
 * @description 
 */
_readPath(url) {
  this._trace("_readPath", arguments);
  return this._isBrowser ? this._readUrl(url) : this._readFile(url);
}