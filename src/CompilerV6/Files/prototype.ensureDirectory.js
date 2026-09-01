/**
 * @name CompilerV6.Files.prototype.ensureDirectory
 * @type 
 * @description 
 */
ensureDirectory(dirBrute) {
  const dir = this.compiler.moduler.normalizationOf(dirBrute);
  return require("fs").promises.mkdir(dir, { recursive: true });
};