module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/index.entry.html"));
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/src/www/.mutedir"));
  await localDevbin.command(["touch", "--file", "@/src/www/index.entry.html"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/index.dist.html")), "Can copy *.entry.html files from src to dist through touch (1)");
  compilerV6._logger.log("Test 402 ok");
};