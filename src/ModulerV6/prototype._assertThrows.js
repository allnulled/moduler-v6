/**
 * @name ModulerV6.prototype._assertThrows
 * @type 
 * @description 
 */
async _assertThrows(callback, message, checker = () => true) {
  const localError = new Error("Should have thrown: " + message);
  try {
    await callback();
    throw localError;
  } catch (err) {
    if(err === localError) {
      throw new this.constructor.AssertionError(`Should have thrown: ${err.name}: ${err.message} | ${err.stack}`);
    }
    if (!checker(err)) {
      throw new this.constructor.AssertionError(`Should have thrown but not specific error: ${err.name}: ${err.message} | ${err.stack}`);
    }
    this._notifyAssertion(message);
  }
}