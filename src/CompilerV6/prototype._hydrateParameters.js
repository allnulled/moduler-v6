/**
 * @name CompilerV6.prototype._hydrateParameters
 * @type 
 * @description 
 */
_hydrateParameters(parametersSource) {
  this._trace("_hydrateParameters", arguments);
  // console.log(parametersSource);
  try {
    // @ATTENTION: Diu-a-fondiskiuts
    return (new Function(`return [${parametersSource}]`)).call();
  } catch (error) {
    return [`[#ERROR]=${error.name}:${error.message}`];
  }
}