module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-405/ExampleT405.md"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-405/ExampleT405.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-405/ExampleT405.md")), "Can generate basic md from entry in src to dist through touch (1)");
  const mdContent = await localDevbin.compiler.files.readFile("@/dist/www/t-405/ExampleT405.md");
  assert(typeof mdContent === "string", "Can generate basic md from entry in src to dist through touch (2)");
  
  compilerV6._logger.log("Test 405 ok");
};