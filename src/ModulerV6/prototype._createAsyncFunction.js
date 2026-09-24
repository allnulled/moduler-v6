/**
 * @name ModulerV6.prototype._createAsyncFunction
 * @type 
 * @description 
 */
_createAsyncFunction(source, parameters = []) {
  return new ModulerV6.AsyncFunction(...parameters, source);
}