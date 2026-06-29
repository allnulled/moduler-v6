/**
 * @name ModulerV6.prototype.basedirOf
 * @type 
 * @description 
 */
basedirOf(subpath) {
  const normalized = this.util.joinPaths([subpath], "basedirOf");
  const basedirSeparated = this.util.appendPathSeparator(this.basedir);
  if(normalized.startsWith(basedirSeparated)) {
    return normalized.replace(basedirSeparated, "./");
  }
  return normalized;
}