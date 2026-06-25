/**
 * @name ModulerV6.CompilationProcess.from
 * @type 
 * @description 
 */
static from(...args) {
  if(args[0] instanceof this.constructor) {
    return args[0];
  }
  return new this(...args);
}