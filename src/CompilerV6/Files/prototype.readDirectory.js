/**
 * @name CompilerV6.Files.prototype.readDirectory
 * @type 
 * @description 
 */
readDirectory(dir) {
  return require("fs").promises.readdir(this.compiler.moduler.normalizationOf(dir));
}