/**
 * @name ModulerV6.Logger.constructor
 * @type 
 * @description 
 */
constructor(options, moduler) {
  this.options = Object.assign({}, this.constructor.defaultOptions, options);
  this.moduler = moduler;
  this.startedAt = new Date();
  this.lastLogAt = new Date();
}