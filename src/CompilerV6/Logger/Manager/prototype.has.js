/**
 * @name CompilerV6.Logger.Manager.prototype.has
 * @type 
 * @description 
 */
has(id) {
  return id in this.subloggers;
}