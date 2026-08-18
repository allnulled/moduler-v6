/**
 * @name ModulerV6.prototype._importFile
 * @type 
 * @description 
 */
_importFile(filepathInput) {
  let filepath, filepathMask, isInstr, isJson;
  const [filepathBrute, activeOptions] = this._removeSymbolsFromFilepath(filepathInput, true);
  isJson = filepathBrute.endsWith(".json");
  Normalize_file: {
    filepath = filepathMask = this.normalizationOf(filepathBrute);
  }
  Use_instrumentalized_if_conditions_are_met: {
    if (isJson) {
      // console.log("[*] Dismissed instrumentalization for reason 4: the file is a json not a js");
      break Use_instrumentalized_if_conditions_are_met;
    }
    if (!(this.runtime.isDev || this.runtime.isTest)) {
      // console.log("[*] Dismissed instrumentalization for reason 1: the environment is not «dev» or «test»");
      break Use_instrumentalized_if_conditions_are_met;
    }
    if (!this.settings.data?.instrumentalize?.length) {
      // console.log("[*] Dismissed instrumentalization for reason 2: settings were not provided because file «@/dist/www/dev/settings.dist.js» is missing or «ModulerV6.prototype.settings.loadSilently» was not awaited before the first «ModulerV6.prototype.{import,export}» call");
      break Use_instrumentalized_if_conditions_are_met;
    }
    if (!this.settings.data.instrumentalize.map(file => this.normalizationOf(file)).includes(filepath)) {
      // console.log("[*] Dismissed instrumentalization for reason 3: the file is not added to ModulerV6.prototype.settings.data.instrumentalize");
      break Use_instrumentalized_if_conditions_are_met;
    }
    isInstr = true;
    filepath = filepath.replace(/\.js$/g, ".instr.js");
  }
  console.log("[*] ModulerV6 imports: " + this.rootdirOf(filepath));
  Evaluate_file_and_export_results: {
    if (isJson) {
      return this.modules[filepathMask] = this._readPath(filepathBrute)
        .catch(error => {
          if(activeOptions.justTry) return undefined;
          throw error;
        })
        .then(content => {
          if(typeof content === "undefined") return undefined;
          return JSON.parse(content);
        });
    }
    let firstHolder = {};
    let originalHolder = firstHolder;
    const moduleHolder = {
      get exports() {
        return originalHolder;
      },
      set exports(value) {
        originalHolder = value;
      }
    };
    return this.evaluateFile(filepath, {
      module: moduleHolder,
      exports: moduleHolder.exports,
      $moduler: this.cloneForFile(filepath),
    }, {
      onMissingResource: activeOptions.justTry === true ? () => undefined : false,
    }).then(result => {
      let output = undefined;
      // @ATENCIÓN: sí, parece que esta lógica es necesaria
      const returnsUndefined = () => typeof result === "undefined";
      const isSameEmptyObject = () => (moduleHolder.exports === firstHolder) && ((Object.keys(firstHolder).length === 0));
      if(!returnsUndefined()) {
        output = moduleHolder.exports = result;
      } else if(!isSameEmptyObject()) {
        output = moduleHolder.exports;
      }
      return this.modules[filepathMask] = output;
    });
  }
}