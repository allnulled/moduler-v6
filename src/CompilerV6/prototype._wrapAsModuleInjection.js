/**
 * @name CompilerV6.prototype._wrapAsModuleInjection
 * @type 
 * @description 
 */
_wrapAsModuleInjection(source, rootpath) {
  return [
    `(function({ module, exports }) {`,
    `  return $moduler.releaseFile("${rootpath}", arguments[0], (function() {`,
    `    ${source}`,
    `  }).call(this));`,
    `}).call(this, $moduler.reserveFile("${rootpath}"))`,
  ].join("\n");
}