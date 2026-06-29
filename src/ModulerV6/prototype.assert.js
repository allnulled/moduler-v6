/**
 * @name ModulerV6.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  if (!condition) throw new this.constructor.AssertionError(message);
}