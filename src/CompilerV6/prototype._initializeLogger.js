/**
 * @name CompilerV6.prototype._initializeLogger
 * @type 
 * @description 
 */
_initializeLogger(directory) {
  this._trace("_initializeLogger", arguments);
  return this._logger = this.constructor.Logger.Manager.fromDirectory(directory, this);
}