/**
 * @name ModulerV6._defaultGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static _defaultGrammars = {
  forJs: [
    this._nativeGrammars.InjectSource,
    this._nativeGrammars.InjectString,
    this._nativeGrammars.ImportJs,
    this._nativeGrammars.ImportCss,
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.ExportCss,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjection,
    this._nativeGrammars.JavadocComment,
  ],
  forCss: [
    this._nativeGrammars.InjectSource,
    this._nativeGrammars.InjectString,
    this._nativeGrammars.ImportJs,
    this._nativeGrammars.ImportCss,
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.ExportCss,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjection,
    this._nativeGrammars.JavadocComment,
  ],
  forMd: [
    this._nativeGrammars.InjectSource,
    this._nativeGrammars.InjectString,
    this._nativeGrammars.ImportJs,
    this._nativeGrammars.ImportCss,
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.ExportCss,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjection,
    this._nativeGrammars.JavadocComment,
  ],
};