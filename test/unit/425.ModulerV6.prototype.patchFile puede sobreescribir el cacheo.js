module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const original = {};

  devBinaryV6.moduler.patchFile("@/fichero/virtual.js", original);

  const result = devBinaryV6.moduler.import("@/fichero/virtual.js");

  assert(result === original, "Can patchFile");

  compilerV6._logger.log("Test 424 ok");
};