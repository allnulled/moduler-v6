/**
 * @name CompilerV6._defaultGrammars
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
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjects,
    this._nativeGrammars.JavadocComment,
  ],
  forCss: [
    this._nativeGrammars.InjectSource,
    this._nativeGrammars.InjectString,
    this._nativeGrammars.ImportJs,
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjects,
    this._nativeGrammars.JavadocComment,
  ],
  forMd: [
    this._nativeGrammars.InjectSource,
    this._nativeGrammars.InjectString,
    this._nativeGrammars.ImportJs,
    this._nativeGrammars.ExportJs,
    this._nativeGrammars.MultilineCommentValueInjection,
    this._nativeGrammars.AtRequires,
    this._nativeGrammars.AtInjects,
    this._nativeGrammars.JavadocComment,
  ],
};