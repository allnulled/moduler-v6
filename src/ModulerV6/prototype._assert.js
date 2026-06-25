/**
 * @name ModulerV6.prototype._assert
 * @type 
 * @description 
 */
_assert(condition, message) {
  this._trace("_assert", arguments);
  if (!condition) {
    throw new this.constructor.AssertionError(message);
  } else if(this._tracer.isTracing) {
    const text = `[ok] ${message}`;
    if(!this._tracer.matchesIgnorer(text)) {
      console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
    }
  }
}