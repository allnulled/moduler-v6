/**
 * @name DevBinaryV6.Utils.prototype.getSplittableClassesFrom
 * @type 
 * @description 
 */
async getSplittableClassesFrom(dir){
  const files = await this.devbin.files.readDirectory(dir);
  return files.filter(file => file.startsWith("splittable.") && file.endsWith(".class.js"));
}