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
    console.error("[!] Parameters could not be hydrated due to some error on function compilation");
    console.error("[!] Source that started the error:");
    console.error(parametersSource);
    throw error;
  }
}