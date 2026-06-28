/**
 * @name CompilerV6.Tracer.prototype.traceOut
 * @type 
 * @description 
 */
traceOut(msg, args) {
  const lastInStack = this.stack[this.stack.length-1];
  // this.compiler._assert(lastInStack === msg, `Method «Tracer.prototype.traceOut» closing different method from stack: it should close «${lastInStack}» but it is trying to close «${msg}» `);
  this.stack.pop()
  this.trace(msg, args, -1);
}