/**
 * @name ModulerV6.prototype.rootpathOf
 * @type 
 * @description 
 */
rootpathOf(fullpath) {
  this._trace("rootpathOf", arguments);
  const normalization = this.normalizationOf(fullpath);
  return normalization.startsWith(this.rootdir + "/") ? normalization.replace((this.rootdir + "/"), "@/") : normalization;
}