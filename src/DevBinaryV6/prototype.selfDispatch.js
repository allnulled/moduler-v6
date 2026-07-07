/**
 * @name DevBinaryV6.prototype.selfDispatch
 * @type 
 * @description 
 */
selfDispatch() {
  return this.command([...process.argv].splice(2));
  throw new Error("Method «selfDispatch» is not coded yet");
}