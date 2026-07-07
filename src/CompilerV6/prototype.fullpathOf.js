/**
 * @name CompilerV6.prototype.fullpathOf
 * @type 
 * @description 
 */
fullpathOf(nodepath) {
  this._trace("fullpathOf", arguments);
  if(nodepath.startsWith("@/")) {
    return require("path").resolve(this.rootdir, nodepath.substr(2));
  }
  return require("path").resolve(this.basedir, nodepath);
}