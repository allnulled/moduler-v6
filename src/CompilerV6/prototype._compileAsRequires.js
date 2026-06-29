/**
 * @name CompilerV6.prototype._compileAsRequires
 * @type 
 * @description 
 */
async _compileAsRequires(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsRequires", arguments);
    return false;
  }
  this._traceIn("_compileAsRequires", arguments);
  let parameters, targetPath, targetCompilation;
  const {
    tokenization,
    source,
    resource,
    isRoot,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    });
  }
  Extend_token: {
    this._extendToken(token, ["referenceOf"]);
  }
  Extract_target_path: {
    this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsRequires»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    // @OK: nothing to add to the main sources, by @requires
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsRequires", arguments);
}