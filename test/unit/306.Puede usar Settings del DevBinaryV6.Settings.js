module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  devBinaryV6.compiler.setRootdir(await devBinaryV6.compiler.constructor.findRootOf(__dirname));
  await devBinaryV6.settings.load(true);
  assert(devBinaryV6.settings.data.message === "ok", "Can use Settings API (1)");

  compilerV6._logger.log("Test 306 ok");
};