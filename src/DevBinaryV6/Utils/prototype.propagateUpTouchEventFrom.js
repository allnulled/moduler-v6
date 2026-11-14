/**
 * @name DevBinaryV6.Utils.prototype.propagateUpTouchEventFrom
 * @type 
 * @description 
 */
async propagateUpTouchEventFrom(filepath, event = {}) {
  const fs = require("fs");
  const path = require("path");
  let nextPropagationFiles = [];
  let currentDirectory = path.dirname(path.resolve(filepath));
  let currentDirectoryName = path.basename(currentDirectory);
  let upperDirectory = path.dirname(currentDirectory);
  let pivotDirectory = undefined;
  let firstFile = undefined;
  Propagate_to_directory_main_entry: {
    const possibleMainEntry = `${currentDirectory}/${currentDirectoryName}.entry.js`;
    // Esta línea es para que no se duplique el trigger al unit test cuando guardas el entry:
    if(possibleMainEntry === filepath) break Propagate_to_directory_main_entry;
    if(await this.existsFile(possibleMainEntry)) {
      await this.touchFile(possibleMainEntry, {
        propagateUp: false,
        processedEntries: event.processedEntries || {},
      });
    }
  }
  Propagate_to_upper_directory: {
    pivotDirectory = upperDirectory;
    Iterating_entries:
    while (true) {
      const entries = await fs.promises.readdir(pivotDirectory, {
        withFileTypes: true
      });
      const matchedEntries = entries.filter(e => {
        return e.isFile() && (e.name.endsWith(".entry.js") || e.name.endsWith(".entry.css") || e.name.endsWith(".entry.md"));
      }).map(e => path.resolve(e.path, e.name));
      On_propagate_up_until_entries_found: {
        // Este evento se llamara en cada touch arbol para arriba hasta encontrar un entry nuevo donde se concatenara para arriba otra vez
        await this.triggerCallbackFromFile(path.resolve(pivotDirectory, "e.onPropagateUp.js"), {
          file: filepath,
          event: event,
          devbin: this.devbin,
        });
      }
      // Si tiene entries: recoge los ficheros y sal del iterador
      if (matchedEntries.length) {
        nextPropagationFiles = matchedEntries;
        break Iterating_entries;
      }
      const parentDir = path.dirname(pivotDirectory);
      // Si hemos llegado a la raíz: sal de la propagación hacia arriba
      if ((this.devbin.moduler.rootdir === pivotDirectory) || (parentDir === pivotDirectory)) {
        return null; // Hemos llegado a la raíz.
      }
      pivotDirectory = parentDir;
    }
    firstFile = nextPropagationFiles[0];
    await Promise.all(nextPropagationFiles.map(file => {
      return this.touchFile(file, {
        propagateUp: false,
        processedEntries: event.processedEntries || {},
      });
    }));
  }
  return this.propagateUpTouchEventFrom(firstFile, event);
}