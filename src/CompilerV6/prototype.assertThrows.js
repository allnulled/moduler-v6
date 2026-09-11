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
    if (err === localError) {
      throw new this.constructor.AssertionError(`Should have thrown on «${message}» but it did not throw anything: ${err.name}: ${err.message} | ${err.stack}`);
    }
    if (typeof errorChecker === "function") {
      if (!errorChecker(err)) {
        throw new this.constructor.AssertionError(`Should have thrown on «${message}» but not specific error: ${err.name}: ${err.message} | ${err.stack}`);
      }
    } else if (typeof errorChecker === "object") {
      if (errorChecker.name) {
        if (errorChecker.name !== err.name) throw new this.constructor.AssertionError(`Should have thrown on «${message}» but not specific «error.name»:\n  - should:  ${errorChecker.name}\n  - current: ${err.name}`);
      }
      if (errorChecker.message) {
        if (errorChecker.message !== err.message) throw new this.constructor.AssertionError(`Should have thrown on «${message}» but not specific «error.message»:\n  - should:  ${errorChecker.message}\n  - current: ${err.message}`);
      }
    } else if(typeof errorChecker === "string") {
      if (errorChecker) {
        if (errorChecker !== err.message) throw new this.constructor.AssertionError(`Should have thrown on «${message}» but not specific «error.message»:\n  - should:  ${errorChecker}\n  - current: ${err.message}`);
      }
    }
    this._notifyAssertion(message);
  }
}