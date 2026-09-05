/**
 * @name CompilerV6.prototype._findStringEnd
 * @type 
 * @description 
 */
_findStringEnd(source, position) {
  let escaped = false;
  for (let i = position + 1; i < source.length; i++) {
    const char = source[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === '"') return i + 1;
  }
  throw new SyntaxError("Unterminated string");
}