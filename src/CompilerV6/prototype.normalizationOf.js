/**
 * @name CompilerV6.prototype.normalizationOf
 * @type 
 * @description 
 */
normalizationOf(nodepath, origin = false) {
  this._trace("normalizationOf", arguments);
  const output = require("path").resolve(nodepath);
  if(origin) {
    this._debug("called normalizationOf from: " + origin + " (" + output + ")");
  }
  return output;
}