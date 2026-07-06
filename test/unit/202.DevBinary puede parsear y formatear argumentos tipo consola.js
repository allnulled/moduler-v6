module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, DevBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const output1 = devBinaryV6.utils.formatCliArgs({
    target: {
      alias: ["-t"],
      default: null,
      onFormat: devBinaryV6.constructor.Formatters.asString,
      description: "Specifies the target file",
    },
    version: {
      alias: ["-v"],
      default: false,
      onFormat: devBinaryV6.constructor.Formatters.asBoolean,
      description: "Says the current version of the cli program",
    },
    help: {
      alias: ["-h"],
      default: false,
      onFormat: devBinaryV6.constructor.Formatters.asBoolean,
      description: "Shows the help",
    }
  }, [
    "new",
    "task",
    "--target",
    "target.txt",
    "target2.txt",
    "target3.txt",
    "-h",
  ]);

  assert(output1._[0] === "new", "Formats cli arguments as expected (1)");
  assert(output1._[1] === "task", "Formats cli arguments as expected (2)");
  assert(output1.target === "target3.txt", "Formats cli arguments as expected (3)");
  assert(output1.version === false, "Formats cli arguments as expected (4)");
  assert(output1.help === true, "Formats cli arguments as expected (5)");

  compilerV6._logger.log("Test 201 ok");
};