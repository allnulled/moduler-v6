module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const subcompiler = compilerV6._cloneForFile(`${__dirname}/../assets/unit/107/main.js`);

  const output = await subcompiler.compile("./main.js", { to: "data" });

  assert("@/test/assets/unit/107/main.js" in output.report.tree, "Dependencies static analysis is not working as expected (1)");
  assert("@/test/assets/unit/107/example-2.js" in output.report.tree, "Dependencies static analysis is not working as expected (2)");
  assert("@/test/assets/unit/107/example-4.js" in output.report.tree, "Dependencies static analysis is not working as expected (3)");
  assert("@/test/assets/unit/107/example-3.js" in output.report.tree, "Dependencies static analysis is not working as expected (4)");
  assert("@/test/assets/unit/107/example-1.js" in output.report.tree, "Dependencies static analysis is not working as expected (5)");

  assert(2 === Object.keys(output.report.tree["@/test/assets/unit/107/main.js"]).length, "Can report runtime dependencies only if they are based on files (1)");
  assert(output.report.tree["@/test/assets/unit/107/main.js"]["117-168"].syntax === "Moduler Import", "Can report runtime dependencies only if they are based on files (2)");
  assert(output.report.tree["@/test/assets/unit/107/main.js"]["81-113"].syntax === "Moduler Import", "Can report runtime dependencies only if they are based on files (3)");

  compilerV6._logger.log("Test 107 ok");

};