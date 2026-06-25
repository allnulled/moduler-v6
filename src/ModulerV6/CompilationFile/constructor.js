/**
 * @name ModulerV6.CompilationFile.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, moduler) {
  this.constructor._assert(typeof moduler === "object", "Parameter «moduler» must be object on «ModulerV6.CompilationFile.constructor»");
  this.constructor._assert(moduler instanceof ModulerV6, "Parameter «moduler» must be instance of «ModulerV6» on «ModulerV6.CompilationFile.constructor»");
  this.moduler = moduler;
  this.moduler._traceIn("CompilationFile.constructor", arguments);
  this.moduler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.CompilationFile.constructor»");
  this.moduler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.CompilationFile.constructor»");
  Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultFileData)), compilationFile);
  this.moduler._assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.CompilationFile.constructor»");
  this.moduler._assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «ModulerV6.CompilationFile.constructor»");
  this.moduler._traceOut("CompilationFile.constructor", arguments);
}