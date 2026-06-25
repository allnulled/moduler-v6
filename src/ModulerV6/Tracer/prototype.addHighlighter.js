/**
 * @name ModulerV6.Tracer.prototype.addHighlighter
 * @type 
 * @description 
 */
addHighlighter(text) {
  if (highlightedPatterns.indexOf(text) === -1) {
    highlightedPatterns.push(text);
  }
}