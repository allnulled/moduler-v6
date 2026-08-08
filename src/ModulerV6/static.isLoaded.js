/**
 * @name ModulerV6.static.isLoaded
 * @type 
 * @description 
 */
static isLoaded = (async () => {
  await this.globalInstance.runtime.load();
  this.onLoaded.resolve();
})();