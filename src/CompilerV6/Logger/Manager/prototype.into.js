/**
 * @name CompilerV6.Logger.Manager.prototype.into
 * @type 
 * @description 
 */
into(id) {
  if (!this.has(id)) {
    this.addLogger(id);
  }
  return this.subloggers[id];
}