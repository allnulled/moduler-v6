/**
 * @name ModulerV6.prototype._importFactory
 * @type 
 * @description 
 */
_importFactory(factory, dependencies = []) {
  let originalHolder = {}, output;
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(anotherOutput) {
      originalHolder = anotherOutput;
    }
  };
  output = factory(dependencies, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this,
  });
  if(typeof output === "undefined") {
    if(Object.keys(originalHolder).length) {
      output = originalHolder;
    }
  }
  return output;
}