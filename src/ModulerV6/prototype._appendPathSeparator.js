/**
 * @name ModulerV6.prototype._appendPathSeparator
 * @type 
 * @description 
 */
_appendPathSeparator(subpath) {
  return subpath.replace(this.constructor.symbols.REGEX_FOR_SLASH_AT_THE_END, "") + "/";
}