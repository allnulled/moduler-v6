/**
 * @name CompilerV6.Files.prototype.readFile
 * @type 
 * @description 
 */
readFile = Object.assign((file, encoding = "utf8") => {
  const absolutePath = this.compiler.normalizationOf(file);
  return require("fs").promises.readFile(absolutePath, encoding);
}, {
  try: (...args) => this.trify(this.readFile, ...args),
});