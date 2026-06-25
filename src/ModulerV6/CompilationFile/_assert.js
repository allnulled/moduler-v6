/**
 * @name ModulerV6.CompilationFile._assert
 * @type 
 * @description 
 */
static _assert(condition, message) {
  if(!condition) throw new Error(message);
}