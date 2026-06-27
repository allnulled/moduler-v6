/**
 * @name ModulerV6.Logger.prototype.getLastLogOffset
 * @type 
 * @description 
 */
getLastLogOffset() {
  return "+" + ((new Date()).getTime() - this.lastLogAt.getTime());
}