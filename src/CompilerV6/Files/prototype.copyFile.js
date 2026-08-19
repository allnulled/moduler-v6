/**
 * @name CompilerV6.Files.prototype.copyFile
 * @type 
 * @description 
 */
copyFile = Object.assign(async (src, dst) => {
  const fullSrc = this.compiler.moduler.normalizationOf(src);
  const fullDst = this.compiler.moduler.normalizationOf(dst);
  return await require("fs").promises.copyFile(fullSrc, fullDst);
}, {
  try: (...args) => this.trify(this.copyFile, ...args),
});