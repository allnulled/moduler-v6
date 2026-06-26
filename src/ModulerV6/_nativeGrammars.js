/**
 * @name ModulerV6._nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static _nativeGrammars = {
  InjectSource: ["$v6.inject.source(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject Source", inner: token.inner, location: token.location };
  }],
  InjectString: ["$v6.inject.string(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject String", inner: token.inner, location: token.location };
  }],
  ImportJs: ["$v6.import.js(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Import Js", ...token, };
  }, {allowInside:true}],
  ImportCss: ["$v6.import.css(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Import Css", ...token, };
  }, {allowInside:true}],
  ExportJs: ["$v6.export.js(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Export Js", ...token, };
  }, {allowInside:true}],
  ExportCss: ["$v6.export.css(", TextParserV1.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Export Css", ...token, };
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