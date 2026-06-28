/**
 * @name CompilerV6.Logger.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  const line = this.stringifySafe({
    "@": this.getMomentToString(),
    "#": this.getTimeOffset(),
    "##": this.getLastLogOffset(),
    "*": args,
  });
  if (this.options.console) {
    console.log(`~[LOG] ${line}`);
  }
  this.lastLogAt = new Date();
  if (this.options.file) {
    return require("fs").promises.appendFile(this.options.file, line + "\n", "utf8").catch(console.error);
  }
}