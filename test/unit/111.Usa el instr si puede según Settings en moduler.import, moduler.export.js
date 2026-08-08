module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  
  // Test omitido, hay que ensure core, custom devbin, etc.

  compilerV6._logger.log("Test 111 ok");

};