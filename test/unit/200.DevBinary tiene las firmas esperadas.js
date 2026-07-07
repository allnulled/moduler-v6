module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  assert(typeof devBinaryV6.command === "function", "Can find api methods (1)");
  assert(typeof devBinaryV6.selfDispatch === "function", "Can find api methods (2)");
  assert(typeof devBinaryV6.compiler === "object", "Can find api methods (3)");
  assert(typeof devBinaryV6.moduler === "object", "Can find api methods (4)");
  assert(typeof devBinaryV6.utils === "object", "Can find api methods (5)");
  assert(typeof devBinaryV6.shadowCommands === "object", "Can find api methods (6)");
  assert(devBinaryV6.utils.devbin === devBinaryV6, "Can find api methods (7)");
  assert(devBinaryV6.shadowCommands.devbin === devBinaryV6, "Can find api methods (8)");
  assert(typeof devBinaryV6.shadowCommands["new project"] === "function", "Can find api methods (9)");
  assert(typeof devBinaryV6.shadowCommands.loop === "function", "Can find api methods (10)");
  assert(typeof devBinaryV6.shadowCommands.touch === "function", "Can find api methods (11)");

  compilerV6._logger.log("Test 200 ok");
};