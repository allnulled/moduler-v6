/**
 * @name ModulerV6.prototype._formatExportParameters
 * @type 
 * @description 
 */
_formatExportParameters(signature) {
  this.assert(Array.isArray(signature), "Parameter «signature» must have  on «ModulerV6.prototype._formatExportParameters»");
  this.assert(signature.length !== 0, "ModulerV6.prototype.export cannot have 0 arguments");
  this.assert(signature.length !== 1, "ModulerV6.prototype.export cannot have 1 argument only");
  if(signature.length === 2) {
    if(typeof signature[0] === "string" && typeof signature[1] === "function") {
      // Factory module to name
    } else if(typeof signature[0] === "string" && typeof signature[1] === "string") {
      // Dependency to name
    } else if(typeof signature[0] === "string" && typeof signature[1] === "object") {
      // Dependencies collection to name
    } else {
      this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
    }
  } else if(signature.length === 3) {
    if(typeof signature[0] === "string" && typeof signature[1] === "object" && typeof signature[2] === "function") {
      // Factory module with dependencies to name
    } else {
      this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}, ${typeof signature[2]}`);
    }
  } else {
    this.assert(false, `ModulerV6.prototype.export cannot have ${signature.length} arguments`);
  }
}