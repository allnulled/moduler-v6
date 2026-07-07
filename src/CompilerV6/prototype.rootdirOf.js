/**
 * @name CompilerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(fullpath) {
  this._trace("rootdirOf", arguments);
  // return this.moduler.rootdirOf(fullpath);
  const normalization = this.normalizationOf(fullpath);
  return normalization.startsWith(this.rootdir + "/") ? normalization.replace((this.rootdir + "/"), "@/") : normalization;
}