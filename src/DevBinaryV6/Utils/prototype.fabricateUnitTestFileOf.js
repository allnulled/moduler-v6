/**
 * @name DevBinaryV6.Utils.prototype.fabricateUnitTestFileOf
 * @type 
 * @description 
 */
async fabricateUnitTestFileOf(filepath, event) {
  if (event.isSrcWww) {
    // Si es para el dist/www no hay test
    return -2;
  }
  if (!event.distribution.js) {
    // Si no tiene distribution.js no hay test
    return -3;
  }
  // @NOTA: Porque he perdido algo de tiempo con esto
  // Sí, es sin el / del final, porque se refiere a un directorio, así que la barra se entiende por el paso anterior, donde ha extraído 1 directorio
  // Este caso de esta forma subre los casos de @/src/fichero-inmediato.js
  if (!event.distribution.names.rootdirDirectory.startsWith("@/src")) {
    // Si no es del src, ignorar
    return -4;
  }
  let muters = [];
  try {
    const path = require("path");
    const fs = require("fs");
    const testunitDir = event.distribution.names.rootdirDirectory.replace("@/src", this.devbin.compiler.normalizationOf("@/test/unit/src"));
    const testunitFile = path.resolve(testunitDir, event.distribution.names.test);
    const devBinaryV6Filepath = this.devbin.compiler.normalizationOf("@/dev/bin.js");
    const devBinaryV6RelativeFilepath = path.relative(path.dirname(testunitFile), devBinaryV6Filepath);
    const relativeTarget = path.relative(path.dirname(testunitFile), event.distribution.js);
    const testunitContent = `const devbin = require(__dirname + ${JSON.stringify("/" + devBinaryV6RelativeFilepath)});\nconst target = require(__dirname + ${JSON.stringify("/" + relativeTarget)});\n\nmodule.exports = (async function () {
      
    devbin.assert(true, "Test is empty right now");
    
})();`
    if (!await this.existsFile(testunitFile)) {
      await fs.promises.mkdir(testunitDir, { recursive: true });
      muters.push(await this.devbin.utils.addTouchMutedirTo(require("path").dirname(testunitDir)));
      await fs.promises.writeFile(testunitFile, testunitContent, "utf8");
      muters.push(await this.devbin.utils.addTouchMutedirTo(testunitDir));
    }
    return {
      unitDir: testunitDir,
      unitFile: testunitFile,
      unitContent: testunitContent,
      targetFile: event.distribution.names.file,
    };
  } catch (error) {
    throw error;
  } finally {
    if (muters.length) {
      for (let index = 0; index < muters.length; index++) {
        const muter = muters[index];
        await muter.cancel();
      }
    }
  }
}