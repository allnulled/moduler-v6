/**
 * @name ModulerV6.static.isLoaded
 * @type 
 * @description 
 */
static isLoaded = Promise.all([
  () => {
    this.onLoaded.resolve();
  },
  /*="./static.isRuntimeLoaded.js"*/,
]);