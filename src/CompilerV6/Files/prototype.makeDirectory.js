/**
 * @name CompilerV6.Files.prototype.makeDirectory
 * @type 
 * @description 
 */
makeDirectory = Object.assign((dir) => {
  const fullDir = this.compiler.normalizationOf(dir);
  return require("fs").promises.mkdir(fullDir);
}, {
  try: (...args) => this.trify(this.makeDirectory, ...args),
});