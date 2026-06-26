/**
 * @name ModulerV6.prototype._assertDoesNotThrow
 * @type 
 * @description 
 */
async _assertDoesNotThrow(callback, message, checker = () => true) {
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