module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-403/ExampleT403.rels.json"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-403/ExampleT403.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-403/ExampleT403.rels.json")), "Can generate rels.json from entry in src to dist through touch (1)");
  const relsJson = await localDevbin.moduler.import("@/dist/www/t-403/ExampleT403.rels.json");
  assert(typeof relsJson === "object", "Can generate rels.json from entry in src to dist through touch (2)");
  assert(typeof relsJson.tree === "object", "Can generate rels.json from entry in src to dist through touch (3)");
  assert(typeof relsJson.tree["@/src/www/t-403/ExampleT403.entry.js"] === "object", "Can generate rels.json from entry in src to dist through touch (4)");
  
  compilerV6._logger.log("Test 403 ok");
};