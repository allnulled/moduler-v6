/**
 * @name CompilerV6.CompilationResult.constructor
 * @type 
 * @description 
 */
constructor(output = {}, compiler = null) {
  Object.assign(this, output);
  this.compiler = compiler;
}