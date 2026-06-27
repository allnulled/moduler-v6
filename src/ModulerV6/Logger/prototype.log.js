/**
 * @name ModulerV6.Logger.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  const line = this.stringifySafe({
    "@": this.getMomentToString(),
    "#": this.getTimeOffset(),
    "##": this.getLastLogOffset(),
    "*": args,
  }) + "\n";
  if (this.options.console) {
    console.log(line);
  }
  this.lastLogAt = new Date();
  if (this.options.file) {
    return require("fs").promises.appendFile(this.options.file, line, "utf8").catch(console.error);
  }
}