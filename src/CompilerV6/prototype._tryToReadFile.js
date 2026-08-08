/**
 * @name CompilerV6.prototype._tryToReadFile
 * @type 
 * @description 
 */
_tryToReadFile(file, altContent = undefined) {
  return require("fs").promises.readFile(file, "utf8").catch(err => altContent);
}