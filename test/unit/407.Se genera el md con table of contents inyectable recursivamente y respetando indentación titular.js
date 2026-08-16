module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-407/ExampleT407.md"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-407/ExampleT407.entry.js"]);
  // await localDevbin.command(["touch", "--file", "@/src/www/t-407/Group1.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-407/ExampleT407.md")), "Can generate md with well-tabulated titles from entry in src to dist through touch (1)");
  const mdContent = await localDevbin.compiler.files.readFile("@/dist/www/t-407/ExampleT407.md");
  assert(typeof mdContent === "string", "Can inject table of contents when compiling entry.js files recursively (1)");

  //console.log(mdContent);
  assert(mdContent.includes(`- [Class ExampleT407](#class-examplet407)
  - [Index](#index)
  - [Introduction](#introduction)
  - [Main idea](#main-idea)
    - [Subidea 1](#subidea-1)
    - [Subidea 2](#subidea-2)
    - [Subidea 3](#subidea-3)
  - [Conclusion](#conclusion)
  - [Class Group1](#class-group1)
    - [Index](#index)
    - [Group1.create](#group1create)`), "Can generate table of contents when compiling entry.js files recursively (2)");
  
  assert(mdContent.includes(`- [Class Group1](#class-group1)
  - [Index](#index)
  - [Group1.create](#group1create)`), "Can generate table of contents when compiling entry.js files recursively (3)");


  compilerV6._logger.log("Test 407 ok");
};