/**
 * @name DevBinaryV6.Utils.prototype.touchFile
 * @type 
 * @description 
 */
async touchFile(file, options = {propagateUp: true}) {
  this.assert(typeof file === "string", `Parameter «--file» must be string and not «${typeof file}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const fs = require("fs");
  const path = require("path");
  const filepath = this.devbin.compiler.fullpathOf(file);
  this.assert(this.devbin.compiler.rootdirOf(filepath).startsWith("@/src"), `Parameter «--file» must start with «${this.devbin.compiler.rootdir}» but it is «${filepath}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const event = {options};
  event.isJsEntry = filepath.endsWith(".entry.js");
  event.isCssEntry = filepath.endsWith(".entry.css");
  event.isMdEntry = filepath.endsWith(".entry.md");
  const isEntry = event.isJsEntry || event.isCssEntry || event.isMdEntry;
  Processing_entry: {
    if (!isEntry) {
      console.log(`[*] Ignored because file is not entry: ${filepath}`) || -1;
    } else {
      Paso_1_compilar_distribuibles: {
        Object.assign(event, {
          distribution: await this.compileDistribuiblesOf(filepath, event),
        });
      }
      Paso_2_fabricar_test_unitario: {
        Object.assign(event, {
          testFabrication: await this.fabricateUnitTestFileOf(filepath, event),
        });
      }
      Paso_3_ejecutar_test_unitario: {
        Object.assign(event, {
          testExecution: await this.executeUnitTestFileOf(filepath, event),
        });
      }
    }
  }
  Propagating_touch_up: {
    Paso_4_propagar_evento_arriba: {
      Object.assign(event, {
        touchPropagation: options.propagateUp ? await this.propagateUpTouchEventFrom(filepath, event) : false,
      });
    }
  }
  return event;
}