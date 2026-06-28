/**
 * @name CompilerV6._nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static _nativeGrammars = {
  InjectSource: ["$compiler.inject.source(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject Source", inner: token.inner, location: token.location };
  }],
  InjectString: ["$compiler.inject.string(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject String", inner: token.inner, location: token.location };
  }],
  ImportJs: ["$compiler.import(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Compiler Import", ...token, };
  }, {allowInside:true}],
  ExportJs: ["$compiler.export(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
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