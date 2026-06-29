/**
 * @name ModulerV6.Util.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  if (!condition) throw new this.constructor.AssertionError(message);
}