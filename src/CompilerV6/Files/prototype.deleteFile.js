/**
 * @name CompilerV6.Files.prototype.deleteFile
 * @type 
 * @description 
 */
deleteFile = Object.assign(file => {
  return require("fs").promises.unlink(file);
}, {
  try: (...args) => this.trify(this.deleteFile, ...args),
});