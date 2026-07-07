/**
 * @name DevBinaryV6.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(resource, devbin = false) {
  this.assert(typeof resource === "string", "Parameter «resource» must be string on «DevBinaryV6.prototype.cloneForFile»");
  const dirpath = require("path").dirname(this.compiler.fullpathOf(resource));
  const clone = new this.constructor(dirpath, devbin);
  return clone;
}