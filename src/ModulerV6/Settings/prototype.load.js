/**
 * @name ModulerV6.Settings.prototype.load
 * @type 
 * @description 
 */
async load(forceReload = false) {
  if((!forceReload) && this.data) {
    return this.data;
  }
  try {
    return this.data = await this.moduler.import("@/dist/www/dev/settings.dist.js");
  } catch (error) {
    console.log("[!] Could not load settings because:", error);
  }
}