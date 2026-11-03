/**
 * @name DevBinaryV6.Utils.prototype.compileDistribuiblesOf
 * @type 
 * @description 
 */
async compileDistribuiblesOf(filepath, event) {
  let compilation, srcDistJs, srcDistMd, distJs, distCss, distMd, distHtml, report;
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
      distJs = outputNames.js ? require("path").resolve(outputDir, outputNames.js) : null;
      distCss = outputNames.css ? require("path").resolve(outputDir, outputNames.css) : null;
      distMd = outputNames.md ? require("path").resolve(outputDir, outputNames.md) : null;
      distHtml = outputNames.html ? require("path").resolve(outputDir, outputNames.html) : null;
      srcDistJs = outputNames.js ? require("path").resolve(inputDir, outputNames.js) : null;
      srcDistMd = outputNames.md ? require("path").resolve(inputDir, outputNames.md) : null;
      report.names = outputNames;
    }
    Make_assertions_for_safety: {
      currentStep.push("4. safety assertions 1");
      if (distJs) this.assert(distJs.endsWith(".dist.js"), `File should end with «.dist.js» but it is not the case on «${distJs}»`);
      if (distCss) this.assert(distCss.endsWith(".dist.css"), `File should end with «.dist.css» but it is not the case on «${distCss}»`);
      if (distMd) this.assert(distMd.endsWith(".md"), `File should end with «.md» but it is not the case on «${distMd}»`);
      // this.assert(distJs.includes("/dist/"), `File should include «/dist/» but it is not the case on «${distJs}»`);
    }
    Overwrite_dist_files: {
      Output_container_directory: {
        if(!distJs) break Output_container_directory;
        currentStep.push("5. ensure output directory");
        await this.ensureDirectoryOf(distJs);
      }
      Output_js: {
        if (!compilation.js) break Output_js;
        currentStep.push("6. beautify");
        let output = undefined;
        Minify_js_output: {
          output = { code: compilation.js };
          break Minify_js_output;
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
          this.devbin.compiler.constructor.ansi.colors.style("blackBright").print(`[*] DevBinaryV6 generated js distribution file at: ${this.devbin.compiler.rootdirOf(distJs)}`);
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
              this.devbin.compiler.constructor.ansi.colors.style("blackBright").print(`[*] DevBinaryV6 generated js instrumentation file at: ${this.devbin.compiler.rootdirOf(instrJs)}`);
            }
          }
        }
      }
      Output_css: {
        if (!compilation.css) break Output_css;
        currentStep.push("9. write css file");
        await require("fs").promises.writeFile(distCss, compilation.css, "utf8");
        this.devbin.compiler.constructor.ansi.colors.style("blackBright").print(`[*] DevBinaryV6 generated css distribution file at: ${this.devbin.compiler.rootdirOf(distCss)}`);
        if (!event.processedEntries[compilation.file]) event.processedEntries[compilation.file] = {};
        event.processedEntries[compilation.file].distCss = distCss;
        report.css = distCss;
      }
      Output_md: {
        if (!compilation.md) break Output_md;
        currentStep.push("10. write md file");
        await require("fs").promises.writeFile(distMd, compilation.md, "utf8");
        this.devbin.compiler.constructor.ansi.colors.style("blackBright").print(`[*] DevBinaryV6 generated md distribution file at: ${this.devbin.compiler.rootdirOf(distMd)}`);
        if (!event.processedEntries[compilation.file]) event.processedEntries[compilation.file] = {};
        event.processedEntries[compilation.file].distMd = distMd;
        report.md = distMd;
      }
      Output_html: {
        if (!compilation.html) break Output_html;
        currentStep.push("11. write html file");
        await require("fs").promises.writeFile(distHtml, compilation.html, "utf8");
        this.devbin.compiler.constructor.ansi.colors.style("blackBright").print(`[*] DevBinaryV6 generated html distribution file at: ${this.devbin.compiler.rootdirOf(distHtml)}`);
        if (!event.processedEntries[compilation.file]) event.processedEntries[compilation.file] = {};
        event.processedEntries[compilation.file].distHtml = distHtml;
        report.html = distHtml;
      }
    }
    Feedback_report: {
      currentStep.push("last. return report");
      return report;
    }
  } catch (error) {
    console.log(`[!] Error on method «compileDistribuiblesOf» on step «${currentStep.reverse().join(" < ")}» of file «${filepath}»`, error);
    throw error;
  }
}