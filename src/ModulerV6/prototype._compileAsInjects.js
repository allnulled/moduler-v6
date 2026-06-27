/**
 * @name ModulerV6.prototype._compileAsInjects
 * @type 
 * @description 
 */
async _compileAsInjects(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjects", arguments);
  const { tokenization, source, resource, isRoot, } = compilationFile;
  const parameters = this._hydrateParameters(token.inner);
  this._assert(Array.isArray(parameters), `Parameters of injection must be an array in «${token.inner}» on «ModulerV6.prototype._compileAsInjectSource»`);
  this._assert(typeof parameters[0] === "string", `First parameter of injection must be string but «${typeof parameters[0]}» was found instead on «ModulerV6.prototype._compileAsInjectSource»`);
  const subpath = this.fullpathOf(parameters[0]);
  const compilation = await this._compileRecursively({
    resource: subpath,
    isRoot: false,
  }, compilationProcess);
  const currentExtension = compilationFile.extension;
  Inject_in_compilation_text: {
    if (currentExtension === "js") {
      let replacement = "";
      if (subpath.endsWith("js")) {
        throw new Error("Syntax of «@injects» should not be used to import «js» files from «js» files. Use another syntax instead, like «$v6.injects.source» or «commented template injection».");
        replacement = compilation.js;
      } else if (subpath.endsWith("css")) {
        compilationFile.compilation.css += "\n" + compilation.css;
      } else if (subpath.endsWith("md")) {
        compilationFile.compilation.md += "\n\n" + compilation.md;
      } else {
        throw new Error(`Syntax of «@injects» on «${subpath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.js =
        this._replaceTextRange(
          compilationFile.compilation.js,
          token.location[0],
          token.location[1],
          replacement
        );
    } else if (currentExtension === "css") {
      let replacement = "";
      if (subpath.endsWith("js")) {
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «css» files. Use another syntax instead.");
        replacement = compilation.js;
      } else if (subpath.endsWith("css")) {
        compilationFile.compilation.css += "\n" + compilation.css;
      } else if (subpath.endsWith("md")) {
        compilationFile.compilation.md += "\n\n" + compilation.md;
      } else {
        throw new Error(`Syntax of «@injects» on «${subpath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.css =
        this._replaceTextRange(
          compilationFile.compilation.css,
          token.location[0],
          token.location[1],
          replacement
        );
    } else if (currentExtension === "md") {
      let replacement = "";
      if (subpath.endsWith("js")) {
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «md» files. Use another syntax instead.");
        replacement = compilation.js;
      } else if (subpath.endsWith("css")) {
        throw new Error("Syntax of «@injects» can't be used to import «css» files from «md» files. Use another syntax instead.");
        compilationFile.compilation.css += "\n" + compilation.css;
      } else if (subpath.endsWith("md")) {
        compilationFile.compilation.md += "\n\n" + compilation.md;
      } else {
        throw new Error(`Syntax of «@injects» on «${subpath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.md =
        this._replaceTextRange(
          compilationFile.compilation.md,
          token.location[0],
          token.location[1],
          replacement
        );
    } else {
      throw new Error(`Syntax of «@injects» should only be available on «css,md» files and not on «${currentExtension}»`);
    }
  }
  Inject_in_report_object: {
    if(compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, subpath, token);
    Object.assign(compilationFile.report.tree, compilation.report.tree);
  }
  this._traceOut("_compileAsInjects", arguments);
}