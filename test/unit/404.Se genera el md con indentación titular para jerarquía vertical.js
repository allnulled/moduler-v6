module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-404/ExampleT404.md"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-404/ExampleT404.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-404/ExampleT404.md")), "Can generate md from entry in src to dist through touch (1)");
  const mdContent = await localDevbin.compiler.files.readFile("@/dist/www/t-404/ExampleT404.md");
  assert(typeof mdContent === "string", "Can generate md from entry in src to dist through touch (2)");
  
  compilerV6._logger.log("Test 404 ok");
};