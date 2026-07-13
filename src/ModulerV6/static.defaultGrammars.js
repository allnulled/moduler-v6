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
    this.nativeGrammars.InjectTemplate,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    /*
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.MultilineCommentCodeInjection,
    //*/
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
    // Sections management grammars:
    /*
    this.nativeGrammars.SectionGet,
    this.nativeGrammars.SectionSet,
    this.nativeGrammars.SectionOverwrite,
    this.nativeGrammars.SectionExpand,
    this.nativeGrammars.SectionFill,
    this.nativeGrammars.SectionHas,
    this.nativeGrammars.SectionInitialize,
    //*/
  ],
  forCss: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.InjectTemplate,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    /*
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.MultilineCommentCodeInjection,
    //*/
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
  forCssOnRuntime: [
    this.nativeGrammars.AtRequires,
  ],
  forTemplateComments: [
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.MultilineCommentCodeInjection,
  ],
};