/**
 * @name ModulerV6.Tracer.prototype.activate
 * @type 
 * @description 
 */
activate(really = true) {
  this.isTracing = !!really;
  return this;
}