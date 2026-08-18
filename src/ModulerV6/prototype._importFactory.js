/**
 * @name ModulerV6.prototype._importFactory
 * @type 
 * @description 
 */
_importFactory(factory, dependencies = []) {
  let output = undefined;
  let firstHolder = {};
  let originalHolder = firstHolder;
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(anotherOutput) {
      originalHolder = anotherOutput;
    }
  };
  const syncResult = factory(dependencies, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this,
  });
  if(syncResult instanceof Promise) {
    return syncResult.then(result => {
      output = undefined;
      const returnsUndefined = () => typeof result === "undefined";
      const isSameEmptyObject = () => (moduleHolder.exports === firstHolder) && ((Object.keys(firstHolder).length === 0));
      if(!returnsUndefined()) {
        output = moduleHolder.exports = result;
      } else if(!isSameEmptyObject()) {
        output = moduleHolder.exports;
      }
      return output;
    });
  } else {
    output = undefined;
    const result = syncResult;
    const returnsUndefined = () => typeof result === "undefined";
    const isSameEmptyObject = () => (moduleHolder.exports === firstHolder) && ((Object.keys(firstHolder).length === 0));
    if(!returnsUndefined()) {
      output = moduleHolder.exports = result;
    } else if(!isSameEmptyObject()) {
      output = moduleHolder.exports;
    }
  }
  return output;
}