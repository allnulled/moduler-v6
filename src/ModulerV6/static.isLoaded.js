/**
 * @name ModulerV6.static.isLoaded
 * @type 
 * @description 
 */
static isLoaded = (async () => {
  En_paralelo: {
    this.bindToRefrescador();
  }
  await this.globalInstance.runtime.load();
  this.onLoaded.resolve();
})();