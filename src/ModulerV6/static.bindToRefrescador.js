/**
 * @name ModulerV6.static.bindToRefrescador
 * @type 
 * @description 
 */
static async bindToRefrescador() {
  if(!this.isBrowser) return -2;
  if(this.isGithubIo()) return -3;
  await this.includeScript.try("/socket.io-client.js");
  await this.includeScript.try("/client.js");
  return "bound successfully";
}