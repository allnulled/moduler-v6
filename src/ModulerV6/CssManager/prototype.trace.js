/**
 * @name ModulerV6.CssManager.prototype.trace
 * @type 
 * @description 
 */
trace(method, args = [], forceLog = false) {
  if(this._isTracing || forceLog) {
    console.log(`[css-manager][${method}] ${args.length} args: ${[...args].map(arg => typeof arg).join(",")}`);
  }
}