/**
 * @name ModulerV6.prototype._importFactory
 * @type 
 * @description 
 */
_importFactory(factory, dependencies = []) {
  let originalHolder = {};
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(output) {
      originalHolder = output;
    }
  };
  const result = factory(dependencies, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this,
  });
  return typeof result === "undefined" ? originalHolder : result;
}