/**
 * @name CompilerV6.Files.prototype.getDirectoryOf
 * @type 
 * @description 
 */
getDirectoryOf(file) {
  const normalized = this.compiler.normalizationOf(file);
  const pos = normalized.lastIndexOf("/");
  return [0,-1].includes(pos) ? "/" : normalized.substr(0, pos);
}