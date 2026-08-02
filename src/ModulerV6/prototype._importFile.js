/**
 * @name ModulerV6.prototype._importFile
 * @type 
 * @description 
 */
_importFile(filepathBrute) {
  let originalHolder = {};
  let filepath, filepathMask;
  Normalize_file: {
    filepath = filepathMask = this.normalizationOf(filepathBrute);
  }
  console.log("[*] Importing file: " + filepath);
  Use_instrumentalized_if_conditions_are_met: {
    if (!(this.runtime.isDev || this.runtime.isTest)) {
      console.log("[*] Dismissed instrumentalization for reason 1: the environment is not «dev» or «test»");
      console.log(this.runtime);
      break Use_instrumentalized_if_conditions_are_met;
    }
    if (!this.settings.data?.instrumentalize?.length) {
      console.log("[*] Dismissed instrumentalization for reason 2: settings were not provided because file «@/dist/www/dev/settings.dist.js» is missing or «ModulerV6.prototype.settings.loadSilently» was not awaited before the first «ModulerV6.prototype.{import,export}» call");
      break Use_instrumentalized_if_conditions_are_met;
    }
    if (!this.settings.data.instrumentalize.map(file => this.normalizationOf(file)).includes(filepath)) {
      console.log("[*] Dismissed instrumentalization for reason 3: the file is not added to ModulerV6.prototype.settings.data.instrumentalize");
      break Use_instrumentalized_if_conditions_are_met;
    }
    filepath = filepath.replace(/\.js$/g, ".instr.js");
    console.log(`[*] Using instrumentalized version of: ${filepathMask}`);
  }
  Evaluate_file_and_export_results: {
    if (filepathBrute.endsWith(".json")) {
      return this.modules[filepathMask] = this._readPath(filepathBrute).then(content => {
        return JSON.parse(content);
      });
    } else {
      const moduleHolder = {
        get exports() {
          return originalHolder;
        },
        set exports(output) {
          originalHolder = output;
        }
      };
      return this.evaluateFile(filepath, {
        module: moduleHolder,
        exports: moduleHolder.exports,
        $moduler: this.cloneForFile(filepath),
      }).then(result => {
        let output = undefined;
        if (typeof result === "undefined") {
          output = moduleHolder.exports;
        } else {
          output = moduleHolder.exports = result;
        }
        return this.modules[filepathMask] = output;
      });
    }
  }
}