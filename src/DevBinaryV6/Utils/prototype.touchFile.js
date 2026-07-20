/**
 * @name DevBinaryV6.Utils.prototype.touchFile
 * @type 
 * @description 
 */
async touchFile(file, optionsInput = {}) {
  this.assert(typeof file === "string", `Parameter «--file» must be string and not «${typeof file}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const fs = require("fs");
  const path = require("path");
  const filepath = this.devbin.compiler.fullpathOf(file);
  // this.assert(this.devbin.compiler.rootdirOf(filepath).startsWith("@/src"), `Parameter «--file» must start with «${this.devbin.compiler.rootdir}» but it is «${filepath}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const event = this.constructor.defaultTouchFileOptions({
    propagateUp: true,
    processedEntries: {},
    ...optionsInput,
  });
  this.assert(optionsInput.uncacheInjections === event.uncacheInjections, "Las inyections 2");
  // console.log(event.uncacheInjections);
  event.isJsEntry = filepath.endsWith(".entry.js");
  event.isCssEntry = filepath.endsWith(".entry.css");
  event.isMdEntry = filepath.endsWith(".entry.md");
  event.isJsTest = filepath.endsWith(".test.js");
  const isEntry = event.isJsEntry || event.isCssEntry || event.isMdEntry;
  Processing_entry: {
    if (!isEntry) {
      if(!event.isJsTest) console.log(`[-] Touch event dismissed from: ${filepath}`);
      break Processing_entry;
    }
    console.log(`[*] Touch event triggered from: ${filepath}`);
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
    Triggering_onDistribute_file: {
      const onDistributeFile = path.join(path.dirname(filepath), "e.onDistribute.js");
      await this.triggerCallbackFromFile(onDistributeFile, { file: filepath, event, });
    }
  }
  Processing_test: {
    if(event.isJsTest) {
      console.log(`[-] Touch event processed as test from: ${filepath}`);
      await this.executeUnitTestFileOf(filepath, {testFabrication:{ unitFile: filepath }});
      return event;
    }
  }
  Triggering_onTouch_file: {
    const onTouchFile = path.join(path.dirname(filepath), "e.onTouch.js");
    await this.triggerCallbackFromFile(onTouchFile, { file: filepath, event });
  }
  Propagating_touch_up: {
    Paso_4_propagar_evento_arriba: {
      Object.assign(event, {
        touchPropagation: event.propagateUp ? await this.propagateUpTouchEventFrom(filepath, event) : false,
      });
    }
  }
  return event;
}