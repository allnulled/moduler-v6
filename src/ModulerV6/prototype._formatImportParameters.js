/**
 * @name ModulerV6.prototype._formatImportParameters
 * @type 
 * @description 
 */
_formatImportParameters(signature) {
  this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype._formatImportParameters»");
  this.assert(signature.length !== 0, "ModulerV6.prototype.import cannot have 0 arguments");
  if(signature.length === 1) {
    if(typeof signature[0] === "string") {
      // By file or id
      const isId = signature[0].startsWith("#");
      return {
        id: isId ? signature[0] : null,
        file: !isId ? signature[0] : null,
        dependencies: [],
        factory: null,
      };
    } else if(typeof signature[0] === "object") {
      // By dependencies
      return {
        id: null,
        file: null,
        dependencies: signature[0],
        factory: null,
      };
    } else if(typeof signature[0] === "function") {
      // By pure factory
      return {
        id: null,
        file: null,
        dependencies: [],
        factory: signature[0],
      };
    } else {
      this.assert(false, `ModulerV6.prototype.import used with 1 argument does not support the signature: ${typeof signature[0]}`);
    }
  } else if(signature.length === 2) {
    if(typeof signature[0] === "object" && typeof signature[1] === "function") {
      // By factory with module injection
      return {
        id: null,
        file: null,
        dependencies: signature[0],
        factory: signature[1],
      };
    } else {
      this.assert(false, `ModulerV6.prototype.import used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
    }
  } else {
    this.assert(false, `ModulerV6.prototype.import cannot have ${signature.length} arguments`);
  }
}