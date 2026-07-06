/**
 * @name ModulerV6.prototype.setRootdir
 * @type 
 * @description 
 */
setRootdir(rootdir) {
  this.rootdir = this.normalizationOf(rootdir);
  if(this.compiler) {
    this.compiler.rootdir = this.rootdir;
  }
}