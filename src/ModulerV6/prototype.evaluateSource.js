/**
 * @name ModulerV6.prototype.evaluateSource
 * @type 
 * @description 
 */
evaluateSource(source, injections = {}) {
  const asyncFunction = this._createAsyncFunction(source, ...Object.keys(injections));
  return asyncFunction(...Object.values(injections));
}