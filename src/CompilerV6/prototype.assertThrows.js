/**
 * @name CompilerV6.prototype.assertThrows
 * @type 
 * @description 
 */
async assertThrows(callback, message, errorChecker = () => true) {
  const localError = new Error("Should have thrown: " + message);
  try {
    await callback();
    throw localError;
  } catch (err) {
    if(err === localError) {
      throw new this.constructor.AssertionError(`Should have thrown: ${err.name}: ${err.message} | ${err.stack}`);
    }
    if (!errorChecker(err)) {
      throw new this.constructor.AssertionError(`Should have thrown but not specific error: ${err.name}: ${err.message} | ${err.stack}`);
    }
    this._notifyAssertion(message);
  }
}