/**
 * @name ModulerV6.prototype.settings
 * @type 
 * @description 
 */
this.settings = new ModulerV6.Settings(this);
if(cloneOf) {
  this.settings.data = cloneOf.settings.data;
}