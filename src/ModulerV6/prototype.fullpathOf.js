/**
 * @name ModulerV6.prototype.fullpathOf
 * @type 
 * @description 
 */
fullpathOf(nodepath) {
  this._trace("fullpathOf", arguments);
  return require("path").resolve(this.basedir, nodepath);
}