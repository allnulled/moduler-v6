/**
 * @name ModulerV6.prototype.importCallback
 * @type 
 * @description 
 */
async importCallback(file, argumentary = []) {
  const callback = await this.import(file);
  this.assert(typeof callback === "function", `ModulerV6.prototype.importCallback could not call module because it must export function but «${typeof callback}» was found instead`);
  return await callback(...argumentary);
}