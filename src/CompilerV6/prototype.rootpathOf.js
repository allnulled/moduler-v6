/**
 * @name CompilerV6.prototype.rootpathOf
 * @type 
 * @description 
 */
rootpathOf(fullpath) {
  this._trace("rootpathOf", arguments);
  // return this.moduler.rootdirOf(fullpath);
  const normalization = this.normalizationOf(fullpath);
  return normalization.startsWith(this.rootdir + "/") ? normalization.replace((this.rootdir + "/"), "@/") : normalization;
}