/**
 * @name ModulerV6.prototype._createAsyncFunction
 * @type 
 * @description 
 */
_createAsyncFunction(source, parameters = []) {
  return new (async function() {}).constructor(source, ...parameters);
}