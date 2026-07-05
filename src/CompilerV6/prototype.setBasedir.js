/**
 * @name CompilerV6.prototype.setBasedir
 * @type 
 * @description 
 */
setBasedir(basedir) {
  this.basedir = this.normalizationOf(basedir);
  this.moduler.basedir = this.basedir;
}