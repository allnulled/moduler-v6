/**
 * @name CompilerV6.prototype._wrapAsModuleInjection
 * @type 
 * @description 
 */
_wrapAsModuleInjection(source, rootpath) {
  const distRootpath = this.moduler._getDistRootpathFromSrc(rootpath);
  return [
    `(function({ module, exports, $moduler }) {`,
    `  return $moduler.releaseFile("${distRootpath}", arguments[0], (function() {`,
    `    ${source}`,
    `  }).call(this));`,
    `}).call(this, $moduler.reserveFile("${distRootpath}"))`,
  ].join("\n");
}