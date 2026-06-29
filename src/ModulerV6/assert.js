/**
 * @name ModulerV6.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if (!condition) throw new this.Util.AssertionError(message);
}