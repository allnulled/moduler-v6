/**
 * @name CompilerV6.prototype._removeInitialSpace
 * @type 
 * @description 
 */
_removeInitialSpace(text) {
  return text.startsWith(" ") ? text.substr(1) : text;
}