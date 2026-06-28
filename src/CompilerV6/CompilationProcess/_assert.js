/**
 * @name CompilerV6.CompilationProcess._assert
 * @type 
 * @description 
 */
static _assert(condition, message) {
  if(!condition) throw new Error(message);
}