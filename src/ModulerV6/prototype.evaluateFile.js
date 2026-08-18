/**
 * @name ModulerV6.prototype.evaluateFile
 * @type 
 * @description 
 */
evaluateFile(file, injections = {}, options = {}) {
  return this._readPath(file, options)
    .catch(error => {
      if(options.onMissingResource) return options.onMissingResource(error);
      throw error;
    })
    .then(source => {
      return this.evaluateSource(source, injections, file);
    });
}