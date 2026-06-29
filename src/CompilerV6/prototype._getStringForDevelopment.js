/**
 * @name CompilerV6.prototype._getStringForDevelopment
 * @type 
 * @description 
 */
_getStringForDevelopment(text, tab = 0) {
  this._trace("_getStringForDevelopment", arguments);
  return text.split("\n").map(line => JSON.stringify(line)).join("\n + ");
}