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
    const settings = await this.moduler.import("@/dist/www/dev/settings.dist.js");
    return this.data = typeof settings === "function" ? await settings.call(this) : settings;
  } catch (error) {
    console.log("[!] Could not load settings because:", error);
  }
}