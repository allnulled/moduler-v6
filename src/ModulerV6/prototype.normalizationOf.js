/**
 * @name ModulerV6.prototype.normalizationOf
 * @type 
 * @description 
 */
normalizationOf(subpath) {
  this.assert(typeof subpath === "string", `Parameter «subpath» must be string on «ModulerV6.prototype.normalizationOf»`);
  return this.util.joinPaths([subpath], "normalizationOf");
}