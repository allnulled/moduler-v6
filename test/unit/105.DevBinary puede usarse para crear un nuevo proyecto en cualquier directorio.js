module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  await devBinaryV6.command(["touch", "--file", "@/src/moduler-v6.js"]);

  compilerV6._logger.log("Test 105 ok");

};