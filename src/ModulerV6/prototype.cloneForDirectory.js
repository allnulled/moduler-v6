/**
 * @name ModulerV6.prototype.cloneForDirectory
 * @type 
 * @description 
 */
cloneForDirectory(dirpathBrute) {
  const dirpath = this._joinPaths([dirpathBrute]);
  return new ModulerV6(dirpath, this);
}