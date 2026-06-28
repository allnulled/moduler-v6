/**
 * @name CompilerV6.Logger.Manager.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  if (!this.has(this.selected)) {
    this.addLogger(this.selected);
  }
  return this.subloggers[this.selected].log(...args);
}