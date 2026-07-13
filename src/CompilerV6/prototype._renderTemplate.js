/**
 * @name CompilerV6.prototype._renderTemplate
 * @type 
 * @description 
 */
_renderTemplate(templateSource, args = {}) {
  // return templateSource;
  // @TODO: compatibilizar el _parser.forCommentTemplates.parse aquí
  // @TODO:
  // @TODO:
  // @TODO:
  const templateTokens = this._parser.forTemplateComments.parse(templateSource);
  return templateTokens.tokens[0].inner;
  return templateSource;
}