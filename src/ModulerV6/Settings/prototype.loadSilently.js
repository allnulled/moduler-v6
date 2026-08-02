/**
 * @name ModulerV6.Settings.prototype.loadSilently
 * @type 
 * @description 
 */
async loadSilently(...args) {
  try {
    return await this.load(...args);
  } catch (error) {
    return error;
  }
}