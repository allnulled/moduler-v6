/**
 * @name CompilerV6.prototype._readUrl
 * @type 
 * @description 
 */
_readUrl(url) {
  return fetch(this.normalizationOf(url), {
    method: "GET",
  }).then(response => {
    if (!response.ok) {
      throw Object.assign(new Error(`[!] Could not read URL because of HTTP ${response.status} Error: ${response.statusText}`), { name: "FetchError"});
    }
    return response.text();
  });
}