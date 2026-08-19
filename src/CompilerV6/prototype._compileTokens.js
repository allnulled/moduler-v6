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
    "Inject Template": this._compileAsInjectTemplate,
    "Inject Module": this._compileAsInjectModule,
    "Multiline Comment Code Injection": this._compileAsMultilineCommentCodeInjection,
    "Multiline Comment Value Injection": this._compileAsMultilineCommentValueInjection,
    "Moduler Import": this._compileAsModulerImport,
    "Moduler Export": this._compileAsModulerExport,
    "@Requires": this._compileAsRequires,
    "@Injects": this._compileAsInjects,
    "Javadoc Comment": this._compileAsJavadocComment,
    // Sections:
    "Moduler Section Get": this._compileAsModulerSectionGet,
    "Moduler Section Set": this._compileAsModulerSectionSet,
    "Moduler Section Delete": this._compileAsModulerSectionDelete,
    "Moduler Section Overwrite": this._compileAsModulerSectionOverwrite,
    "Moduler Section Fill": this._compileAsModulerSectionFill,
    "Moduler Section Expand": this._compileAsModulerSectionExpand,
    // Markdown comments:
    "Multiline Markdown Comment": this._compileAsMultilineMarkdownComment,
    "New Paragraph Markdown Comment": this._compileAsNewParagraphMarkdownComment,
    "New Line Markdown Comment": this._compileAsNewLineMarkdownComment,
    "Precised Tabulation Markdown Comment": this._compileAsPrecisedTabulationMarkdownComment,
    "Increased Tabulation Markdown Comment": this._compileAsIncreasedTabulationMarkdownComment,
    "Decreased Tabulation Markdown Comment": this._compileAsDecreasedTabulationMarkdownComment,
    "Inline Markdown Comment": this._compileAsInlineMarkdownComment,
    "Unspaced Inline Markdown Comment": this._compileAsUnspacedInlineMarkdownComment,
  };
  const state = {};
  Iterating_tokens_backwardly:
  for (let tokenIndex = tokens.length - 1; tokenIndex >= 0; tokenIndex--) {
    const token = tokens[tokenIndex];
    Aplicar_logica_de_compilacion_backward_segun_token: {
      this.assert(token.syntax in _tokenCompilationSwitcher, `Syntax not identified «${token.syntax}»`);
      const methodCallback = _tokenCompilationSwitcher[token.syntax];
      await methodCallback.call(this, compilationFile, compilationProcess, { token, tokenIndex, state, });
    }
  }
  Unify_markdown: {
    this._unifyCompilationMarkdown(compilationFile, compilationProcess);
  }
  this._traceOut("_compileTokens", arguments);
  return compilationFile.compilation;
}
