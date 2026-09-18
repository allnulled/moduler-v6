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
    const output = await callback();
    this._notifyAssertion(message);
    return output;
  } catch (err) {
    throw err;
    throw new this.constructor.AssertionError(`Should not have thrown, but it threw: ${err.name}: ${err.message}`);
  }
}