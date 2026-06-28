/**
 * @name CompilerV6.Logger.constructor
 * @type 
 * @description 
 */
constructor(options, compiler) {
  this.options = Object.assign({}, this.constructor.defaultOptions, options);
  this.compiler = compiler;
  this.startedAt = new Date();
  this.lastLogAt = new Date();
}