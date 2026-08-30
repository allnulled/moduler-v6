/**
 * @name CompilerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(fullpath) {
  this._trace("rootdirOf", arguments);
  return this.moduler.rootdirOf(fullpath);
}