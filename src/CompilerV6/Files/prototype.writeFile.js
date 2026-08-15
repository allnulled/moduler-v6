/**
 * @name CompilerV6.Files.prototype.writeFile
 * @type 
 * @description 
 */
writeFile = Object.assign((file, contents, encoding = "utf8") => {
  return require("fs").promises.writeFile(file, contents, encoding);
}, {
  try: (...args) => this.trify(this.writeFile, ...args),
});