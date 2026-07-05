/**
 * @name ModulerV6.prototype.setBasedir
 * @type 
 * @description 
 */
setBasedir(basedir) {
  this.basedir = this.normalizationOf(basedir);
  if(this.compiler) {
    this.compiler.basedir = this.basedir;
  }
}