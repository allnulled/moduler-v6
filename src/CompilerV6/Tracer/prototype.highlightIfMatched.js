/**
 * @name CompilerV6.Tracer.prototype.highlightIfMatched
 * @type 
 * @description 
 */
highlightIfMatched(output) {
  let styling = false;
  Iterating_patterns:
  for (let index = 0; index < this.highlightedPatterns.length; index++) {
    const details = this.highlightedPatterns[index];
    const [text] = details;
    if (output.indexOf(text) !== -1) {
      styling = details[1] || "yellow,bold";
      break Iterating_patterns;
    }
  }
  if (output.includes("++]") || output.includes("--]")) {
    styling = "bold," + (styling || "");
  }
  if (styling === false) {
    return output;
  }
  return this.compiler.constructor.ansi.colors.style(styling).text(output);
}