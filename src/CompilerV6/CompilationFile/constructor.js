/**
 * @name CompilerV6.CompilationFile.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, compiler) {
  this.constructor.assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationFile.constructor»");
  this.constructor.assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationFile.constructor»");
  this.compiler = compiler;
  if (compilationProcess instanceof this.constructor) {
    this.compiler._traceOut("CompilationProcess.constructor", arguments);
    Object.assign(this, this.constructor._defaultFileData, compilationFile);
    return this;
  }
  this.compiler._traceIn("CompilationFile.constructor", arguments);
  this.compiler.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationFile.constructor»");
  this.compiler.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationFile.constructor»");
  Object.assign(this, this.constructor._defaultFileData, compilationFile);
  this.compiler.assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.CompilationFile.constructor»");
  this.compiler.assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «CompilerV6.CompilationFile.constructor»");
  this.compiler._traceOut("CompilationFile.constructor", arguments);
}