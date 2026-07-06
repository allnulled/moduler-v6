/**
 * @name CompilerV6.prototype.createAssertFunction
 * @type 
 * @description 
 */
createAssertFunction() {
  return (...args) => this.assert(...args);
}