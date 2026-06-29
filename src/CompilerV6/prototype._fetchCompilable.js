/**
 * @name CompilerV6.prototype._fetchCompilable
 * @type 
 * @description 
 */
_fetchCompilable(compilationFile, compilationProcess) {
  this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._fetchCompilable»");
  this.assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.prototype._fetchCompilable»");
  // console.log(compilationFile.resource);
  this.assert((/\.(js|css|md)$/g).test(compilationFile.resource), `Parameter «compilationFile.resource» now «${compilationFile.resource}» must match with valid extension on «CompilerV6.prototype._fetchCompilable»`);
  Sacar_la_extension_del_fichero: {
    compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
  }
  Propagar_la_extension_al_proceso_si_es_la_primera: {
    if(typeof compilationProcess.extension === "undefined") {
      compilationProcess.extension = compilationFile.extension;
    }
  }
  Bloquear_imports_segun_extension_de_compilable_original: {
    if(compilationProcess.extension === "js") {
      // @OK, con js todo.
    } else if(compilationProcess.extension === "css") {
      this.assert(compilationFile.extension !== "js", `From a «css» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
    } else if(compilationProcess.extension === "md") {
      this.assert(compilationFile.extension !== "js", `From an «md» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
      this.assert(compilationFile.extension !== "css", `From an «md» file «${compilationProcess.resource}» cannot inject «css» file «${compilationFile.resource}»`);
    }
  }
  return this._readPath(compilationFile.resource).then(source => {
    compilationFile.source = source;
    return compilationFile.compilation[compilationFile.extension] = source;
  });
}