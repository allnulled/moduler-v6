/**
 * @name ModulerV6.prototype._compileTokens
 * @type 
 * @description 
 */
async _compileTokens(compilationFile, compilationProcess) {
  this._traceIn("_compileTokens", arguments);
  const { resource, source, tokenization: { formatted: tokens } } = compilationFile;
  // 
  Iterating_tokens:
  for (let indexToken = tokens.length - 1; indexToken >= 0; indexToken--) {
    const token = tokens[indexToken];
    Extraer_las_rutas_dependencia: {
      if(false) {
        // @NEVER
      } else if(token.syntax === "Inject Source") {
        await this._compileAsInjectSource(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Inject String") {
        await this._compileAsInjectString(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Multiline Comment Code Injection") {
        await this._compileAsMultilineCommentCodeInjection(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Multiline Comment Value Injection") {
        await this._compileAsMultilineCommentValueInjection(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Import Js") {
        await this._compileAsImportJs(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Export Js") {
        await this._compileAsExportJs(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Requires") {
        await this._compileAsRequires(compilationFile, compilationProcess, { token, indexToken });
      } else if(token.syntax === "Javadoc Comment") {
        await this._compileAsJavadocComment(compilationFile, compilationProcess, { token, indexToken });
      } else {
        throw new Error(`Syntax not identified «${token.syntax}»`);
      }
    }
  }
  this._traceOut("_compileTokens", arguments);
  return compilationFile.output = compilationFile.compilation;
}