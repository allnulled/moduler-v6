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
    dontOverride: false,
  }, parametersInput, {
    from: basedirInput,
  });

  const fs = require("fs");
  const path = require("path");
  const targetDir = path.resolve(parameters.from);
  const innerFiles = await fs.promises.readdir(targetDir);

  if (!parameters.allowDirtyDirectory) {
    this.assert(innerFiles.length === 0, `Parameter «--from» should point to an empty directory but «${targetDir}» is not empty on «DevBinaryV6.Utils.prototype.ensureCoreFrom»`);
  }

  const currentPackageJson = (() => {
    try {
      return require(`${__dirname}/../package.json`);
    } catch (error) {
      return { devDependencies: {}, dependencies: {} };
    }
  })();
  const initialPackageJson = {
    name: "name-of-the-project",
    bin: {},
    main: "dist/main.dist.js",
    scripts: {
      test: "echo 'no tests now'"
    },
    dependencies: currentPackageJson.dependencies,
    devDependencies: currentPackageJson.devDependencies,
    author: "allnulled",
    version: "1.0.0",
  };

  const utils = {};
  
  Object.assign(utils, {
    _createDirectory: function (dir) {
      return fs.promises.mkdir(dir);
    },
    _saveFile: async function (file, contents) {
      if (parameters.dontOverride && await utils._existsFile(file)) {
        return;
      }
      return await fs.promises.writeFile(file, contents, "utf8");
    },
    _duplicateFile: async function (src, dst) {
      if (parameters.dontOverride && await utils._existsFile(dst)) {
        return;
      }
      return await fs.promises.copyFile(src, dst);
    },
    _duplicateDirectory: function (src, dst) {
      // @CAUTION: aquí no hay filtro de dontOverride
      return fs.promises.cp(src, dst, { recursive: true });
    },
    _initializeDuplicatedFile: async function(src, dst) {
      if(!await utils._existsFile(dst)) {
        return await fs.promises.copyFile(src, dst);
      }
    },
    _readFile: function (src) {
      return fs.promises.readFile(src, "utf8");
    },
    trify: function (callback, errorSignal = false) {
      return async function (...args) {
        try {
          return await callback(...args);
        } catch (error) {
          return errorSignal;
        }
      };
    },
  });

  Object.assign(utils, {
    _existsFile: utils.trify(utils._readFile, false),
  });


  const createDirectory = parameters.ignoreErrors ? utils.trify(utils._createDirectory) : utils._createDirectory;
  const saveFile = parameters.ignoreErrors ? utils.trify(utils._saveFile) : utils._saveFile;
  const duplicateFile = parameters.ignoreErrors ? utils.trify(utils._duplicateFile) : utils._duplicateFile;
  const duplicateDirectory = parameters.ignoreErrors ? utils.trify(utils._duplicateDirectory) : utils._duplicateDirectory;
  const duplicateFileIfNotExists = utils.trify(utils._initializeDuplicatedFile);

  await createDirectory(`${targetDir}/dev`);
  await createDirectory(`${targetDir}/dev/bin`);
  await createDirectory(`${targetDir}/dev/bin/help`);
  await createDirectory(`${targetDir}/src`);
  await createDirectory(`${targetDir}/src/lib`);
  await createDirectory(`${targetDir}/dist`);
  await createDirectory(`${targetDir}/dist/src`);
  await createDirectory(`${targetDir}/dist/www`);
  await createDirectory(`${targetDir}/dist/src/lib`);
  await createDirectory(`${targetDir}/test`);
  await createDirectory(`${targetDir}/test/unit`);
  await createDirectory(`${targetDir}/test/unit/src`);
  await createDirectory(`${targetDir}/docs`);
  
  await saveFile(`${targetDir}/package.json`, JSON.stringify(initialPackageJson, null, 2), "utf8");
  if(!await utils._existsFile(`${targetDir}/.gitignore`)) await saveFile(`${targetDir}/.gitignore`, "node_modules", "utf8");
  
  await saveFile(`${targetDir}/dev/bin/help/command.js`, 'module.exports = async function() {\n  throw new Error("Command «help» is not coded yet");\n};', "utf8");
  await saveFile(`${targetDir}/dev/run.js`, "#!/usr/bin/env node\n\nmodule.exports = require(`${__dirname}/bin.js`).selfDispatch();", "utf8");
  await saveFile(`${targetDir}/dev/bin.js`, "#!/usr/bin/env node\n\nrequire(`${__dirname}/../dist/src/lib/dev-binary-v6.dist.js`);\n\nmodule.exports = DevBinaryV6.create(`${__dirname}/..`);", "utf8");
  
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/index.html`, `${targetDir}/dist/www/index.html`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/app.js`, `${targetDir}/dist/www/app.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/app.css`, `${targetDir}/dist/www/app.css`);
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