/**
 * @name CompilerV6.prototype._fetchCompilable
 * @type 
 * @description 
 */
_fetchCompilable(compilationFile, compilationProcess) {
  this._trace("_fetchCompilable", arguments);
  this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._fetchCompilable»");
  this.assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.prototype._fetchCompilable»");
  // console.log(compilationFile.resource);
  if(compilationFile.resource.endsWith(".json")) {
    compilationFile.extension = "json";
    return this._readPath(compilationFile.resource).then(source => {
      compilationFile.source = "";
      return compilationFile.compilation.json = "";
    });
  }
  const validFilesRegex = /\.(js|css|md|html)$/g;
  this.assert(validFilesRegex.test(compilationFile.resource), `Parameter «compilationFile.resource» now «${compilationFile.resource}» must match with valid extension on «CompilerV6.prototype._fetchCompilable»`);
  Sacar_la_extension_del_fichero: {
    compilationFile.extension = compilationFile.resource.match(validFilesRegex)[0].substr(1);
  }
  Propagar_la_extension_al_proceso_si_es_la_primera: {
    if(typeof compilationProcess.extension === "undefined") {
      compilationProcess.extension = compilationFile.extension;
    }
  }
  Bloquear_imports_segun_extension_de_compilable_original: {
    const privilegedExtensions = ["js"];
    const fromExtension = compilationProcess.extension;
    const toExtension = compilationFile.extension;
    if(privilegedExtensions.includes(fromExtension)) {
      // @OK, con js todo.
    } else if(fromExtension === "css") {
      this.assert(!privilegedExtensions.includes(toExtension), `From a «css» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
    } else if(fromExtension === "md") {
      this.assert(!privilegedExtensions.includes(toExtension), `From an «md» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
      this.assert(toExtension !== "css", `From an «md» file «${compilationProcess.resource}» cannot inject «css» file «${compilationFile.resource}»`);
    }
  }
  return this._readPath(compilationFile.resource).then(source => {
    compilationFile.source = source;
    return compilationFile.compilation[compilationFile.extension] = source;
  });
}