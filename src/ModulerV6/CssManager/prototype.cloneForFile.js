/**
 * @name ModulerV6.CssManager.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(file) {
  const submoduler = this.moduler.cloneForFile(file);
  Synchronized_inheritance_between_css_managers: {
    // @ATENTION: Este es el hack que hace que todo vaya ok:
    submoduler.css.sheets = this.sheets;
  }
  return submoduler;
}