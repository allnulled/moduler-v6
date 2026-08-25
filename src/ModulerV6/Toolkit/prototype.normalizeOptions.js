/**
 * @name ModulerV6.Toolkit.prototype.normalizeOptions
 * @type 
 * @description 
 */
normalizeOptions(options = {}) {
  const normalization = Object.assign({}, options);
  if(typeof normalization.tracer === "undefined") {
    normalization.tracer = this.moduler.tracer;
  }
  return normalization;
}