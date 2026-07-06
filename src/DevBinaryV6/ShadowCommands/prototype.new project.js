/**
 * @name DevBinaryV6.ShadowCommands.prototype.new project
 * @type 
 * @description 
 */
async "new project"(args, devbin) {
  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Empty directory from which to start the new project"
    }
  }, args);
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['new project']»`);
  const fs = require("fs");
  const path = require("path");
  const targetDir = path.resolve(parameters.from);
  const innerFiles = await fs.promises.readdir(targetDir);
  this.assert(innerFiles.length === 0, `Parameter «--from» should point to an empty directory but «${targetDir}» is not empty on «DevBinaryV6.ShadowCommands.prototype['new project']»`);
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
  await fs.promises.mkdir(`${targetDir}/dev`);
  await fs.promises.mkdir(`${targetDir}/dev/bin`);
  await fs.promises.mkdir(`${targetDir}/dev/bin/help`);
  await fs.promises.mkdir(`${targetDir}/src`);
  await fs.promises.mkdir(`${targetDir}/src/lib`);
  await fs.promises.mkdir(`${targetDir}/dist`);
  await fs.promises.mkdir(`${targetDir}/dist/src`);
  await fs.promises.mkdir(`${targetDir}/test`);
  await fs.promises.mkdir(`${targetDir}/test/unit`);
  await fs.promises.mkdir(`${targetDir}/test/unit/src`);
  await fs.promises.mkdir(`${targetDir}/docs`);
  await fs.promises.writeFile(`${targetDir}/package.json`, JSON.stringify(initialPackageJson, null, 2), "utf8");
  await fs.promises.writeFile(`${targetDir}/dev/bin.js`, '#!/usr/bin/env node\n\nmodule.exports = require(`${__dirname}/../src/lib/dev-binary-v6.dist.js`).create(`${__dirname}/..`);', "utf8");
  await fs.promises.writeFile(`${targetDir}/dev/run.js`, '#!/usr/bin/env node\n\nmodule.exports = require(`${__dirname}/bin.js`).selfDispatch();', "utf8");
  await fs.promises.writeFile(`${targetDir}/dev/bin/help/command.js`, 'module.exports = async function() {\n  throw new Error("Command «help» is not coded yet");\n};', "utf8");
  await fs.promises.copyFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/src/lib/moduler-v6.dist.js`);
  await fs.promises.copyFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/src/lib/compiler-v6.dist.js`);
  await fs.promises.copyFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/src/lib/dev-binary-v6.dist.js`);
  return { targetDir };
}