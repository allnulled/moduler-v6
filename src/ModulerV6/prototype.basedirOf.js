/**
 * @name ModulerV6.prototype.basedirOf
 * @type 
 * @description 
 */
basedirOf(subpath) {
  const normalized = this._joinPaths([subpath], "basedirOf");
  const basedirSeparated = this._appendPathSeparator(this.basedir);
  if(normalized.startsWith(basedirSeparated)) {
    return normalized.replace(basedirSeparated, "./");
  }
  return normalized;
}