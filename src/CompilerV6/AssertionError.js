/**
 * @name CompilerV6.AssertionError
 * @type 
 * @description 
 */
static AssertionError = class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
}