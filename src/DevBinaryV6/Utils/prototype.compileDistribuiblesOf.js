/**
 * @name DevBinaryV6.Utils.prototype.compileDistribuiblesOf
 * @type 
 * @description 
 */
async compileDistribuiblesOf(filepath, event) {
  let compilation, srcDistJs, srcDistCss, srcDistMd, distJs, distCss, distMd, report;
  Initialize_report: {
    report = {};
  }
  Get_compilation: {
    compilation = await this.devbin.compiler.compile(filepath, {
      processedEntries: event.processedEntries,
      uncacheInjections: event.uncacheInjections,
      dontCreateOnInjectSource: false,
    });
  }
  Get_dist_filepaths: {
    const outputNames = this.getDistribuibleFilenamesOf(compilation.file, event);
    const inputDir = require("path").dirname(outputNames.file);
    const inputRootdir = this.devbin.compiler.rootdirOf(inputDir);
    let outputDir = undefined;
    Export_directly_to_dist_www_if_isWww: {
      if (event.isWww) {
        outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\/src\/www/g, "@/dist/www"));
      } else {
        outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\//g, "@/dist/"));
      }
    }
    distJs = require("path").resolve(outputDir, outputNames.js);
    distCss = require("path").resolve(outputDir, outputNames.css);
    distMd = require("path").resolve(outputDir, outputNames.md);
    srcDistJs = require("path").resolve(inputDir, outputNames.js);
    srcDistCss = require("path").resolve(inputDir, outputNames.css);
    srcDistMd = require("path").resolve(inputDir, outputNames.md);
    report.names = outputNames;
  }
  Make_assertions_for_safety: {
    this.assert(distJs.endsWith(".dist.js"), `File should end with «.dist.js» but it is not the case on «${distJs}»`);
    this.assert(distCss.endsWith(".dist.css"), `File should end with «.dist.css» but it is not the case on «${distCss}»`);
    this.assert(distMd.endsWith(".md"), `File should end with «.md» but it is not the case on «${distMd}»`);
    this.assert(distJs.includes("/dist/"), `File should include «/dist/» but it is not the case on «${distJs}»`);
  }
  Overwrite_dist_files: {
    await this.ensureDirectoryOf(distJs);
    if (compilation.js) {
      const output = await require("terser").minify({ [distJs]: compilation.js }, {
        compress: false,
        mangle: false,
        toplevel: true,
        format: {
          comments: false, // Esta es la única cambiada
          beautify: true
        }
      });
      await require("fs").promises.writeFile(distJs, output.code, "utf8");
      console.log(`[*] Distribution file generated at: ${distJs}`);
      // Antes se creaba un .dist en el source:
      // await require("fs").promises.writeFile(srcDistJs, compilation.js, "utf8");
      report.js = distJs;
      Save_in_touch_event_cache: {
        // Antes estaba esto:
        // event.processedEntries[compilation.file] = compilation;
        event.processedEntries[compilation.file] = { distJs };
      }
      Generate_instrumentalized_if_settings_instrumentalize_includes_it: {
        await this.devbin.settings.load();
        const instrumentalizeFiles = this.devbin.settings?.data?.instrumentalize || [];
        const isMatch = this.globOf(instrumentalizeFiles).matches(distJs);
        if(isMatch) {
          Create_instrumentalization: {
            const instrJs = distJs.replace(/\.dist\.js$/g, ".dist.instr.js");
            const instrSource = this.instrumentCode(output.code, distJs);
            await require("fs").promises.writeFile(instrJs, instrSource, "utf8");
            console.log(`[*] Instrumentation file generated at: ${instrJs}`);
          }
        }
      }
    }
    if (compilation.css) {
      await require("fs").promises.writeFile(distCss, compilation.css, "utf8");
      await require("fs").promises.writeFile(srcDistCss, compilation.css, "utf8");
      report.css = distCss;
      // No cache para css ni md:
      // event.processedEntries[distCss] = compilation.css;
    }
    if (compilation.md) {
      await require("fs").promises.writeFile(distMd, compilation.md, "utf8");
      await require("fs").promises.writeFile(srcDistMd, compilation.md, "utf8");
      report.md = distMd;
      // No cache para css ni md:
      // event.processedEntries[distMd] = compilation.md;
    }
  }
  Feedback_report: {
    return report;
  }
}