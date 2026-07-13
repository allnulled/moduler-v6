/**
 * @name CompilerV6.prototype._compileAsInjectTemplate
 * @type 
 * @description 
 */
async _compileAsInjectTemplate(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectTemplate", arguments);
  let parameters, targetPath, fileContent;
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
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectTemplate»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    fileContent = await this._readPath(targetPath);
  }
  Inject_in_compilation_text: {
    if (compilationFile.extension !== "js") {
      break Inject_in_compilation_text;
    }
    const templateOutput = await this._renderTemplate(fileContent, {
      __filename: targetPath,
      __dirname: require("path").dirname(targetPath),
      ...(parameters[1] || {})
    });
    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], templateOutput);
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjectTemplate", arguments);
}