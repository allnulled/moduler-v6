/**
 * @name CompilerV6.CompilationProcess.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, compiler) {
  this.constructor._assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationProcess.constructor»");
  this.constructor._assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationProcess.constructor»");
  this.compiler = compiler;
  this.compiler._traceIn("CompilationProcess.constructor", arguments);
  if(compilationProcess instanceof this.constructor) {
    this.compiler._traceOut("CompilationProcess.constructor", arguments);
    return Object.assign(this, compilationProcess);
  }
  this.compiler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationProcess.constructor»");
  this.compiler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationProcess.constructor»");
  Object.assign(this, this.constructor._defaultProcessData, compilationProcess);
  if(typeof this.resource === "undefined") {
    this.compiler._assert(typeof compilationFile.resource === "string", "Parameter «compilationProcess.resource» or «compilationFile.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
    this.resource = compilationFile.resource;
  }
  if(typeof this.isRoot === "undefined") {
    this.isRoot = compilationFile.isRoot;
  }
  this.compiler._assert(typeof this.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
  this.compiler._assert(typeof this.isRoot === "boolean", "Parameter «compilationProcess.isRoot» must be boolean on «CompilerV6.CompilationProcess.constructor»");
  this.compiler._traceOut("CompilationProcess.constructor", arguments);
}