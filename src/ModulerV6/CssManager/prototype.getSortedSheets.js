/**
 * @name ModulerV6.CssManager.prototype.getSortedSheets
 * @type 
 * @description 
 */
getSortedSheets() {
  return Object.keys(this.sheets).map(id => {
    return {
      id,
      ...this.sheets[id]
    }
  }).sort((a, b) => {
    return a.priority - b.priority;
  });
}