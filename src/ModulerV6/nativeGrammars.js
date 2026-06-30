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
  ImportJs: ["$compiler.import(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Compiler Import", ...token, };
  }, {allowInside:true}],
  ExportJs: ["$compiler.export(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Compiler Export", ...token, };
  }, {allowInside:true}],
  // ["/*%", "%*/", function (token) {
  //   return { syntax: "Multiline Comment Code Injection", ...token, };
  // }],
  MultilineCommentValueInjection: ["/*%=", "%*/", function (token) {
    return { syntax: "Multiline Comment Value Injection", ...token, };
  }],
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