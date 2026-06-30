/**
 * @name CompilerV6.prototype._compileTokens
 * @type 
 * @description 
 */
async _compileTokens(compilationFile, compilationProcess) {
  this._traceIn("_compileTokens", arguments);
  const { resource, source, tokenization: { formatted: tokens } } = compilationFile;
  const _tokenCompilationSwitcher = {
    "Inject Source": this._compileAsInjectSource,
    "Inject String": this._compileAsInjectString,
    "Multiline Comment Code Injection": this._compileAsMultilineCommentCodeInjection,
    "Multiline Comment Value Injection": this._compileAsMultilineCommentValueInjection,
    "Moduler Import": this._compileAsModulerImport,
    "Moduler Export": this._compileAsModulerExport,
    "@Requires": this._compileAsRequires,
    "@Injects": this._compileAsInjects,
    "Javadoc Comment": this._compileAsJavadocComment,
  };
  Iterating_tokens:
  for (let tokenIndex = tokens.length - 1; tokenIndex >= 0; tokenIndex--) {
    const token = tokens[tokenIndex];
    Extraer_las_rutas_dependencia: {
      this.assert(token.syntax in _tokenCompilationSwitcher, `Syntax not identified «${token.syntax}»`);
      const methodCallback = _tokenCompilationSwitcher[token.syntax];
      await methodCallback.call(this, compilationFile, compilationProcess, { token, tokenIndex, });
    }
  }
  this._traceOut("_compileTokens", arguments);
  return compilationFile.compilation;
}
