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
  Inject_in_compilation_text: {
    // Aquí estás diciendo que:
    //   - en cada token 'Inject Source'
    //     - compilas el fichero referido
    //   - y después compruebas que no haya generado nada de css ni md
    //   - PERO esto no es correcto:
    //     - un fichero importado con inject.source SÍ PUEDE generar css y md paralelamente
    //   - Lo que sí que hay que bloquear es que:
    //     - el token injects.source intente introducir un fichero .css directamente
    //       - pero los js tienen que poder importar js, css y md
    //       - y los js tienen que poder importar css y md
    //       - y los md tienen que poder importar md
    //       - simplemente que INJECT.SOURCE no está para eso
    //         - y ESTO es lo que tienes que comprobar aquí
    //         - que el subpath sea js solamente
    if (currentExtension === "js") {
      let replacement = "";
      if (subpath.endsWith(".js")) {
        replacement = compilation.js;
      } else if (subpath.endsWith(".css")) {
        throw new Error(`Syntax of «$v6.inject.source» on file «${subpath}» should not be used to import «css» files. Use commented @injects syntax instead.`);
        compilationFile.compilation.css += "\n" + compilation.css;
      } else if (subpath.endsWith(".md")) {
        throw new Error(`Syntax of «$v6.inject.source» on file «${subpath}» should not be used to import «md» files. Use commented @injects syntax instead.`);
        compilationFile.compilation.md += "\n\n" + compilation.md;
      } else {
        throw new Error(`Syntax of «$v6.inject.source» on file «${subpath}» is trying to import foraneous extension`);
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
  }
  Inject_in_report_object: {
    if(compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, subpath, token);
    Object.assign(compilationFile.report.tree, compilation.report.tree);
  }
  this._traceOut("_compileAsInjectSource", arguments);
}