/**
 * @name CompilerV6.prototype._getDistRootpathFromSrc
 * @type 
 * @description 
 */
_getDistRootpathFromSrc(filepath, normalized = false) {
  if (!filepath.endsWith(".entry.js")) return filepath;
  let rootpath = this.rootdirOf(filepath);
  Fix_prefix: {
    if (rootpath.startsWith("@/src/www/")) {
      rootpath = rootpath.replace("@/src/www/", "@/dist/www/");
    } else if (rootpath.startsWith("@/src/")) {
      rootpath = rootpath.replace("@/src/", "@/dist/src/");
    } else {
      // return filepath;
    }
  }
  Fix_suffix: {
    rootpath = rootpath.replace(/\.entry\.js$/g, ".dist.js");
  }
  return normalized ? this.normalizationOf(rootpath) : rootpath;
}