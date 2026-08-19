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
    installDependencies: false,
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
      dev: "./dev/run.js loop",
      test: "./dev/run.js test'"
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
        return -1;
      }
      return await fs.promises.writeFile(file, contents, "utf8");
    },
    _saveFileIfNotExists: async function(file, contents) {
      if(await utils._existsFile(file)) return -1;
      return await fs.promises.writeFile(file, contents, "utf8");
    },
    _duplicateFile: async function (src, dst) {
      if (parameters.dontOverride && await utils._existsFile(dst)) {
        return -1;
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
  const createDirectoryIfNotExists = utils.trify(utils._createDirectory);
  const saveFile = parameters.ignoreErrors ? utils.trify(utils._saveFile) : utils._saveFile;
  const saveFileIfNotExists = utils._saveFileIfNotExists;
  const duplicateFile = parameters.ignoreErrors ? utils.trify(utils._duplicateFile) : utils._duplicateFile;
  const duplicateDirectory = parameters.ignoreErrors ? utils.trify(utils._duplicateDirectory) : utils._duplicateDirectory;
  const duplicateFileIfNotExists = utils.trify(utils._initializeDuplicatedFile);

  await createDirectoryIfNotExists(`${targetDir}/dev`);
  await createDirectoryIfNotExists(`${targetDir}/dev/bin`);
  await createDirectoryIfNotExists(`${targetDir}/dev/bin/help`);
  await createDirectoryIfNotExists(`${targetDir}/dev/bin/test`);
  await createDirectoryIfNotExists(`${targetDir}/dev/coverage`);
  await createDirectoryIfNotExists(`${targetDir}/dev/files`);
  await createDirectoryIfNotExists(`${targetDir}/src`);
  await createDirectoryIfNotExists(`${targetDir}/src/external`);
  await createDirectoryIfNotExists(`${targetDir}/src/www`);
  await createDirectoryIfNotExists(`${targetDir}/src/www/dev`);
  await createDirectoryIfNotExists(`${targetDir}/src/www/external`);
  await createDirectoryIfNotExists(`${targetDir}/dist`);
  await createDirectoryIfNotExists(`${targetDir}/dist/src`);
  await createDirectoryIfNotExists(`${targetDir}/dist/www`);
  await createDirectoryIfNotExists(`${targetDir}/dist/www/coverage`);
  await createDirectoryIfNotExists(`${targetDir}/dist/www/external`);
  await createDirectoryIfNotExists(`${targetDir}/dist/www/dev`);
  await createDirectoryIfNotExists(`${targetDir}/dist/www/dev/settings`);
  await createDirectoryIfNotExists(`${targetDir}/dist/src/external`);
  await createDirectoryIfNotExists(`${targetDir}/test`);
  await createDirectoryIfNotExists(`${targetDir}/test/feature`);
  await createDirectoryIfNotExists(`${targetDir}/test/integrity`);
  await createDirectoryIfNotExists(`${targetDir}/test/unit`);
  await createDirectoryIfNotExists(`${targetDir}/test/unit/src`);
  await createDirectoryIfNotExists(`${targetDir}/test/case`);
  await createDirectoryIfNotExists(`${targetDir}/test/speed`);
  await createDirectoryIfNotExists(`${targetDir}/docs`);
  await createDirectoryIfNotExists(`${targetDir}/docs/dist`);
  await createDirectoryIfNotExists(`${targetDir}/docs/dist/www`);
  await createDirectoryIfNotExists(`${targetDir}/docs/dist/www/external`);
  
  await saveFileIfNotExists(`${targetDir}/package.json`, JSON.stringify(initialPackageJson, null, 2), "utf8");
  if(!await utils._existsFile(`${targetDir}/.gitignore`)) await saveFile(`${targetDir}/.gitignore`, "node_modules", "utf8");
  
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/devbin-help.js`, `${targetDir}/dev/bin/help/command.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/dev-bin.js`, `${targetDir}/dev/bin.js`);
  Al_run_hay_que_darle_permisos: {
    await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/dev-run.js`, `${targetDir}/dev/run.js`);
    await fs.promises.chmod(`${targetDir}/dev/run.js`, "755");
  }
  
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/index.html`, `${targetDir}/src/www/index.html`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/app.js`, `${targetDir}/src/www/app.entry.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/app.css`, `${targetDir}/src/www/app.entry.css`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/settings.js`, `${targetDir}/dev/settings.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/devbin-test.js`, `${targetDir}/dev/bin/test/command.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/www-settings.js`, `${targetDir}/src/www/dev/settings.entry.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/www-settings.js`, `${targetDir}/dist/www/dev/settings.dist.js`);
  await duplicateFileIfNotExists(`${__dirname}/../src/DevBinaryV6/Utils/core/controllers.js`, `${targetDir}/dev/controllers.js`);

  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/src/www/external/moduler-v6.entry.js`);
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/dist/www/external/moduler-v6.dist.js`);
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/docs/dist/www/external/moduler-v6.dist.js`);
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/src/external/moduler-v6.entry.js`);  
  await duplicateFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/src/external/compiler-v6.entry.js`);
  await duplicateFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/src/external/dev-binary-v6.entry.js`);
  await duplicateFile(`${__dirname}/refrescador.dist.js`, `${targetDir}/src/external/refrescador.entry.js`);
  await duplicateDirectory(`${__dirname}/refrescador`, `${targetDir}/src/external/refrescador`, { recursive: true });

  if(parameters.installDependencies) await this.installNpmDependencies([], targetDir);

  return { targetDir };

}