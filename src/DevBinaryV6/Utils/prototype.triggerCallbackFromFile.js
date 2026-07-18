/**
 * @name DevBinaryV6.Utils.prototype.triggerCallbackFromFile
 * @type 
 * @description 
 */
async triggerCallbackFromFile(file, injection = {}, dontThrow = false) {
  if(!await this.existsFile(file)) {
    return -1;
  }
  const callback = require(file);
  this.assert(typeof callback === "function", `File «${file}» should export a function on «DevBinaryV6.Utils.prototype.triggerCallbackFromFile»`);
  return await callback.call(this, {
    devbin: this,
    ...injection,
  });
}