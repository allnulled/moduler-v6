/**
 * @name ModulerV6.prototype.toolkit
 * @type 
 * @description 
 */
if(this.constructor.Toolkit.globalInstance) {
  this.toolkit = this.constructor.Toolkit.globalInstance;
} else {
  this.toolkit = this.constructor.Toolkit.globalInstance = this.constructor.Toolkit.create(this);
}