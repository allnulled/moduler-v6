module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  

  compilerV6._logger.log("Test 415 ok");
};