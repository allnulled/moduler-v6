/**
 * @name CompilerV6.Logger.Manager.constructor
 * @type 
 * @description 
 */
constructor(basedir) {
  this.basedir = basedir;
  this.selected = "default";
  this.subloggers = {
    default: new Logger({ file: require("path").resolve(basedir, "default.txt") }),
  };
}