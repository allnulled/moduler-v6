module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  await devBinaryV6.command(["new", "project", "--from", `${__dirname}/../assets/unit/201`]);
  await devBinaryV6.command(["touch", "--file", `${__dirname}/../assets/unit/201/src/main.entry.js`]);
  await devBinaryV6.command(["loop"]);

  compilerV6._logger.log("Test 201 ok");
};