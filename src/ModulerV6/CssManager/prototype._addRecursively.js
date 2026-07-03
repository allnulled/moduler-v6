/**
 * @name ModulerV6.CssManager.prototype._addRecursively
 * @type 
 * @description 
 */
async _addRecursively(fileBrute, addEvent = { sheets: {} }) {
  let file, source, tokens;
  Normalize_filepath: {
    file = this.moduler.rootdirOf(fileBrute);
  }
  Return_cached_if_so: {
    if (file in this.sheets) {
      return this.sheets[file];
    }
    if(file in addEvent.sheets) {
      return addEvent.sheets[file];
    }
  }
  Start_cache: {
    addEvent.sheets[file] = { priority: undefined };
  }
  Load_source: {
    source = await this._fetchSheet(file);
    addEvent.sheets[file].source = source;
  }
  Extract_tokens: {
    tokens = await this._extractRequires(source, file);
    addEvent.sheets[file].tokens = tokens.formatted;
  }
  Load_requires: {
    const loadedRequires = [];
    for (let index = 0; index < tokens.formatted.length; index++) {
      const requiresToken = tokens.formatted[index];
      const requiresPathBrute = JSON.parse(requiresToken.inner);
      const requiresPath = this.moduler.rootdirOf(requiresPathBrute);
      loadedRequires.push(requiresPath);
      const submoduler = this.cloneForFile(requiresPath);
      if (!(requiresPath in this.sheets)) {
        await submoduler.css._addRecursively(requiresPath);
      }
    }
    addEvent.sheets[file].requires = loadedRequires;
  }
  Define_priority_now: {
    addEvent.sheets[file].priority = Object.keys(this.sheets).length;
  }
  return Object.assign(this.sheets, addEvent.sheets);
}