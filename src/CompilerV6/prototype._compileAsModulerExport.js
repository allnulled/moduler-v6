/**
 * @name CompilerV6.prototype._compileAsModulerExport
 * @type 
 * @description 
 */
async _compileAsModulerExport(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerExport", arguments);
    return false;
  }
  this._traceIn("_compileAsModulerExport", arguments);
  let parameters, namedParameters = {}, targetPaths = [];
  const {
    tokenization,
    source,
    resource,
    isRoot,
    subcompiler,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    }, {
      onError(error) {
        return error;
      }
    });
  }
  if(parameters instanceof Error) {
    Handle_errors_evaluating_parameters: {
      // @OK: no compilation or path guessing if parameters can not be evaluated
      console.error(`The load of inner parameters of token type «$moduler.export» on file «${compilationFile.resource}» could not be retrieved maybe because of runtime code that cannot be solved on compilation-time on «ModulerV6.prototype._compileAsModulerExport»`);
      console.error(parameters);
    }
  } else {
    Extract_targets_path: {
      namedParameters = this.moduler._formatExportParameters(parameters, compilationFile.resource);
      targetPaths = (namedParameters.file ? [namedParameters.file] : []).concat(namedParameters.dependencies);
    }
    Extend_token: {
      token.dependenciesOf = targetPaths;
    }
    Compile_all_targets: {
      for(let indexTarget=0; indexTarget<targetPaths.length; indexTarget++) {
        const targetPath = targetPaths[indexTarget];
        const targetCompilation = await subcompiler._compileRecursively({
          resource: subcompiler.fullpathOf(targetPath),
          isRoot: false,
        }, compilationProcess);
        Inject_in_compilation_text: {
          // @OK: no code injection on moduler.export
        }
        Inject_in_report_object: {
          this._reportFileToken(compilationFile, targetPath, token);
          Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
        }
      }
    }
  }
  this._traceOut("_compileAsModulerExport", arguments);
}