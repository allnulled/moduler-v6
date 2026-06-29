/**
 * @name CompilerV6.CompilationProcess.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if(!condition) throw new Error(message);
}