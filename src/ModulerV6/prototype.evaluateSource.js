/**
 * @name ModulerV6.prototype.evaluateSource
 * @type 
 * @description 
 */
evaluateSource(source, injections = {}, file = null) {
  if(typeof source === "undefined") return undefined;
  this.assert(typeof source === "string", `Parameter «source» must be string but «${typeof source}» was passed instead on «ModulerV6.prototype.evaluateSource»`);
  this.assert(typeof injections === "object", `Parameter «injections» must be object but «${typeof injections}» was passed instead on «ModulerV6.prototype.evaluateSource»`);
  this.assert(!Array.isArray(injections), `Parameter «injections» must be object but not array on «ModulerV6.prototype.evaluateSource»`);
  this.assert(injections !== null, `Parameter «injections» must be object but not null on «ModulerV6.prototype.evaluateSource»`);
  // @CUIDADO-FALSÍSIMO:
  En_teoria_es_el_polifiler_de_estar_en_un_entorno_package_json_type_module_que_yo_no_lo_tengo_pero_bueno: {
    if(!this.constructor.isBrowser) {
      injections.require = require;
      injections.__dirname = __dirname;
    }
  }
  const allKeys = Object.keys(injections);
  const allObjects = Object.values(injections);
  const finalSource = this._wrapInTry(source, injections, file);
  const asyncFunction = this._createAsyncFunction(finalSource, allKeys);
  return asyncFunction(...allObjects);
}