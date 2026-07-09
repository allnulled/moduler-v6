/**
 * @name CompilerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectSource", arguments);
  let parameters, targetPath, targetCompilation, targetInjection;
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
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectSource»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    Use_processedEntries_cache_if_possible: {
      if (compilationProcess.to === "data") {
        break Use_processedEntries_cache_if_possible;
      }
      if (compilationProcess.uncacheInjections) {
        // @CHATGPT:
        // se está perdiendo la info del compilationProcess.uncacheInjections en el test que lo lanzo con el --uncacheInjections
        // parece que hay coherencia entre las transformaciones
        // dime dónde quieres que ponga logs o asserts si quieres
        // pero aquí no entra aunque el comando se lo lance con command(["touch", "--file", "file-tal.js", "--uncacheInjections"])
        break Use_processedEntries_cache_if_possible;
      }
      if (Object.keys(compilationProcess.processedEntries).length) {
        if (targetPath in compilationProcess.processedEntries) {
          targetInjection = await require("fs").promises.readFile(compilationProcess.processedEntries[targetPath].distJs, "utf8");
          break Compile_target;
        }
      }
    }
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    this.assert(compilationFile.extension === "js", `Syntax of «$compiler.inject.source» should only be available on «js» files and not on «${compilationFile.extension}»`);
    this.assert(targetPath.endsWith(".js"), `Syntax of «$compiler.inject.source» on file «${targetPath}» is trying to import foraneous extension format from file «${targetPath}» on «CompilerV6.prototype._compileAsInjectSource»`);
    if (!targetInjection) {
      targetInjection = targetCompilation.js;
    }
    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], targetInjection);
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjectSource", arguments);
}