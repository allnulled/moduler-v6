/**
 * @name CompilerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectSource", arguments);
  let parameters, targetPath, targetCompilation, targetCaches = {};
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
      if ((compilationProcess.to === "data") || (compilationProcess.uncacheInjections)) {
        break Use_processedEntries_cache_if_possible;
      }
      if ((Object.keys(compilationProcess.processedEntries).length) && (targetPath in compilationProcess.processedEntries)) {
        const previousCache = compilationProcess.processedEntries[targetPath];
        targetCaches.js = await require("fs").promises.readFile(previousCache.distJs, "utf8");
        if(previousCache.distCss) targetCaches.css = await this._tryToReadFile(previousCache.distCss, null);
        if(previousCache.distMd) targetCaches.md = await this._tryToReadFile(previousCache.distMd, null);
        break Compile_target;
      }
    }
    Create_file_unless_it_exists_or_option_dontCreateOnInjectSource_is_true: {
      if (!compilationProcess.dontCreateOnInjectSource) {
        const existsFile = await this._existsFile(targetPath);
        if (!existsFile) {
          const path = require("path");
          const targetId = this.rootdirOf(targetPath).replace(/\.js$/g, "");
          await this._createDefaultInjectedFile(targetPath, targetId);
        }
      }
    }
    Make_compilation_finally: {
      targetCompilation = await this._compileRecursively({
        resource: targetPath,
        isRoot: false,
        parentCompilation: compilationFile, // compilationFile.parentCompilation || compilationFile,,
      }, compilationProcess);
    }
  }
  Inject_in_compilation_text: {
    this.assert(compilationFile.extension === "js", `Syntax of «$compiler.inject.source» should only be available on «js» files and not on «${compilationFile.extension}»`);
    this.assert(targetPath.endsWith(".js"), `Syntax of «$compiler.inject.source» on file «${compilationFile.resource}» is trying to import foraneous extension format file «${targetPath}» on «CompilerV6.prototype._compileAsInjectSource»`);
    if (!targetCaches.js) targetCaches.js = targetCompilation.js;
    targetCaches.css = targetCaches.css || targetCompilation?.css;
    targetCaches.md = targetCaches.md || targetCompilation?.md;
    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], targetCaches.js);
    Esto_tiene_que_hacerse_desde_dentro_del_compileRecursively: {
      // compilationFile.compilation.css += targetCaches.css;
      // compilationFile.compilation.md += targetCaches.md;
    }
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      // break Inject_in_report_object;
    }
    if((!compilationFile?.report?.tree) || (!targetCompilation)) {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjectSource", arguments);
}