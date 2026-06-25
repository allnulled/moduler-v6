/**
 * @name ModulerV6.CompilationProcess.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, moduler) {
  this.constructor._assert(typeof moduler === "object", "Parameter «moduler» must be object on «ModulerV6.CompilationProcess.constructor»");
  this.constructor._assert(moduler instanceof ModulerV6, "Parameter «moduler» must be instance of «ModulerV6» on «ModulerV6.CompilationProcess.constructor»");
  this.moduler = moduler;
  this.moduler._traceIn("CompilationProcess.constructor", arguments);
  if(compilationProcess instanceof this.constructor) {
    this.moduler._traceOut("CompilationProcess.constructor", arguments);
    return Object.assign(this, compilationProcess);
  }
  this.moduler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.CompilationProcess.constructor»");
  this.moduler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.CompilationProcess.constructor»");
  Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultProcessData)), compilationProcess);
  if(typeof this.resource === "undefined") {
    this.moduler._assert(typeof compilationFile.resource === "string", "Parameter «compilationProcess.resource» or «compilationFile.resource» must be string on «ModulerV6.CompilationProcess.constructor»");
    this.resource = compilationFile.resource;
  }
  if(typeof this.isRoot === "undefined") {
    this.isRoot = compilationFile.isRoot;
  }
  this.moduler._assert(typeof this.resource === "string", "Parameter «compilationProcess.resource» must be string on «ModulerV6.CompilationProcess.constructor»");
  this.moduler._assert(typeof this.isRoot === "boolean", "Parameter «compilationProcess.isRoot» must be boolean on «ModulerV6.CompilationProcess.constructor»");
  this.moduler._traceOut("CompilationProcess.constructor", arguments);
}