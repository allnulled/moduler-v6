module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  assert(devBinaryV6.utils.globOf(["**/*.txt"]).matches("un.txt"), "Can use glob expressions against paths (1)");
  assert(!devBinaryV6.utils.globOf(["**/*.dxt"]).matches("un.txt"), "Can use glob expressions against paths (2)");

  compilerV6._logger.log("Test 305 ok");
};