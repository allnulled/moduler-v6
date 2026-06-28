/**
 * @name CompilerV6.Tracer.prototype.removeHighlighter
 * @type 
 * @description 
 */
removeHighlighter(text) {
  const pos = highlightedPatterns.indexOf(text);
  if (pos !== -1) {
    highlightedPatterns.splice(pos, 1);
  }
}