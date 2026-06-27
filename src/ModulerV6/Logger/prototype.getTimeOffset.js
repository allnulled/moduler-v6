/**
 * @name ModulerV6.Logger.prototype.getTimeOffset
 * @type 
 * @description 
 */
getTimeOffset() {
  return "+" + ((new Date()).getTime() - this.startedAt.getTime());
}