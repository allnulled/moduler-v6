/**
 * @name ModulerV6.prototype.parser
 * @type 
 * @description 
 */
this.parser = {
  forJs: this.constructor.Parser.create(this.grammars.forJs),
  forCss: this.constructor.Parser.create(this.grammars.forCss),
  forMd: this.constructor.Parser.create(this.grammars.forMd),
  forTemplateComments: this.constructor.Parser.create(this.grammars.forTemplateComments),
  forEmbeddedForms: this.constructor.Parser.create(this.grammars.forEmbeddedForms),
};