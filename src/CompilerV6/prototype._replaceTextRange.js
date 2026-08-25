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
  // @ANTES:
  // const offset = ((!token) && (token.syntax === "@Injects")) ? 2 : 1;
  const offset = token.syntax === "@Injects" ? 0 : 1;
  // @AHORA: porque ya está solucionado lo del offset de @injects del location[1]
  // @ATENCIÓN: aquí le decimos que empiece por el siguiente caracter del último
  // @ATENCIÓN: porque location[1] indica la posición final del inner, NO LA INICIAL DEL OUTER
  const output = text.slice(0, start) + replacement + text.slice(end + offset);
  return output;
}