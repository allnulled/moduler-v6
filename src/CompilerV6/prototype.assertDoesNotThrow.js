/**
 * @name CompilerV6.prototype.assertDoesNotThrow
 * @type 
 * @description 
 */
async assertDoesNotThrow(...args) {
  const isReversed = (typeof args[0] === "string") && (typeof args[1] === "function");
  const callback = isReversed ? args[1] : args[0];
  const message = isReversed ? args[0] : args[1];
  try {
    await callback();
    this._notifyAssertion(message);
  } catch (err) {
    throw new this.constructor.AssertionError(`Should not have thrown: ${err.name}: ${err.message}`, err);
  }
}