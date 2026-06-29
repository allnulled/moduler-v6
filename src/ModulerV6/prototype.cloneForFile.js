/**
 * @name ModulerV6.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(filepath) {
  const dirpath = this.util.joinPaths([filepath, ".."]);
  return new ModulerV6(dirpath, this);
}