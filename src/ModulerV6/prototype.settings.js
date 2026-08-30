/**
 * @name ModulerV6.prototype.settings
 * @type 
 * @description 
 */
this.settings = new ModulerV6.Settings(this);
if(cloneOf) {
  // @CUIDADO: HE PUESTO UN ? PARA PASAR UN FALLO
  this.settings.data = cloneOf.settings?.data;
}