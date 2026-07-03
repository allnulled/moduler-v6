/**
 * @name ModulerV6.CssManager.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  if(!condition) throw new Error(message);
}