/**
 * @name CompilerV6.prototype.assertDoesNotThrow
 * @type 
 * @description 
 */
async assertDoesNotThrow(callback, message, checker = () => true) {
  try {
    await callback();
    this._notifyAssertion(message);
  } catch (err) {
    if (!checker(err)) {
      throw new this.constructor.AssertionError(`Should not have thrown specific error: ${err.name}: ${err.message}`);
    }
    throw new this.constructor.AssertionError(`Should not have thrown: ${err.name}: ${err.message}`);
  }
}