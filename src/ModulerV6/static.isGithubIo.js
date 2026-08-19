/**
 * @name ModulerV6.static.isGithubIo
 * @type 
 * @description 
 */
static isGithubIo() {
  if(!this.isBrowser) return false;
  if(!(/\.github\.io$/i).test(window.location.hostname)) return false;
  return window.location.pathname.split("/").filter(Boolean)[0];
}