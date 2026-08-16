module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-406/ExampleT406.md"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-406/ExampleT406.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-406/ExampleT406.md")), "Can generate md with well-tabulated titles from entry in src to dist through touch (1)");
  const mdContent = await localDevbin.compiler.files.readFile("@/dist/www/t-406/ExampleT406.md");
  assert(typeof mdContent === "string", "Can indent md titles when compiling entry.js files recursively (1)");

  assert(mdContent.includes("\n### Clase Subapi1"), "Can indent md titles when compiling entry.js files recursively (2)");
  assert(mdContent.includes("\n### Clase Subapi2"), "Can indent md titles when compiling entry.js files recursively (3)");
  assert(mdContent.includes("\n## Clase Subapi3"), "Can indent md titles when compiling entry.js files recursively (4)");

  compilerV6._logger.log("Test 406 ok");
};