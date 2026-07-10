/**
 * @name DevBinaryV6.Utils.prototype.ensureCoreFrom
 * @type 
 * @description 
 */
async ensureCoreFrom(basedirInput, parametersInput = {}) {
  
  const basedir = this.devbin.compiler.normalizationOf(basedirInput);
  
  const parameters = Object.assign({}, {
    ignoreErrors: false,
    allowDirtyDirectory: false,
  }, parametersInput, {
    from: basedirInput,
  });
  
  const fs = require("fs");
  const path = require("path");
  const targetDir = path.resolve(parameters.from);
  const innerFiles = await fs.promises.readdir(targetDir);
  
  if(!parameters.allowDirtyDirectory) {
    this.assert(innerFiles.length === 0, `Parameter «--from» should point to an empty directory but «${targetDir}» is not empty on «DevBinaryV6.Utils.prototype.ensureCoreFrom»`);
  }
  
  const initialPackageJson = {
    name: "name-of-the-project",
    bin: {},
    main: "dist/main.dist.js",
    scripts: {
      test: "echo 'no tests now'"
    },
    author: "allnulled",
    version: "1.0.0",
  };

  const createDirectory = function(dir) {
    return fs.promises.mkdir(dir);
  };
  const saveFile = function(file, contents) {
    return fs.promises.writeFile(file, contents, "utf8");
  };
  const duplicateFile = function(src, dst) {
    return fs.promises.copyFile(src, dst);
  };
  const duplicateDirectory = function(src, dst) {
    return fs.promises.cp(src, dst, { recursive: true });
  };

  await createDirectory(`${targetDir}/dev`);
  await createDirectory(`${targetDir}/dev/bin`);
  await createDirectory(`${targetDir}/dev/bin/help`);
  await createDirectory(`${targetDir}/src`);
  await createDirectory(`${targetDir}/src/lib`);
  await createDirectory(`${targetDir}/dist`);
  await createDirectory(`${targetDir}/dist/src`);
  await createDirectory(`${targetDir}/dist/src/lib`);
  await createDirectory(`${targetDir}/test`);
  await createDirectory(`${targetDir}/test/unit`);
  await createDirectory(`${targetDir}/test/unit/src`);
  await createDirectory(`${targetDir}/docs`);
  await saveFile(`${targetDir}/package.json`, JSON.stringify(initialPackageJson, null, 2), "utf8");
  await saveFile(`${targetDir}/dev/bin.js`, "#!/usr/bin/env node\n\nrequire(`${__dirname}/../dist/src/lib/dev-binary-v6.dist.js`);\n\nmodule.exports = DevBinaryV6.create(`${__dirname}/..`);", "utf8");
  await saveFile(`${targetDir}/dev/run.js`, "#!/usr/bin/env node\n\nmodule.exports = require(`${__dirname}/bin.js`).selfDispatch();", "utf8");
  await saveFile(`${targetDir}/dev/bin/help/command.js`, 'module.exports = async function() {\n  throw new Error("Command «help» is not coded yet");\n};', "utf8");
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/src/lib/moduler-v6.entry.js`);
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/dist/src/lib/moduler-v6.dist.js`);
  await duplicateFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/src/lib/compiler-v6.entry.js`);
  await duplicateFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/dist/src/lib/compiler-v6.dist.js`);
  await duplicateFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/src/lib/dev-binary-v6.entry.js`);
  await duplicateFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/dist/src/lib/dev-binary-v6.dist.js`);
  await duplicateFile(`${__dirname}/refrescador.dist.js`, `${targetDir}/src/lib/refrescador.entry.js`);
  await duplicateFile(`${__dirname}/refrescador.dist.js`, `${targetDir}/dist/src/lib/refrescador.dist.js`);
  await duplicateDirectory(`${__dirname}/refrescador`, `${targetDir}/src/lib/refrescador`, { recursive: true });
  await duplicateDirectory(`${__dirname}/refrescador`, `${targetDir}/dist/src/lib/refrescador`, { recursive: true });

  return { targetDir };

}