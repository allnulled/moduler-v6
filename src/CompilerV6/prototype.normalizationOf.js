/**
 * @name CompilerV6.prototype.normalizationOf
 * @type 
 * @description 
 */
normalizationOf(nodepath, origin = false) {
  this._trace("normalizationOf", arguments);
  return this.moduler.normalizationOf(nodepath);
}