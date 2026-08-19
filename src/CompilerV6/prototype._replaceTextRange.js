/**
 * @name CompilerV6.prototype._replaceTextRange
 * @type 
 * @description 
 */
_replaceTextRange(text, start, end, replacement, token = false) {
  this._trace("_replaceTextRange", arguments);
  if(text.length < start) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (1)");
  }
  if(text.length < end) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (2)");
  }
  const offset = (!token) && (token.syntax === "@Injects") ? 2 : 1;
  const output = text.slice(0, start) + replacement + text.slice(end + offset);
  return output;
}