/**
 * @name CompilerV6.prototype._cloneForFile
 * @type 
 * @description 
 */
_cloneForFile(resource, compiler = false) {
  this._traceIn("_cloneForFile", arguments);
  this.assert(typeof resource === "string", "Parameter «resource» must be string on «CompilerV6.prototype._cloneForFile»");
  this.assert(typeof this.basedir === "string", "Property «this.basedir» must be string on «CompilerV6.prototype._cloneForFile»");
  const dirpath = require("path").dirname(this.fullpathOf(resource));
  const clone = new this.constructor(dirpath, compiler || this);
  this._traceOut("_cloneForFile", arguments);
  return clone;
}