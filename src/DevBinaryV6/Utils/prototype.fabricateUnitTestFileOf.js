/**
 * @name DevBinaryV6.Utils.prototype.fabricateUnitTestFileOf
 * @type 
 * @description 
 */
async fabricateUnitTestFileOf(filepath, event) {
  if(event.isWww) {
    // Si es para el dist/www no hay test
    return -2;
  }
  if(!event.distribution.js) {
    // Si no tiene distribution.js no hay test
    return -3;
  }
  const path = require("path");
  const fs = require("fs");
  const testunitFile = path.resolve(event.distribution.names.rootdirDirectory.replace(/^\@\/src/g, this.devbin.compiler.fullpathOf("@/test/unit/src")), event.distribution.names.test);
  const devBinaryV6Filepath = this.devbin.compiler.fullpathOf("@/dev/bin.js");
  const devBinaryV6RelativeFilepath = path.relative(path.dirname(testunitFile), devBinaryV6Filepath);
  const relativeTarget = path.relative(path.dirname(testunitFile), event.distribution.js);
  const testunitContent = `const devbin = require(__dirname + ${JSON.stringify("/" + devBinaryV6RelativeFilepath)});\nconst target = require(__dirname + ${JSON.stringify("/" + relativeTarget)});\n\nmodule.exports = (async function () {

  devbin.assert(true, "Test is empty right now");

})();`
  const testunitDir = path.dirname(testunitFile);
  if(!await this.existsFile(testunitFile)) {
    await fs.promises.mkdir(testunitDir, { recursive: true });
    await fs.promises.writeFile(testunitFile, testunitContent, "utf8");
  }
  return {
    unitDir: testunitDir,
    unitFile: testunitFile,
    unitContent: testunitContent,
    targetFile: event.distribution.names.file,
  };
}