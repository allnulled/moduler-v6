/**
 * @name CompilerV6.prototype._getParametersFromModulerExportSignature
 * @type 
 * @description 
 */
_getParametersFromModulerExportSignature(parameters, resource = null) {
  this._trace("_getParametersFromModulerExportSignature", arguments);
  this._assert(Array.isArray(parameters), "Parameter «parameters» must be array on «CompilerV6.prototype._getParametersFromModulerExportSignature»");
  const formatted = {};
  if(parameters.length === 1) {
    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (1)`);
  } else if(parameters.length === 2) {
    if(typeof parameters[0] === "string" && typeof parameters[1] === "string") {
      Object.assign(formatted, {
        id: parameters[0],
        dependencies: [parameters[1]],
        factory: null,
      });
    } else if(typeof parameters[0] === "string" && typeof parameters[1] === "function") {
      Object.assign(formatted, {
        id: parameters[0],
        dependencies: [],
        factory: parameters[1],
      });
    } else if(typeof parameters[0] === "string" && typeof parameters[1] === "object") {
      Object.assign(formatted, {
        id: parameters[0],
        dependencies: parameters[1],
        factory: null,
      });
    } else {
      throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (2)`);
    }
  } else if(parameters.length === 3) {
    if(typeof parameters[0] === "string" && typeof parameters[1] === "object" && typeof parameters[2] === "function") {
      Object.assign(formatted, {
        id: parameters[0],
        dependencies: parameters[1],
        factory: parameters[2],
      });
    } else {
      throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (3)`);
    }
  } else {
    throw new Error(`Signature with «${parameters.length}» parameters is not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (5)`);
  }
  return formatted;
}