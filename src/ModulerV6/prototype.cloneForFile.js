/**
 * @name ModulerV6.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(filepath) {
  const dirpath = this._joinPaths([filepath, ".."]);
  return new ModulerV6(dirpath, this);
}