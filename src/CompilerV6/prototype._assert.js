/**
 * @name CompilerV6.prototype._assert
 * @type 
 * @description 
 */
_assert(condition, message) {
  this._trace("_assert", arguments);
  if (!condition) {
    throw new this.constructor.AssertionError(message);
  } else if(this._tracer.isTracing) {
    this._notifyAssertion(message);
  }
}