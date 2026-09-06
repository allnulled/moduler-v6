/**
 * @name CompilerV6.prototype._compileAsInjectModules
 * @type 
 * @description 
 */
async _compileAsInjectModules(compilationFile, compilationProcess, { token, tokenIndex }) {
  // @TODO: CHATGPT, estyo en esta funcionalidad.
  let out = "";
  let subcompiler = undefined;
  let subcode1 = "";
  let subcode2 = "";
  const parameters = this._getDataForTokenCompilation({ token });
  const collection = parameters[0];
  const isArray = Array.isArray(collection);
  const isObject = (!isArray) && (typeof collection === "object");
  this.moduler.assert(isArray || isObject, `Syntax «$compiler.inject.modules» only accepts array or object as first parameter but «${typeof collection}» was found instead`);
  Compile_modules: {
    subcode1 = "";
    subcompiler = this._cloneForFile(compilationFile.resource, this);
    const targetPaths = isArray ? [].concat(collection) : Object.values(collection);
    const targetKeys = Object.keys(collection);
    const compilationPromises = [];
    const compilationPairs = [];
    Compile:
    for(let indexTargets=0; indexTargets<targetPaths.length; indexTargets++) {
      const fileBrute = targetPaths[indexTargets];
      const file = subcompiler.normalizationOf(fileBrute);
      const targetCompilation = subcompiler._compileRecursively({
        resource: file,
        isRoot: false,
        parentCompilation: compilationFile,
      }, compilationProcess);
      compilationPromises.push(targetCompilation);
      compilationPairs.push({
        index: indexTargets,
        file: file,
        rootpath: subcompiler.rootdirOf(file),
      });
    }
    const compilations = await Promise.all(compilationPromises);
    Unify:
    for(let indexCompilations=0; indexCompilations<compilations.length; indexCompilations++) {
      const targetCompilation = compilations[indexCompilations];
      const targetInfo = compilationPairs[indexCompilations];
      if(isArray) {
        subcode1 += this._wrapAsModuleInjection(targetCompilation.js, rootpath);
        subcode1 += ",\n";
      } else if(isObject) {
        subcode1 += targetKeys[targetInfo.index];
        subcode1 += ": ";
        subcode1 += this._wrapAsModuleInjection(targetCompilation.js, targetInfo.rootpath);
        subcode1 += ",\n";
      }
    }
    if(isArray) {
      subcode1 = `[\n${subcode1}]`;
    } else {
      subcode1 = `{\n${subcode1} }`;
    }
  }
  Generate_output: {
    out += `$moduler.lockFiles([\n`;
    out += Object.values(collection).map(key => JSON.stringify(subcompiler.moduler.rootdirOf(key))).join(",\n  ");
    out += `\n]).until(Promise.fromCollection(${subcode1}))`;
  }
  compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], out, token);
}