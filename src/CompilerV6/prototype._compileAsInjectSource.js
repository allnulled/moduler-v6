/**
 * @name CompilerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectSource", arguments);
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
    this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectSource»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    if (compilationFile.extension === "js") {
      // Cuando desde un JS se hace $compiler.injects...
      let replacement = "";
      if (targetPath.endsWith(".js")) {
      // ...a un JS
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith(".css")) {
      // ...a un CSS
        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «css» files. Use commented @injects syntax instead.`);
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith(".md")) {
      // ...a un MD
        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «md» files. Use commented @injects syntax instead.`);
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» is trying to import foraneous extension`);
      }
      compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
    } else if (compilationFile.extension === "css") {
      // Cuando desde un CSS se hace $compiler.injects...
      throw new Error("Syntax of «$compiler.inject.source» should not be available on «css» files");
    } else if (compilationFile.extension === "md") {
      // Cuando desde un MD se hace $compiler.injects...
      throw new Error("Syntax of «$compiler.inject.source» should not be available on «md» files");
    } else {
      // Cuando desde otro formato se hace $compiler.injects...
      throw new Error(`Syntax of «$compiler.inject.source» should only be available on «js» files and not on «${compilationFile.extension}»`);
    }
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