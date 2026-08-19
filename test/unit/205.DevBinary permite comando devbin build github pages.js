module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly || compilerV6.createAssertFunction();

  const fs2 = devBinaryV6.compiler.files;
  await fs2.deleteDirectory.try(`${__dirname}/../assets/unit/205`);
  await fs2.makeDirectory.try(`${__dirname}/../assets/unit/205`);

  const devbin1 = devBinaryV6.cloneForFile(`${__dirname}/../assets/unit/205/package.json`);
  await devbin1.command(["ensure", "core", "--from", `${__dirname}/../assets/unit/205`]);
  await fs2.writeFile(`${__dirname}/../assets/unit/205/dist/www/hello.txt`, "Hello");
  await devbin1.command(["build", "github", "pages"]);

  assert("Hello" === await fs2.readFile(`${__dirname}/../assets/unit/205/docs/dist/www/hello.txt`), "Can create github pages directory «docs» by «devbin build github pages» command (2)");
  
  compilerV6._logger.log("Test 205 ok");
};