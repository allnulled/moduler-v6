/**
 * @name CompilerV6.Files.prototype.deleteDirectory
 * @type 
 * @description 
 */
deleteDirectory = Object.assign((dir) => {
  const fullDir = this.compiler.moduler.normalizationOf(dir);
  return require("fs").promises.rm(fullDir, { recursive: true });
}, {
  try: (...args) => this.trify(this.deleteDirectory, ...args),
});