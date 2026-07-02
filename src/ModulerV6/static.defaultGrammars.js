/**
 * @name ModulerV6.defaultGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static defaultGrammars = {
  forJs: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
  ],
  forCss: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
  ],
  forMd: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
  ],
};