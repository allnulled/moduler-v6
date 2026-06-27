/**
 * @name ModulerV6.Logger.Manager.get.current
 * @type 
 * @description 
 */
get current() {
  return this.subloggers[this.selected];
}