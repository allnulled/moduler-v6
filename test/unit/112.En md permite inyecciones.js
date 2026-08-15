module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = compilerV6.createAssertFunction();
  const subcompiler = compilerV6._cloneForFile(`${__dirname}/../assets/unit/112/main.md`);

  const compilation = await subcompiler.compile("./main.md");

  assert(compilation.md.includes("Párrafo principal."), "Can inject md sources from md (1)");
  assert(compilation.md.includes("# Table of contents"), "Can inject md sources from md (2)");

  await subcompiler.files.writeFile.try("@/test/assets/unit/112/main.dist.md", compilation.md);

  compilerV6._logger.log("Test 112 ok");

};