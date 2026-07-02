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
  this.modules[filepath] = moduleHolder.exports;
  const intermediatePromise = this.evaluateFile(filepath, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this.cloneForFile(filepath),
  });
  return intermediatePromise.then(result => {
    if (typeof result !== "undefined") {
      this.modules[filepath] = result;
    } else {
      this.modules[filepath] = originalHolder;
    }
    return this.modules[filepath];
  });
}