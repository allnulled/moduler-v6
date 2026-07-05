/**
 * @name CompilerV6.constructor  
 * @type 
 * @description 
 */
constructor(basedirInput, parent = null, grammars = this.constructor._defaultGrammars) {
  if(!(typeof basedirInput === "string")) { throw new this.constructor.AssertionError(`Parameter «basedir» must be string not «${typeof basedirInput}» on «CompilerV6.constructor»`); }
  if(!(typeof parent === "object")) { throw new this.constructor.AssertionError(`Parameter «parent» must be object not «${typeof parent}» on «CompilerV6.constructor»`); }
  if(!(typeof grammars === "object")) { throw new this.constructor.AssertionError(`Parameter «grammars» must be object not «${typeof grammars}» on «CompilerV6.constructor»`); }
  if(parent) {
    this._tracer = parent._tracer;
  }
  this._trace("constructor", arguments);
  const basedir = parent ? parent.fullpathOf(basedirInput) : this.fullpathOf(basedirInput);
  // const basedir = this.normalizationOf(basedirInput);
  /*="./prototype.isBrowser.js"*/
  /*="./prototype.basedir.js"*/
  /*="./prototype.previousdir.js"*/
  /*="./prototype.rootdir.js"*/
  /*="./prototype.moduler.js"*/
  /*="./prototype._grammars.js"*/
  /*="./prototype._parser.js"*/
}
