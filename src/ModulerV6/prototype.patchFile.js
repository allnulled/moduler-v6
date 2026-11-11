/**
 * @name ModulerV6.prototype.patchFile
 * @type 
 * @description 
 */
patchFile(file, value) {
  return this.modules[this.normalizationOf(file)] = value;
}