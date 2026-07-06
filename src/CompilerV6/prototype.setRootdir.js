/**
 * @name CompilerV6.prototype.setRootdir
 * @type 
 * @description 
 */
setRootdir(rootdir) {
  this.rootdir = this.normalizationOf(rootdir);
  this.moduler.rootdir = this.rootdir;
}