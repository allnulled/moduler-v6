/**
 * @name ModulerV6.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  if (!this._logger) {
    this._logger = new this.constructor.Logger({ file: __dirname + "/dev/logs/default.txt" }, this);
  }
  this._logger.log(...args);
}