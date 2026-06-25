/**
 * @name ModulerV6.Tracer.prototype.traceIn
 * @type 
 * @description 
 */
traceIn(msg, args) {
  this.trace(msg, args, 1);
  this.stack.push(msg);
}