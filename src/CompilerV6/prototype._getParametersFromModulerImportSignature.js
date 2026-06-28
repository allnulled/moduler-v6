/**
 * @name CompilerV6.prototype._getParametersFromModulerImportSignature
 * @type 
 * @description 
 *  - `file:String` if endsWith(".js")
 *  - `id:String` otherwise
 *  - `files:Array<String>`
 *  - `factory:Function`
 *  - `files:Array<String>,factory:Function`
 */
_getParametersFromModulerImportSignature(parameters, resource = null) {
  this._trace("_getParametersFromModulerImportSignature", arguments);
  this._assert(Array.isArray(parameters), `Parameter «parameters» must be array on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature»`);
  const formatted = {};
  if(parameters.length === 1) {
    if(typeof parameters[0] === "string") {
      if(parameters[0].endsWith(".js")) {
        Object.assign(formatted, {
          id: null,
          dependencies: [parameters[0]],
          factory: null,
        });
      } else if(parameters[0].endsWith(".css")) {
        Object.assign(formatted, {
          id: null,
          dependencies: [parameters[0]],
          factory: null,
        });
      } else if(parameters[0].endsWith(".md")) {
        Object.assign(formatted, {
          id: null,
          dependencies: [parameters[0]],
          factory: null,
        });
      } else {
        Object.assign(formatted, {
          id: parameters[0],
          dependencies: [],
          factory: null,
        });
      }
    } else if(Array.isArray(parameters[0])) {
      Object.assign(formatted, {
        id: null,
        dependencies: [],
        factory: parameters[0],
      });
    } else if(typeof parameters[0] === "function") {
      Object.assign(formatted, {
        id: null,
        dependencies: [],
        factory: parameters[0],
      });
    } else {
      throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (1)`);
    }
  } else if(parameters.length === 2) {
    if(Array.isArray(parameters[0]) && typeof parameters[1] === "function") {
      Object.assign(formatted, {
        id: null,
        dependencies: parameters[0],
        factory: parameters[1],
      });
    } else {
      throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (2)`);
    }
  } else if(parameters.length === 3) {
    if(typeof parameters[0] === "string" && Array.isArray(parameters[1]) && typeof parameters[2] === "function") {
      Object.assign(formatted, {
        id: parameters[0],
        dependencies: parameters[1],
        factory: parameters[2],
      });
    } else {
      throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (3)`);
    }
  } else {
    throw new Error(`Signature with «${parameters.length}» parameters is not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (5)`);
  }
  return formatted;
}