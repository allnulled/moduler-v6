/**
 * @name CompilerV6.Files.prototype.readFile
 * @type 
 * @description 
 */
readFile = Object.assign((file, encoding = "utf8") => {
  return require("fs").promises.readFile(file, encoding);
}, {
  try: (...args) => this.trify(this.readFile, ...args),
});