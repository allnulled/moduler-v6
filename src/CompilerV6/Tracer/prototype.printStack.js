/**
 * @name CompilerV6.Tracer.prototype.printStack
 * @type 
 * @description 
 */
printStack() {
  console.log(`Tracer «${this.compiler.name || "mv6"}» with:`, this.stack);
}