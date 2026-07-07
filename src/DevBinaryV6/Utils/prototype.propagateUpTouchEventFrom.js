/**
 * @name DevBinaryV6.Utils.prototype.propagateUpTouchEventFrom
 * @type 
 * @description 
 */
async propagateUpTouchEventFrom(filepath) {
  const fs = require("fs");
  const path = require("path");
  let nextPropagationFiles = [];
  let dir = path.dirname(path.dirname(path.resolve(filepath)));
  Iterating_entries:
  while (true) {
    const entries = await fs.promises.readdir(dir, {
      withFileTypes: true
    });
    const matchedEntries = entries.filter(e => {
      return e.isFile() && (e.name.endsWith(".entry.js") || e.name.endsWith(".entry.css") || e.name.endsWith(".entry.md"));
    }).map(e => path.resolve(e.path, e.name));
    if (matchedEntries.length) {
      nextPropagationFiles = matchedEntries;
      break Iterating_entries;
    }
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      return null; // Hemos llegado a la raíz.
    }
    dir = parentDir;
  }
  const file0 = nextPropagationFiles[0];
  await Promise.all(nextPropagationFiles.map(file => {
    return this.touchFile(file, { propagateUp: false });
  }));
  return this.propagateUpTouchEventFrom(file0);
}