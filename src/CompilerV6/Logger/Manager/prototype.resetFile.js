/**
 * @name CompilerV6.Logger.Manager.prototype.resetFile
 * @type 
 * @description 
 */
resetFile(...args) {
  if (!this.has(this.selected)) {
    this.addLogger(this.selected);
  }
  return this.subloggers[this.selected].resetFile(...args);
}