/**
 * @name ModulerV6.CssManager.prototype.add
 * @type 
 * @description 
 */
async add(input) {
  let output = undefined;
  if(typeof input === "string") {
    output = await this._addRecursively(input);
  } else if(Array.isArray(input)) {
    output = [];
    for(let index=0; index<input.length; index++) {
      const item = input[index];
      this.moduler.assert(typeof item === "string", `Parameter «arguments[0][${index}]» must be string too on «CssManager.prototype.add»`);
      const result = await this._addRecursively(item);
      output.push(result);
    }
  } else {
    throw new Error(`Parameter «arguments[0]» can only be string or array on «CssManager.prototype.add»`);
  }
  return output;
}