/**
 * @name CompilerV6.Files.prototype.copyDirectory
 * @type 
 * @description 
 */
copyDirectory = Object.assign(async (src, dst) => {
  const fullSrc = this.compiler.moduler.normalizationOf(src);
  const fullDst = this.compiler.moduler.normalizationOf(dst);
  await this.ensureDirectory(fullDst);
  return await require("fs").promises.cp(fullSrc, fullDst, { recursive: true });
}, {
  try: (...args) => this.trify(this.copyDirectory, ...args),
});