/**
 * @name CompilerV6.CompilationResult.prototype.toFile
 * @type 
 * @description 
 */
toFile(file, options = {}) {
  this.compiler.assert(require("path").basename(file).includes(".dist."), `Method «toFile» only accepts files containing «.dist.» pattern and file «${file}» does not incur the case`);
  const fileExtension = require("path").extname(file);
  const fileNormalization = this.compiler.normalizationOf(file);
  const fileJs = this.compiler.constructor._changeFileExtension(fileNormalization, ".js");
  const fileCss = this.compiler.constructor._changeFileExtension(fileNormalization, ".css");
  const fileMd = this.compiler.constructor._changeFileExtension(fileNormalization, ".md");
  const promises = [];
  if (this.js) {
    const outputJs = (options.mode === "beautified" && this.beautifiedJs) ? this.beautifiedJs.code : (options.mode === "minified" && this.minifiedJs) ? this.minifiedJs.code : this.js;
    promises.push(require("fs").promises.writeFile(fileJs, outputJs, "utf8"));
  } else if (this.css) {
    promises.push(require("fs").promises.writeFile(fileCss, this.css, "utf8"));
  } else if (this.md) {
    promises.push(require("fs").promises.writeFile(fileMd, this.md, "utf8"));
  }
  return Promise.all(promises);
}