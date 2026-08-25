/**
 * @name ModulerV6.Tracer.constructor
 * @type 
 * @description 
 */
constructor(id = null, parent = null) {
  this.level = 0;
  if (parent) {
    // Propiedades heredades:
    this.level = parent.level;
  };
  this.id = id || ('mv6-' + ModulerV6._getRandomString(5));
}