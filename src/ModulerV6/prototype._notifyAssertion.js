/**
 * @name ModulerV6.prototype._notifyAssertion
 * @type 
 * @description 
 */
_notifyAssertion(message) {
  const text = `[ok] ${message}`;
  if(this._tracer.isTracing && (!this._tracer.matchesIgnorer(text))) {
    console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
  }
}