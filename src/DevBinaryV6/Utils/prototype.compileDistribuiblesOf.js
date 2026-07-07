/**
 * @name DevBinaryV6.Utils.prototype.compileDistribuiblesOf
 * @type 
 * @description 
 */
async compileDistribuiblesOf(filepath, event) {
  let compilation, outputJs, outputCss, outputMd, report;
  Initialize_report: {
    report = {};
  }
  Get_compilation: {
    compilation = await this.devbin.compiler.compile(filepath);
  }
  Get_dist_filepaths: {
    const outputNames = this.getDistribuibleFilenamesOf(compilation.file);
    const inputDir = require("path").dirname(outputNames.file);
    const inputRootdir = this.devbin.compiler.rootdirOf(inputDir);
    const outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\//g, "@/dist/"));
    outputJs = require("path").resolve(outputDir, outputNames.js);
    outputCss = require("path").resolve(outputDir, outputNames.css);
    outputMd = require("path").resolve(outputDir, outputNames.md);
    report.names = outputNames;
  }
  Make_assertions_for_safety: {
    this.assert(outputJs.endsWith(".dist.js"));
    this.assert(outputCss.endsWith(".dist.css"));
    this.assert(outputMd.endsWith(".md"));
    this.assert(outputJs.includes("/dist/"));
  }
  Overwrite_dist_files: {
    await this.ensureDirectoryOf(outputJs);
    if (compilation.js) {
      await require("fs").promises.writeFile(outputJs, compilation.js, "utf8");
      report.js = outputJs;
    }
    if (compilation.css) {
      await require("fs").promises.writeFile(outputCss, compilation.css, "utf8");
      report.css = outputCss;
    }
    if (compilation.md) {
      await require("fs").promises.writeFile(outputMd, compilation.md, "utf8");
      report.md = outputMd;
    }
  }
  Feedback_report: {
    return report;
  }
}