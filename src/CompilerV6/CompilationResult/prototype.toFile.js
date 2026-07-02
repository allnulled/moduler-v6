/**
 * @name CompilerV6.CompilationResult.prototype.toFile
 * @type 
 * @description 
 */
toFile(file, options = {}) {
  const fileExtension = require("path").extname(file);
  const fileNormalization = this.compiler.normalizationOf(file);
  this.compiler.assert(!fileNormalization.match(/\.dist\.{js,css,md}$/g), `Method «toFile» does not accept files ending with «.dist.{js,css,md}» and file «${fileNormalization}» incurs this case`);
  const fileJs = this.compiler.constructor._changeFileExtension(fileNormalization, ".dist.js");
  const fileCss = this.compiler.constructor._changeFileExtension(fileNormalization, ".dist.css");
  const fileMd = this.compiler.constructor._changeFileExtension(fileNormalization, ".dist.md");
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