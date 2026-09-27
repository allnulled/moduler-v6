/**
 * @name CompilerV6.prototype._wrapAsModuleInjection
 * @type 
 * @description 
 */
_wrapAsModuleInjection(source, rootpath, modulerVarname = "$moduler") {
  const distRootpath = this.moduler._getDistRootpathFromSrc(rootpath);
  return [
    `(function({ module, exports, $localModuler }) {`,
    `  return ${modulerVarname}.releaseFile("${distRootpath}", arguments[0], (function() {`,
    `    ${source}`,
    `  }).call(this));`,
    `}).call(this, ${modulerVarname}.reserveFile("${distRootpath}"))`,
  ].join("\n");
}