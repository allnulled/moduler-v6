module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  await require("fs").promises.rm(`${__dirname}/../assets/unit/201`, { recursive: true });
  await require("fs").promises.mkdir(`${__dirname}/../assets/unit/201`);
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/201/package.json`), "No package.json should be here now");
  await devBinaryV6.command(["new", "project", "--from", `${__dirname}/../assets/unit/201`]);
  assert(require("fs").existsSync(`${__dirname}/../assets/unit/201/package.json`), "Command «devbin new project» should have created a package.json file here now");
  await devBinaryV6.command(["touch", "--file", `${__dirname}/../assets/unit/201/src/main.entry.js`]);
  await devBinaryV6.command(["loop"]);

  compilerV6._logger.log("Test 201 ok");
};