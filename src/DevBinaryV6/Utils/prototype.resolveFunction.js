/**
 * @name DevBinaryV6.Utils.prototype.resolveFunction
 * @type 
 * @description 
 */
resolveFunction(it, injection = {}) {
  if (typeof it === "function") {
    return it.call({ devbin: this.devbin, ...injection });
  }
  return it;
}