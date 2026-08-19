/**
 * @name ModulerV6.static.bindToRefrescador
 * @type 
 * @description 
 */
static bindToRefrescador() {
  if(!this.isBrowser) return -2;
  if(this.isGithubIo()) return -3;
  return Promise.all([
    this.includeScript.try("/socket-io.client.js"),
    this.includeScript.try("/client.js"),
  ]);
}