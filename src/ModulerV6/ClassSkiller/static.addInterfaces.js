/**
 * @name ModulerV6.ClassSkiller.static.addInterfaces
 * @type 
 * @description 
 */
static addInterfaces(clazz, list, options) {
  this.assert(typeof clazz === "function", `Parameter «clazz» must be function but «${typeof clazz}» was found instead on «ClassSkiller.addInterfaces»`);
  const interfaze = this.mixInterfaces(list, { errorClue: "using «ClassSkiller.addInterfaces»", ...options });
  Object.defineProperties(clazz, Object.getOwnPropertyDescriptors(interfaze.static));
  Object.defineProperties(clazz.prototype, Object.getOwnPropertyDescriptors(interfaze.prototype));
  return clazz;
}