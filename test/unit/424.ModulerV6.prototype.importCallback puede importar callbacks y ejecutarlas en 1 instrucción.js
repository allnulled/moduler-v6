module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/424`);

  const result = await devBinaryV6.moduler.importCallback("@/test/assets/unit/424/callback1.js", [24]);

  assert(result === 424, "Can importCallback with arguments");

  compilerV6._logger.log("Test 424 ok");
};