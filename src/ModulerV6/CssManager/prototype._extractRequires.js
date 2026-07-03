/**
 * @name ModulerV6.CssManager.prototype._extractRequires
 * @type 
 * @description 
 */
_extractRequires(source, file) {
  const matches = this.parser.parse(source);
  matches.file = {
    original: file,
    absolute: this.moduler.normalizationOf(file),
    basedir: this.moduler.basedir,
    based: this.moduler.basedirOf(file),
    rootdir: this.moduler.rootdir,
    rooted: this.moduler.rootdirOf(file),
  };
  return matches;
}