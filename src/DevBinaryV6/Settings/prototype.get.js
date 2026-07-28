/**
 * @name DevBinaryV6.Settings.prototype.get
 * @type 
 * @description 
 */
async get(property = null, forceReload = false) {
  await this.load(forceReload);
  if(!property) return this.data;
  return this.data[property];
}