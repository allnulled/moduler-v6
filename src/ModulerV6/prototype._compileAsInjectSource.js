/**
 * @name ModulerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, indexToken }) {
  this._traceIn("_compileAsInjectSource", arguments);
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
  const nonEmptyFiles = Object.keys(compilation).filter(ext => compilation[ext].length);
  if (currentExtension === "js") {
    let replacement = "";
    if (nonEmptyFiles.includes("js")) {
      replacement = compilation.js;
    }
    if (nonEmptyFiles.includes("css")) {
      throw new Error("Syntax of «$v6.inject.source» should not be used to import «css» files. Use commented @injects syntax instead.");
      compilationFile.compilation.css += "\n" + compilation.css;
    }
    if (nonEmptyFiles.includes("md")) {
      throw new Error("Syntax of «$v6.inject.source» should not be used to import «md» files. Use commented @injects syntax instead.");
      compilationFile.compilation.md += "\n\n" + compilation.md;
    }
    compilationFile.compilation.js =
      this._replaceTextRange(
        compilationFile.compilation.js,
        token.location[0],
        token.location[1],
        replacement
      );
  } else if (currentExtension === "css") {
    throw new Error("Syntax of «$v6.inject.source» should not be available on «css» files");
  } else if (currentExtension === "md") {
    throw new Error("Syntax of «$v6.inject.source» should not be available on «md» files");
  } else {
    throw new Error(`Syntax of «$v6.inject.source» should only be available on «js» files and not on «${currentExtension}»`);
  }
  this._traceOut("_compileAsInjectSource", arguments);
}