normalizeObject(parameters = {}, normalization = null) {
  /**
   * @name ModulerV6.Toolkit.prototype.normalizeObject
   * @type 
   * @description 
   */
  let output = {...parameters};
  if(normalization) {
    Apply_default:
    for(const property in normalization) {
      const configuration = normalization[property];
      if("default" in configuration) {
        output[property] = property in output ? output[property] : typeof configuration.default === "function" ? configuration.default(configuration) : configuration.default;
      }
    }
    Validate:
    for(const property in normalization) {
      const configuration = normalization[property];
      if("validate" in configuration) {
        const result = configuration.validate(output[property], this.moduler.constructor.assert, output, normalization);
        if(typeof result === "undefined") {
          // @OK
        } else if(result !== true) {
          throw new Error(result || `Validation of property «${property}» should return «true» but «${typeof result}» was found instead on «ModulerV6.Toolkit.normalizeObject»`);
        }
      }
    }
    Format:
    for(const property in normalization) {
      const configuration = normalization[property];
      if("format" in configuration) {
        output[property] = configuration.format(output[property], output, normalization);
      }
    }
  }
  return output;
}