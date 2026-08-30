module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const picomatchDist = require("path").resolve(`${__dirname}/../assets/unit/409/picomatch.dist.js`);

  await devBinaryV6.compiler.files.deleteFile.try(picomatchDist);

  assert(!await devBinaryV6.compiler.files.hasFile(picomatchDist), "Can clean distribution file for the test of «devbin bundle node module» command (1)");
  
  const out1 = await devBinaryV6.command([
    "bundle",
    "node",
    "module",
    "--from",
    "picomatch",
    "--asWww",
    "--asSrc",
    "--output",
    picomatchDist,
  ]);

  assert(await devBinaryV6.compiler.files.hasFile(picomatchDist), "Can generate distribution file from «devbin bundle node module» command (2)");

  compilerV6._logger.log("Test 409 ok");
};