/**
 * @name CompilerV6.CompilationFile.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if(!condition) throw new Error(message);
}