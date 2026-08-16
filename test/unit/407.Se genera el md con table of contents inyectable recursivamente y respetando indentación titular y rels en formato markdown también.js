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
  - [Table of contents](#table-of-contents)
  - [Relations](#relations)
  - [Class Group1](#class-group1)
    - [Table of contents](#table-of-contents)
    - [Relations](#relations)
    - [Group1.create](#group1create)`), "Can generate table of contents when compiling entry.js files recursively (2)");
  
  assert(mdContent.includes(`- [Class Group1](#class-group1)
  - [Table of contents](#table-of-contents)
  - [Relations](#relations)
  - [Group1.create](#group1create)`), "Can generate table of contents when compiling entry.js files recursively (3)");

  assert(mdContent.includes(`- **@/src/www/t-407/ExampleT407.entry.js** uses **2 files**
  1. *@/src/www/t-407/Group1.entry.js* with **@Injects**
  2. *@/src/www/t-407/ExampleT407.md* with **@Injects**
- **@/src/www/t-407/Group1.entry.js** uses **1 files**
  1. *@/src/www/t-407/Group1.part1.js* with **Inject Source**
- **@/src/www/t-407/Group1.part1.js** *free*
- **@/src/www/t-407/ExampleT407.md** *free*`), "Can generate relations when compiling entry.js files (not recursively) (3)");

  compilerV6._logger.log("Test 407 ok");
};