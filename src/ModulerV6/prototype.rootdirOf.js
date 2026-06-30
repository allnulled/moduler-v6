/**
 * @name ModulerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(subpath) {
  const normalized = this._joinPaths([subpath], "rootdirOf");
  const rootdirSeparated = this._appendPathSeparator(this.rootdir);
  if(normalized.startsWith(rootdirSeparated)) {
    return normalized.replace(rootdirSeparated, "@/");
  }
  return normalized;
}