/**
 * @name CompilerV6.Logger.prototype.resetFile
 * @type 
 * @description 
 */
resetFile(...args) {
  return require("fs").promises.writeFile(this.options.file, "", "utf8").then(() => {
    this.startedAt = new Date();
    this.lastLogAt = new Date();
    return this.log(...args);
  });
}