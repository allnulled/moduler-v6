/**
 * @name ModulerV6.nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static nativeGrammars = {
  InjectSource: ["$compiler.inject.source(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject Source", inner: token.inner, location: token.location };
  }],
  InjectString: ["$compiler.inject.string(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject String", inner: token.inner, location: token.location };
  }],
  InjectTemplate: ["$compiler.inject.template(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject Template", ...token, };
  }],
  ImportJs: ["$moduler.import(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Import", ...token, };
  }, {allowInside:true}],
  ExportJs: ["$moduler.export(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Export", ...token, };
  }, {allowInside:true}],
  //*
  SectionGet: ["$moduler.section.get(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Get", ...token, };
  }, {allowInside:true}],
  SectionSet: ["$moduler.section.set(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Set", ...token, };
  }, {allowInside:true}],
  SectionOverwrite: ["$moduler.section.overwrite(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Overwrite", ...token, };
  }, {allowInside:true}],
  SectionExpand: ["$moduler.section.expand(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Expand", ...token, };
  }, {allowInside:true}],
  SectionFill: ["$moduler.section.fill(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Fill", ...token, };
  }, {allowInside:true}],
  SectionHas: ["$moduler.section.has(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Has", ...token, };
  }, {allowInside:true}],
  SectionInitialize: ["$moduler.section.initialize(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Initialize", ...token, };
  }, {allowInside:true}],
  //*/
  MultilineCommentValueInjection: ["/*%=", "*/", function (token) {
    return { syntax: "Multiline Comment Value Injection", ...token, };
  }, {includeAppendix: ['"template"', "0"]}],
  MultilineCommentCodeInjection: ["/*%", "*/", function (token) {
    return { syntax: "Multiline Comment Value Injection", ...token, };
  }, {includeAppendix: ['"template"', "0"]}],
  AtRequires: ["/*@requires:", "*/", function (token) {
    return { syntax: "@Requires", ...token, };
  }],
  AtInjects: ["/*@injects:", "*/", function (token) {
    return { syntax: "@Injects", ...token, };
  }],
  JavadocComment: ["/**", "*/", function (token) {
    return { syntax: "Javadoc Comment", ...token, };
  }, {allowInside:true}],
};