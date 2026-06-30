/**
 * @name CompilerV6.prototype.readUrl
 * @type 
 * @description 
 */
readUrl(url) {
  return fetch(this.normalizationOf(url), {
    method: "GET",
  }).then(response => response.text());
}