/**
 * @name DevBinaryV6.Utils.prototype.globOf
 * @type 
 * @description 
 */
globOf(globPatterns) {
  return {
    matcher: require("picomatch")(globPatterns),
    matches(file) {
      return this.matcher(file);
    }
  };
}