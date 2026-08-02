/**
 * @name ModulerV6.prototype._readPath
 * @type 
 * @description 
 */
_readPath(url) {
  return (this.runtime.isBrowser ? this._readUrl(url) : this._readFile(url)).then(it => {
    if(this.settings.data?.traceExternalSources) {
      console.log("[*] Read from external source:");
      console.log("--------------------:");
      console.log(it);
      console.log("--------------------/");
    }
    return it;
  }).catch(error => {
    throw error;
  });
}