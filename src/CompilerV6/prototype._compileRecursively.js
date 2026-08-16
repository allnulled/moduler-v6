/**
 * @name CompilerV6.prototype._compileRecursively
 * @type private class method
 * @description  
 */
async _compileRecursively(fileParameters = {}, processParameters = {}) {
  this._traceIn("_compileRecursively", arguments);
  this.assert(typeof fileParameters === "object", "Parameter «fileParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof fileParameters.resource === "string", "Parameter «fileParameters.resource» must be string on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof processParameters === "object", "Parameter «processParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  let compilationFile, compilationProcess, subcompiler, output;
  Initialize_parameters: {
    compilationFile = this.constructor.CompilationFile.from(fileParameters, processParameters, this);
    compilationProcess = this.constructor.CompilationProcess.from(fileParameters, processParameters, this);
  }
  this.assert(processParameters.uncacheInjections === compilationProcess.uncacheInjections, "Las inyecciones 1");
  Add_entry_in_tree: {
    // compilationFile.resource = this.rootdirOf(compilationFile.resource);
    const id = this.rootdirOf(compilationFile.resource);
    compilationFile.report.tree[id] = compilationFile.report.tree[id] || {};
  }
  Update_md_title_indentation: {
    compilationFile.titleIndentation = compilationFile.parentCompilation?.titleIndentation || 0;
    if(compilationFile.resource.endsWith(".entry.js")) {
      compilationFile.titleIndentation++;
    }
  }
  Compile_inner_files_recursively_with_subcompiler: {
    subcompiler = this._cloneForFile(compilationFile.resource, this);
    compilationFile.subcompiler = subcompiler;
    await subcompiler._fetchCompilable(compilationFile, compilationProcess);
    await subcompiler._renderSourceAsTemplate(compilationFile, compilationProcess);
    subcompiler._tokenizeText(compilationFile, compilationProcess);
    await subcompiler._compileTokens(compilationFile, compilationProcess);
    output = subcompiler._getPreferredOutput(compilationFile, compilationProcess);
  }
  Beautify_and_minify: {
    if (fileParameters.isRoot && (processParameters.beautify || processParameters.minify) && (!this.isBrowser) && (typeof output.js === "string")) {
      const originalSize = this.constructor.getStringSize(output.js);
      if (processParameters.beautify) {
        const startedAt = new Date();
        const beautifiedCode = await this.constructor.beautifyJs(output.js);
        output.beautifiedJs = {
          code: beautifiedCode,
          chars: beautifiedCode.length,
          originalSize: originalSize,
          size: this.constructor.getStringSize(beautifiedCode),
          sizeRelationOf: ((beautifiedCode.length / (output.js.length || 1)) * 100).toFixed(2) + "%",
          time: ((((new Date()) - startedAt) / 1000).toFixed(3) + "s"),
        };
      }
      if (processParameters.minify) {
        const startedAt = new Date();
        const minifiedCode = (await this.constructor.hardMinifyJs(output.js)).code;
        output.minifiedJs = {
          code: minifiedCode,
          chars: minifiedCode.length,
          originalSize: originalSize,
          size: this.constructor.getStringSize(minifiedCode),
          sizeRelationOf: ((minifiedCode.length / (output.js.length || 1)) * 100).toFixed(2) + "%",
          time: ((((new Date()) - startedAt) / 1000).toFixed(3) + "s"),
        };
      }
    }
  }

  If_file_is_root:
  if (fileParameters.isRoot) {
    Bundle_as_CompilationResult: {
      output = new this.constructor.CompilationResult(output, this);
    }
    And_file_is_entry:
    if (compilationFile.resource.endsWith(".entry.js")) {
      Generate_rels_json_file: {
        const relsFile = this.normalizationOf(this.rootdirOf(compilationFile.resource).replace(/^\@\/src\//g, "@/dist/").replace(/\.entry\.js$/g, ".rels.json"));
        await this.files.writeFile.try(relsFile, JSON.stringify(compilationFile.report, null, 2), "utf8");
      }
    }
  }
  this._traceOut("_compileRecursively", arguments);
  return output;
}