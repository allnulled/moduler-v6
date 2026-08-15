/**
 * @name CompilerV6.Files.prototype.writeFile
 * @type 
 * @description 
 */
writeFile = Object.assign((file, contents, encoding = "utf8") => {
  const absolutePath = this.compiler.normalizationOf(file);
  return require("fs").promises.writeFile(absolutePath, contents, encoding);
}, {
  try: (...args) => this.trify(this.writeFile, ...args),
});