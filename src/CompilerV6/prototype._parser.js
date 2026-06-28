/**
 * @name CompilerV6.prototype._parser
 * @type 
 * @description 
 */
this._parser = {
  forJs: TextParserV1.create(this._grammars.forJs),
  forCss: TextParserV1.create(this._grammars.forCss),
  forMd: TextParserV1.create(this._grammars.forMd),
};