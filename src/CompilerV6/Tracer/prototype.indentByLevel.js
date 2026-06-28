/**
 * @name CompilerV6.Tracer.prototype.indentByLevel
 * @type 
 * @description 
 */
indentByLevel(input) {
  return " ".repeat(this.stack.length) + input;
}