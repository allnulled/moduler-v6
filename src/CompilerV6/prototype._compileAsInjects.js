/**
 * @name CompilerV6.prototype._compileAsInjects
 * @type 
 * @description 
 */
async _compileAsInjects(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjects", arguments);
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
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjects»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    if (compilationFile.resource.endsWith(".js")) {
      // Cuando desde un JS se hace @injects...
      let replacement = "";
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» should not be used to import «js» files from «js» files. Use another syntax instead, like «$v6.injects.source» or «commented template injection» on «CompilerV6.prototype._compileAsInjects»");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
    } else if (compilationFile.resource.endsWith(".css")) {
      let replacement = "";
      // Cuando desde un CSS se hace @injects...
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «css» files. Use another syntax instead.");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.css = this._replaceTextRange(compilationFile.compilation.css, token.location[0], token.location[1], replacement);
    } else if (compilationFile.resource.endsWith(".md")) {
      // Cuando desde un MD se hace @injects...
      let replacement = "";
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «md» files. Use another syntax instead.");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        throw new Error("Syntax of «@injects» can't be used to import «css» files from «md» files. Use another syntax instead.");
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.md = this._replaceTextRange(compilationFile.compilation.md, token.location[0], token.location[1], replacement);
    } else {
      throw new Error(`Syntax of «@injects» should only be available on «css,md» files and not on «${compilationFile.extension}»`);
    }
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjects", arguments);
}