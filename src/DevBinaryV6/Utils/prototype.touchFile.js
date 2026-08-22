/**
 * @name DevBinaryV6.Utils.prototype.touchFile
 * @type 
 * @description 
 */
async touchFile(file, optionsInput = {}) {
  this.assert(typeof file === "string", `Parameter «--file» must be string and not «${typeof file}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const currentStep = [];
  try {
    let outputFile = false;
    currentStep.push("0. begin with: " + file);
    let fs, path, filepath, rootPath;
    Initialize_dependencies: {
      currentStep.push("1. initialize dependencies");
      fs = require("fs");
      path = require("path");
      filepath = this.devbin.compiler.fullpathOf(file);
      rootPath = this.devbin.moduler.rootdirOf(filepath);
    }
    // this.assert(this.devbin.compiler.rootdirOf(filepath).startsWith("@/src"), `Parameter «--file» must start with «${this.devbin.compiler.rootdir}» but it is «${rootPath}» on «DevBinaryV6.Utils.prototype.touchFile»`);
    let event;
    let isEntry;
    Initialize_event: {
      currentStep.push("1. initialize event for: " + rootPath);
      event = this.constructor.defaultTouchFileOptions({
        type: "TouchFileEvent",
        propagateUp: true,
        ignoreOnTouchEvent: false,
        processedEntries: {},
        isRoot: false,
        ...optionsInput,
      });
      this.assert(optionsInput.uncacheInjections === event.uncacheInjections, "Las inyections 2");
      event.isHtml = filepath.endsWith(".html");
      event.isJsEntry = filepath.endsWith(".entry.js");
      event.isCssEntry = filepath.endsWith(".entry.css");
      event.isMdEntry = filepath.endsWith(".entry.md");
      event.isJsTest = filepath.endsWith(".test.js");
      event.isSrcWww = rootPath.startsWith("@/src/www/");
      event.isSrc = rootPath.startsWith("@/src/");
      isEntry = event.isJsEntry || event.isCssEntry || event.isMdEntry;
    }
    // console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(event.uncacheInjections));

    Touch_event: {
      currentStep.push("3. run touch event");
      Processing_entry: {
        Paso_previo_1_caso_dev_settings_exportar_a_www_dev_settings_las_partes_exportables: {
          if (filepath === this.devbin.compiler.fullpathOf("@/dev/settings.js")) {
            currentStep.push("3.1. exporting dev/settings");
            await this.exportDevSettings(filepath);
            break Touch_event;
          }
        }
        Paso_previo_2_caso_src_html: {
          if (event.isHtml) {
            currentStep.push("3.2. found html file");
            if (event.isSrcWww) {
              currentStep.push("3.2.a. html is src/www/**/*.html");
              outputFile = `@/dist/www/${rootPath.replace("@/src/www/", "")}`;
            } else if (event.isSrc) {
              currentStep.push("3.2.b. html is src/**/*.html");
              outputFile = `@/dist/src/${rootPath.replace("@/src/", "")}`;
            } else {
              currentStep.push("3.2.c. html is not src/**/*.html");
              console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[-] DevBinaryV6 dismissed touch event from an *.html not under «@/src/»: ${rootPath}`));
              break Touch_event;
            }
            currentStep.push("3.2.{a,b}. compiling html file");
            const outputCompilation = await this.devbin.compiler.compile(filepath);
            const outputHtml = outputCompilation.html;
            const outputFullpath = this.devbin.moduler.normalizationOf(outputFile);
            await require("fs").promises.writeFile(outputFullpath, outputHtml, "utf8");
          }
        }
        Caso_js_o_test_js: {
          Paso_0_descartar_si_no_es_entry_o_test: {
            if ((!isEntry) && (!event.isJsTest)) {
              currentStep.push("3.3.a. is not entry nor test");
              console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[-] DevBinaryV6 dismissed touch event from not entry or test: ${rootPath}`));
              break Processing_entry;
            } else {
              currentStep.push("3.3.b. is entry or test");
              console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[*] DevBinaryV6 triggered touch event from: ${rootPath}`));
            }
          }
          Paso_1_compilar_distribuibles: {
            currentStep.push("3.4. compile distribuibles of entry ");
            Object.assign(event, {
              distribution: await this.compileDistribuiblesOf(filepath, event),
            });
          }
          Paso_2_fabricar_test_unitario: {
            currentStep.push("3.5. make unit test");
            Object.assign(event, {
              testFabrication: await this.fabricateUnitTestFileOf(filepath, event),
            });
          }
          Paso_3_ejecutar_test_unitario: {
            currentStep.push("3.6. run unit test");
            Object.assign(event, {
              testExecution: await this.executeUnitTestFileOf(filepath, event),
            });
          }
          Triggering_onDistribute_file: {
            currentStep.push("3.7. trigger e.onDistribute.js");
            const onDistributeFile = path.join(path.dirname(filepath), "e.onDistribute.js");
            await this.triggerCallbackFromFile(onDistributeFile, { file: filepath, event, });
          }
          Triggering_onTest_file: {
            currentStep.push("3.8. trigger e.onTest.js");
            const onTestFile = path.join(path.dirname(filepath), "e.onTest.js");
            const testsAdded = await this.triggerCallbackFromFile(onTestFile, { file: filepath, event, });
            if (typeof testsAdded !== "number") {
              this.assert(typeof testsAdded === "object", `File «e.onTest.js» must return object about file «${onTestFile}» on «DevBinaryV6.Utils.prototype.touchFile»`);
              Object.keys(testsAdded).forEach(prop => {
                this.assert(["feature", "integrity", "speed"].includes(prop), `File «e.onTest.js» on «${onTestFile}» cannot return object with unknown property «${prop}» on «DevBinaryV6.Utils.prototype.touchFile»`);
              });
              if ("feature" in testsAdded) event.testFeatures.push(...testsAdded.feature);
              if ("integrity" in testsAdded) event.testIntegrity.push(...testsAdded.integrity);
              if ("speed" in testsAdded) event.testSpeed.push(...testsAdded.speed);
            }
          }
        }
      }
      Processing_test: {
        if (event.isJsTest) {
          currentStep.push("4. run file because it is a test");
          await this.executeUnitTestFileOf(filepath, { testFabrication: { unitFile: filepath } });
          break Touch_event;
        }
      }
      Triggering_onTouch_file: {
        if (event.ignoreOnTouchEvent) break Triggering_onTouch_file;
        currentStep.push("5. run e.onTouch.js");
        const onTouchFile = path.join(path.dirname(filepath), "e.onTouch.js");
        await this.triggerCallbackFromFile(onTouchFile, { file: filepath, event });
      }
      Triggering_onDistributeDirectory_file: {
        const onDistributeDirectoryFile = path.join(path.dirname(filepath), "e.onDistributeDirectory.js");
        currentStep.push("6. run e.onDistributeDirectory.js");
        const result = await this.triggerCallbackFromFile(onDistributeDirectoryFile, { file: filepath, event });
        if (!outputFile) break Triggering_onDistributeDirectory_file;
        if (result === true) {
          currentStep.push("6.1. distributing directory");
          const origin = path.dirname(this.devbin.compiler.normalizationOf(rootPath));
          // @ATENCIÓN: al basarse en outputFile ya se entiende si está en src o en src/www
          const destination = path.dirname(this.devbin.compiler.normalizationOf(outputFile));
          require("fs").promises.cp(origin, destination, { recursive: true });
        }
      }
      Propagating_touch_up: {
        Paso_4_propagar_evento_arriba: {
          currentStep.push("6.2. propagate touch up");
          const touchPropagation = event.propagateUp ? await this.propagateUpTouchEventFrom(filepath, event) : false;
          Object.assign(event, {
            touchPropagation: touchPropagation,
          });
        }
      }
      On_root: {
        if (!event.isRoot) break On_root;
        currentStep.push("7. it is root");
        Run_integrity_tests: {
          currentStep.push("7.1. run integrity tests");
          await this.devbin.tester.runDirectory("@/test/integrity", {
            title: "integrity",
            filename: "integrity.js",
            filter: file => this.matchesFileWithSimpleSelector(path.basename(file), [
              ...(event.testIntegrity), // Los integrity de los eventos acumulados:
              ...(this.devbin.settings.data?.test?.integrity || []), // Los integrity del dev/settings.js#test/integrity:
            ]),
          });
        }
        Run_speed_tests: {
          currentStep.push("7.2. run speed tests");
          await this.devbin.tester.runDirectory("@/test/speed", {
            title: "speed",
            filename: "speed.js",
            filter: file => this.matchesFileWithSimpleSelector(path.basename(file), [
              ...(event.testSpeed), // Los speeds de los eventos acumulados:
              ...(this.devbin.settings.data?.test?.speed || []), // Los speeds del dev/settings.js#test/speeds:
            ]),
          });
        }
        Run_feature_tests: {
          currentStep.push("7.3. run feature tests");
          await this.devbin.tester.runDirectory("@/test/feature", {
            title: "feature",
            filename: "feature.js",
            filter: file => this.matchesFileWithSimpleSelector(path.basename(file), [
              ...(event.testFeatures), // Los features de los eventos acumulados:
              ...(this.devbin.settings.data?.test?.features || []), // Los features del dev/settings.js#test/features:
            ]),
          });
        }
        Run_case_tests: {
          currentStep.push("7.3. run case tests");
          await this.devbin.tester.runDirectory("@/test/case", {
            title: "case",
            filename: "case.js",
            filter: file => true,
          });
        }
        Run_devbin_test_command: {
          if (!await this.devbin.compiler.files.hasFile("@/dev/bin/test/command.js")) break Run_devbin_test_command;
          currentStep.push(`7.4. run «devbin test --origin ${filepath}»`);
          const output = await this.devbin.command(["test", "--origin", filepath]);
          if (output) console.log(output);
        }
      }
    }
    return event;
  } catch (error) {
    console.log(`[!] Error on method «touchFile» on step «${currentStep.reverse().join(" < ")}»`, error);
    throw error;
  }
}