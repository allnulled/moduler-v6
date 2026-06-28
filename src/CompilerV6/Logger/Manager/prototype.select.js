/**
 * @name CompilerV6.Logger.Manager.prototype.select
 * @type 
 * @description 
 */
select(id = false) {
  if (id === false) {
    if (!this.has(this.selected)) {
      this.addLogger(this.selected);
    }
    return this.subloggers[this.selected];
  }
  if (!this.has(id)) {
    this.addLogger(this.selected);
  }
  this.selected = id;
  return this.select();
}