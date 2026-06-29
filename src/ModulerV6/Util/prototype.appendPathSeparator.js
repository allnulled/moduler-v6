/**
 * @name ModulerV6.Util.prototype.appendPathSeparator
 * @type 
 * @description 
 */
appendPathSeparator(subpath) {
  return subpath.replace(this.constructor.symbols.REGEX_FOR_SLASH_AT_THE_END, "") + "/";
}