/**
 * @name CompilerV6.prototype._readUrl
 * @type 
 * @description 
 */
_readUrl(url) {
  this._trace("_readUrl", arguments);
  return fetch(this.normalizationOf(url), { method: "GET" }).then(response => response.text());
}