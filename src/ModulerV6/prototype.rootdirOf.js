/**
 * @name ModulerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(subpath) {
  const normalized = this.util.joinPaths([subpath], "rootdirOf");
  const rootdirSeparated = this.util.appendPathSeparator(this.rootdir);
  if(normalized.startsWith(rootdirSeparated)) {
    return normalized.replace(rootdirSeparated, "@/");
  }
  return normalized;
}