/**
 * @name DevBinaryV6.Settings.prototype.load
 * @type 
 * @description 
 */
async load(forceReload = false) {
  if((!forceReload) && this.data) {
    return this.data;
  }
  const settingsPath = this.devbin.compiler.fullpathOf("@/dev/settings.js");
  const exists = await this.devbin.utils.existsFile(settingsPath);
  if(!exists) {
    return this.data;
  }
  const settingsModule = require(settingsPath);
  const settings = await settingsModule.call(this.devbin);
  return this.data = Object.assign({}, settings);
}