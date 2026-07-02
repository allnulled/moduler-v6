/**
 * @name ModulerV6.prototype.evaluateFile
 * @type 
 * @description 
 */
evaluateFile(file, injections = {}) {
  return this._readPath(file).then(source => this.evaluateSource(source, injections));
}