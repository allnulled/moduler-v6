/**
 * @name ModulerV6.prototype._importFile
 * @type 
 * @description 
 */
_importFile(filepath) {
  let originalHolder = {};
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(output) {
      originalHolder = output;
    }
  };
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