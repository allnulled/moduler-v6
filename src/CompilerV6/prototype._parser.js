/**
 * @name CompilerV6.prototype._parser
 * @type 
 * @description 
 */
this._parser = {
  forJs: this.constructor.Parser.create(this._grammars.forJs),
  forCss: this.constructor.Parser.create(this._grammars.forCss),
  forMd: this.constructor.Parser.create(this._grammars.forMd),
};