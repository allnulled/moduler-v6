/**
 * @name ModulerV6.prototype._replaceTextRange
 * @type 
 * @description 
 */
_replaceTextRange(text, start, end, replacement) {
  this._trace("_replaceTextRange", arguments);
  if(text.length < start) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (1)");
  }
  if(text.length < end) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (2)");
  }
  const output = text.slice(0, start) + replacement + text.slice(end + 1);
  
  return output;
}