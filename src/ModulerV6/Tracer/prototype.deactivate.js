/**
 * @name ModulerV6.Tracer.prototype.deactivate
 * @type 
 * @description 
 */
deactivate(really = true) {
  this.isTracing = !!!really;
  return this;
}