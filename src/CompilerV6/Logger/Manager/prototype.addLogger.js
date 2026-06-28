/**
 * @name CompilerV6.Logger.Manager.prototype.addLogger
 * @type 
 * @description 
 */
addLogger(id) {
  this.subloggers[id] = new Logger({ file: require("path").resolve(this.basedir, id + ".txt") });
}