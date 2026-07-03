/**
 * @name ModulerV6.prototype._importFile
 * @type 
 * @description 
 */
_importFile(filepathBrute) {
  let originalHolder = {};
  const filepath = this.normalizationOf(filepathBrute);
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(output) {
      originalHolder = output;
    }
  };
  // @SCREWING: esto lo estaba jodiendo, y al quitarlo ya devolvía el string, y no entendí el porqué al final
  // this.modules[filepath] = moduleHolder.exports;
  return this.evaluateFile(filepath, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this.cloneForFile(filepath),
  }).then(result => {
    let output = undefined;
    if (typeof result === "undefined") {
      output = moduleHolder.exports;
    } else {
      output = moduleHolder.exports = result;
    }
    return this.modules[filepath] = output;
  });
}