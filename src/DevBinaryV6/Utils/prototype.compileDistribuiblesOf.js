/**
 * @name DevBinaryV6.Utils.prototype.compileDistribuiblesOf
 * @type 
 * @description 
 */
async compileDistribuiblesOf(filepath, event) {
  let compilation, srcDistJs, srcDistMd, distJs, distCss, distMd, report;
  const currentStep = [];
  try {
    currentStep.push("1. begin");
    Initialize_report: {
      report = {};
    }
    Get_compilation: {
      currentStep.push("2. compile");
      compilation = await this.devbin.compiler.compile(filepath, {
        processedEntries: event.processedEntries,
        uncacheInjections: event.uncacheInjections,
        dontCreateOnInjectSource: false,
      });
    }
    Get_dist_filepaths: {
      currentStep.push("3. compose output paths");
      const outputNames = this.getDistribuibleFilenamesOf(compilation.file, event);
      const inputDir = require("path").dirname(outputNames.file);
      const inputRootdir = this.devbin.compiler.rootdirOf(inputDir);
      let outputDir = undefined;
      Export_directly_to_dist_www_if_isSrcWww: {
        if (event.isSrcWww) {
          outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\/src\/www/g, "@/dist/www"));
        } else {
          outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\//g, "@/dist/"));
        }
      }
      distJs = require("path").resolve(outputDir, outputNames.js);
      distCss = require("path").resolve(outputDir, outputNames.css);
      distMd = require("path").resolve(outputDir, outputNames.md);
      srcDistJs = require("path").resolve(inputDir, outputNames.js);
      srcDistMd = require("path").resolve(inputDir, outputNames.md);
      report.names = outputNames;
    }
    Make_assertions_for_safety: {
      currentStep.push("4. safety assertions 1");
      this.assert(distJs.endsWith(".dist.js"), `File should end with «.dist.js» but it is not the case on «${distJs}»`);
      this.assert(distCss.endsWith(".dist.css"), `File should end with «.dist.css» but it is not the case on «${distCss}»`);
      this.assert(distMd.endsWith(".md"), `File should end with «.md» but it is not the case on «${distMd}»`);
      this.assert(distJs.includes("/dist/"), `File should include «/dist/» but it is not the case on «${distJs}»`);
    }
    Overwrite_dist_files: {
      currentStep.push("5. ensure output directory");
      await this.ensureDirectoryOf(distJs);
      if (compilation.js) {
        currentStep.push("6. minify");
        let output = undefined;
        Minify_js_output: {
          output = await this.devbin.compiler.constructor.softMinifyJs(compilation.js, {
            compress: false,
            mangle: false,
            toplevel: true,
            format: {
              comments: false, // Esta es la única cambiada
              beautify: true
            }
          });
        }
        Persist_js_file: {
          currentStep.push("7. write js file");
          await require("fs").promises.writeFile(distJs, output.code, "utf8");
          console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[*] DevBinaryV6 generated distribution file at: ${this.devbin.compiler.rootdirOf(distJs)}`));
          report.js = distJs;
        }
        Save_in_touch_event_cache: {
          // Antes estaba esto:
          // event.processedEntries[compilation.file] = compilation;
          event.processedEntries[compilation.file] = { distJs };
        }
        Generate_instrumentalized_if_settings_instrumentalize_includes_it: {
          currentStep.push("7. load settings");
          await this.devbin.settings.load();
          const instrumentalizeFiles = this.devbin.settings?.data?.instrumentalize || [];
          const isMatch = instrumentalizeFiles.map(file => this.devbin.moduler.normalizationOf(file)).includes(distJs);
          if (isMatch) {
            currentStep.push("8. generate instrumentalization");
            Create_instrumentalization: {
              const instrJs = distJs.replace(/\.dist\.js$/g, ".dist.instr.js");
              const instrSource = this.instrumentCode(output.code, distJs);
              await require("fs").promises.writeFile(instrJs, instrSource, "utf8");
              console.log(this.devbin.compiler.constructor.ansi.colors.style("blackBright").text(`[*] DevBinaryV6 generated instrumentation file at: ${this.devbin.compiler.rootdirOf(instrJs)}`));
            }
          }
        }
      }
      if (compilation.css) {
        currentStep.push("9. write css file");
        await require("fs").promises.writeFile(distCss, compilation.css, "utf8");
        if (!event.processedEntries[compilation.file]) event.processedEntries[compilation.file] = {};
        event.processedEntries[compilation.file].distCss = distCss;
        report.css = distCss;
      }
      if (compilation.md) {
        currentStep.push("10. write md file");
        await require("fs").promises.writeFile(distMd, compilation.md, "utf8");
        if (!event.processedEntries[compilation.file]) event.processedEntries[compilation.file] = {};
        event.processedEntries[compilation.file].distMd = distMd;
        report.md = distMd;
      }
    }
    Feedback_report: {
      currentStep.push("last. return report");
      return report;
    }
  } catch (error) {
    console.log(`[!] Error on method «compileDistribuiblesOf» on step «${currentStep.reverse().join(" < ")}»`, error);
    throw error;
  }
}