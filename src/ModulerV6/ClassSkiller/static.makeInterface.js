/**
 * @name ModulerV6.ClassSkiller.static.makeInterface
 * @type 
 * @description 
 */
static makeInterface(subinterfaces, options = {}, base = { static: {}, prototype: {} }) {
  return this.mixInterfaces(subinterfaces, {
    base,
    errorClue: " using «ClassSkiller.makeInterface»",
    ...options,
  });
}