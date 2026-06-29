/**
 * @name CompilerV6.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  this._trace("assert", arguments);
  if (!condition) {
    throw new this.constructor.AssertionError(message);
  } else if(this._tracer.isTracing) {
    this._notifyAssertion(message);
  }
}