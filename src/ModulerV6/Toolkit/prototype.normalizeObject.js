normalizeObject(parameters = {}, normalization = null) {
  /**
   * @name ModulerV6.Toolkit.prototype.normalizeObject
   * @type 
   * @description 
   */
  let output = { ...parameters };
  if (normalization) {
    Apply_default:
    for (const property in normalization) {
      const configuration = normalization[property];
      if (typeof configuration !== "object") throw new Error(`Parameter «normalization["${property}"]» must be object but «${typeof configuratio}» was found instead on «ModulerV6.Toolkit.prototype.normalizeObject»`);
      if ("default" in configuration) {
        output[property] = property in output ? output[property] : typeof configuration.default === "function" ? configuration.default(configuration) : configuration.default;
      }
    }
    Inner_validations:
    for (const property in normalization) {
      const configuration = normalization[property];
      if ("validate" in configuration) {
        if (typeof configuration.validate === "function") {
          const result = configuration.validate(output[property], this.moduler.constructor.assert, output, normalization);
          if (typeof result === "undefined") {
            // @OK
          } else if (result !== true) {
            throw new Error(result || `Validation of property «${property}» should return true or undefined but «${typeof result}» was found instead on «ModulerV6.Toolkit.normalizeObject»`);
          }
        } else if (typeof configuration.validate === "object") {
          output[property] = this.normalizeObject(output[property], configuration.validate);
        } else throw new Error(`Parameters «parameters["${property}"].validate» must be function or object on «ModulerV6.Toolkit.prototype.normalizeObject»`);
      }
    }
    Format:
    for (const property in normalization) {
      const configuration = normalization[property];
      if ("format" in configuration) {
        const result = configuration.format(output[property], output, normalization);
        if(typeof result !== "undefined") output[property] = result;
      }
    }
  }
  return output;
}