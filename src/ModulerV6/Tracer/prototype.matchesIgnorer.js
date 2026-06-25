/**
 * @name ModulerV6.Tracer.prototype.matchesIgnorer
 * @type 
 * @description 
 */
matchesIgnorer(text) {
  for (let index = 0; index < this.ignoredPatterns.length; index++) {
    const pattern = this.ignoredPatterns[index];
    if (text.includes(pattern)) {
      return true;
    }
  }
  return false;
}