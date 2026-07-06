/**
 * @name DevBinaryV6Utils.findFirstParentDirectoryContaining
 * @type 
 * @description 
 */
static async findFirstParentDirectoryContaining(dirBrute, file = "package.json", includingSelf = true) {
  const fs = require("fs").promises;
  const path = require("path");
  const dir = path.resolve(dirBrute);
  let dir2 = includingSelf ? dir : path.dirname(dir);
  let prevDir2 = undefined;
  let selectedDir = false;
  Search_directory_up:
  while(dir2 !== prevDir2) {
    const filepath = path.resolve(dir2, file);
    try {
      await fs.readFile(filepath, "utf8");
      selectedDir = dir2;
      break Search_directory_up;
    } catch (error) {
      // @OK
    }
    prevDir2 = dir2;
    dir2 = path.dirname(dir2);
  }
  if(selectedDir) {
    return selectedDir;
  }
  throw new Error(`No directory up found with file «${file}» from directory «${dir}» on «DevBinaryV6Utils.findFirstParentDirectoryContaining»`);
}