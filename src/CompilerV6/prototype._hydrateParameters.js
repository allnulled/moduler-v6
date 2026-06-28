/**
 * @name CompilerV6.prototype._hydrateParameters
 * @type 
 * @description 
 */
_hydrateParameters(parametersSource) {
  this._trace("_hydrateParameters", arguments);
  return (new Function(`return [${parametersSource}]`)).call();
}