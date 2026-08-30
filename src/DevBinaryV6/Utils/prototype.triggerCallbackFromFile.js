/**
 * @name DevBinaryV6.Utils.prototype.triggerCallbackFromFile
 * @type 
 * @description 
 */
async triggerCallbackFromFile(fileBrute, injection = {}, dontThrow = false) {
  const file = this.devbin.moduler.normalizationOf(fileBrute);
  if(!await this.existsFile(file)) {
    return -1;
  }
  const callback = require(file);
  this.assert(typeof callback === "function", `File «${file}» should export a function on «DevBinaryV6.Utils.prototype.triggerCallbackFromFile»`);
  return await callback.call(this, {
    devbin: this.devbin,
    ...injection,
  });
}