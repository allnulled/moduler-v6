/**
 * @name ModulerV6.Settings.prototype.load
 * @type 
 * @description 
 */
async load(forceReload = false) {
  if((!forceReload) && this.data) {
    return this.data;
  }
  const settingsPath = this.moduler.normalizationOf("@/dist/www/dev/settings.js");
  try {
    return this.data = await this.moduler.import(settingsPath);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}