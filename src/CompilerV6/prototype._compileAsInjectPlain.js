/**
 * @name CompilerV6.prototype._compileAsInjectPlain
 * @type 
 * @description 
 */
async _compileAsInjectPlain(compilationFile, compilationProcess, { token, tokenIndex }, options = {}) {
  this._traceIn("_compileAsInjectPlain", arguments);
  let parameters, targetPath, targetCompilation, targetCaches = {};
  const currentStep = [];
  try {
    const {
      tokenization,
      source,
      resource,
      isRoot,
    } = compilationFile;
    Evaluate_parameters: {
      currentStep.push("1. evaluate parameters");
      parameters = await this._getDataForTokenCompilation({
        compilationFile,
        compilationProcess,
        token,
        tokenIndex,
      });
    }
    Extend_token: {
      currentStep.push("2. extend token");
      this._extendToken(token, ["referenceOf"]);
    }
    Extract_target_path: {
      currentStep.push("3. extract target path");
      this.assert(token.referenceOf.fullpath === this.normalizationOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectPlain»");
      targetPath = token.referenceOf.fullpath;
    }
    let outputJs = "";
    Read_source: {
      outputJs = await this.files.readFile(targetPath);
    }
    Inject_content: {
      compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], outputJs, token);
    }
  } catch(error) {
    console.log(`[!] Error on method «_compileAsInjectPlain» on root «${this.rootdir}» on resource «${this.rootdirOf(compilationFile.resource)}» and target «${this.rootdirOf(targetPath || "?")}» on step «${currentStep.reverse().join(" < ")}»`, error);
    throw error;
  }
}