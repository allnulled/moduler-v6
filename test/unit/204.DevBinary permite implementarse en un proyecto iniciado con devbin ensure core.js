module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly || compilerV6.createAssertFunction();

  
  await require("fs").promises.rm(`${__dirname}/../assets/unit/204`, { recursive: true });
  await require("fs").promises.mkdir(`${__dirname}/../assets/unit/204`);
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/204/not-empty.txt`, "This file is to demonstrate the directory was not empty when devbin ensure core --from ... was fired.", "utf8");
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/204/package.json`), "No package.json should be here now");

  const devbin1 = devBinaryV6.cloneForFile(`${__dirname}/../assets/units/204/package.json`);
  
  await devbin1.command(["ensure", "core", "--from", `${__dirname}/../assets/unit/204`]);

  assert(require("fs").existsSync(`${__dirname}/../assets/unit/204/package.json`), "A package.json should be here now");

  compilerV6._logger.log("Test 204 ok");
};