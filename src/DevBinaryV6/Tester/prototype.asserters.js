/**
 * @name DevBinaryV6.Tester.prototype.asserters
 * @type 
 * @description 
 */
get asserters() {
  return {
    assert: (...args) => this.devbin.assert(...args),
    assertThrows: (...args) => this.assertThrows(...args),
  };
}