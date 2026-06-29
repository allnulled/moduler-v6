/**
 * @name CompilerV6.prototype._getDataForTokenCompilation
 * @type 
 * @description 
 */
async _getDataForTokenCompilation(input, options = {}) {
  this._traceIn("_getDataForTokenCompilation", arguments);
  this.assert(typeof input === "object", "Parameter «input» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationFile === "object", "Parameter «input.compilationFile» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationFile.resource === "string", "Parameter «input.compilationFile.resource» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationProcess === "object", "Parameter «input.compilationProcess» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  this.assert(typeof input.token === "object", "Parameter «input.token» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  this.assert(typeof input.token.inner === "string", "Parameter «input.token.inner» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.tokenIndex === "number", "Parameter «input.tokenIndex» must be number on «CompilerV6.prototype._getDataForTokenCompilation»");
  let output, parameters = undefined;
  if(typeof options.onError === "function") {
    try {
      parameters = this._hydrateParameters(input.token.inner);
      Checks: {
        this.assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» extracting parameters from resource «${input.resource}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
      }
      output = parameters;
    } catch (error) {
      output = options.onError(error, parameters);
    }
  } else {
    parameters = this._hydrateParameters(input.token.inner);
    Checks: {
      this.assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
    }
    output = parameters;
  }
  this._traceOut("_getDataForTokenCompilation", arguments);
  return output;
}