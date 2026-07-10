/**
 * @name CompilerV6.prototype._existsFile
 * @type 
 * @description 
 */
_existsFile(file) {
  const fullpathFile = this.normalizationOf(file);
  return require("fs").promises.readFile(fullpathFile).then(out => true).catch(err => false);
}
