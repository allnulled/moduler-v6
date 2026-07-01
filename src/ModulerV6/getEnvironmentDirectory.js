/**
 * @name ModulerV6.getEnvironmentDirectory
 * @type 
 * @description 
 */
static getEnvironmentDirectory() {
  if(this.isBrowser) {
    return window.location.origin;
  } else {
    return process.cwd();
  }
}