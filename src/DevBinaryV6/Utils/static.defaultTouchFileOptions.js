/**
 * @name DevBinaryV6.Utils.static.defaultTouchFileOptions
 * @type 
 * @description 
 */
static defaultTouchFileOptions(overrider = {}) {
  return {
    propagateUp: true,
    ...overrider,
  };
}