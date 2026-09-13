/**
 * @name ModulerV6.ClassSkiller.static.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if (!condition) throw new Error(message);
}