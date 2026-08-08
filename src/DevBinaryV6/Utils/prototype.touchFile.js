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
  const rootedpath = this.devbin.compiler.rootdirOf(file);
  // this.assert(this.devbin.compiler.rootdirOf(filepath).startsWith("@/src"), `Parameter «--file» must start with «${this.devbin.compiler.rootdir}» but it is «${rootedpath}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const event = this.constructor.defaultTouchFileOptions({
    type: "TouchFileEvent",
    propagateUp: true,
    processedEntries: {},
    isRoot: false,
    ...optionsInput,
  });
  this.assert(optionsInput.uncacheInjections === event.uncacheInjections, "Las inyections 2");
  // console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(event.uncacheInjections));
  event.isHtml = filepath.endsWith(".html");
  event.isJsEntry = filepath.endsWith(".entry.js");
  event.isCssEntry = filepath.endsWith(".entry.css");
  event.isMdEntry = filepath.endsWith(".entry.md");
  event.isJsTest = filepath.endsWith(".test.js");
  const rootPath = this.devbin.moduler.rootdirOf(filepath);
  event.isSrcWww = rootPath.startsWith("@/src/www/");
  event.isSrc = rootPath.startsWith("@/src/");
  const isEntry = event.isJsEntry || event.isCssEntry || event.isMdEntry;
  Touch_event: {
    Processing_entry: {
      Paso_previo_1_caso_dev_settings_exportar_a_www_dev_settings_las_partes_exportables: {
        if (filepath === this.devbin.compiler.fullpathOf("@/dev/settings.js")) {
          await this.exportDevSettings(filepath);
          break Touch_event;
        }
      }
      Paso_previo_2_caso_src_html: {
        if (event.isHtml) {
          if (event.isSrcWww) {
            const outputFile = `@/dist/www/${rootPath.replace("@/src/www/", "")}`;
            await this.copyFile(rootPath, outputFile);
          } else if (event.isSrc) {
            const outputFile = `@/dist/src/${rootPath.replace("@/src/", "")}`;
            await this.copyFile(rootPath, outputFile);
          } else {
            console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[-] DevBinaryV6 dismissed touch event from an *.html not under «@/src/»: ${rootedpath}`));
            break Touch_event;
          }
        }
      }
      Caso_js_o_test_js: {
        Paso_0_descartar_si_no_es_entry_o_test: {
          if ((!isEntry) && (!event.isJsTest)) {
            console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[-] DevBinaryV6 dismissed touch event from not entry or test: ${rootedpath}`));
            break Processing_entry;
          } else {
            console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[*] DevBinaryV6 triggered touch event from: ${rootedpath}`));
          }
        }
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
        Triggering_onTestFeature_file: {
          const onTestFeatureFile = path.join(path.dirname(filepath), "e.onTestFeature.js");
          const featuresAdded = await this.triggerCallbackFromFile(onTestFeatureFile, { file: filepath, event, });
          if(typeof featuresAdded !== "number") {
            this.assert(Array.isArray(featuresAdded), `File «e.onTestFeature.js» must return array about file «${onTestFeatureFile}» on «DevBinaryV6.Utils.prototype.touchFile»`);
            event.testFeatures.push(...featuresAdded);
          }
        }
      }
    }
    Processing_test: {
      if (event.isJsTest) {
        await this.executeUnitTestFileOf(filepath, { testFabrication: { unitFile: filepath } });
        break Touch_event;
      }
    }
    Triggering_onTouch_file: {
      const onTouchFile = path.join(path.dirname(filepath), "e.onTouch.js");
      await this.triggerCallbackFromFile(onTouchFile, { file: filepath, event });
    }
    Propagating_touch_up: {
      Paso_4_propagar_evento_arriba: {
        const touchPropagation = event.propagateUp ? await this.propagateUpTouchEventFrom(filepath, event) : false;
        Object.assign(event, {
          touchPropagation: touchPropagation,
        });
      }
    }
    On_root_execute_tests: {
      if (event.isRoot) {
        Run_feature_tests: {
          await this.devbin.tester.runDirectory("@/test/feature", file => this.matchesFileWithSimpleSelector(path.basename(file), [
            // Los features de los eventos acumulados:
            ...(event.testFeatures),
            // Los features del dev/settings.js#features:
            ...(this.devbin.settings.data?.features || [])
          ]));
        }
        Run_case_tests: {
          await this.devbin.tester.runDirectory("@/test/case", file => file.endsWith(".js"));
        }
      }
    }
  }
  return event;
}