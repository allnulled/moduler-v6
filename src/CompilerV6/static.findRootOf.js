/**
 * @name CompilerV6.findRootOf
 * @type 
 * @description 
 */
static async findRootOf(file, whenContains = "package.json") {
  const fs = require("fs");
  const path = require("path");
  let dir0 = null;
  let dir1 = file;
  while (dir0 !== dir1) {
    try {
      const filepath = path.resolve(dir1, whenContains);
      await fs.promises.readFile(filepath);
      return dir1;
    } catch (error) {
      dir0 = dir1;
      dir1 = path.dirname(dir1);
    }
  }
  return null;
}