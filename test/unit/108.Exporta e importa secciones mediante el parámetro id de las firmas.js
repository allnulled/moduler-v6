module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/108/main.js`);

  const output = await submoduler.import("./main.js");

  assert(1 === Object.keys(modulerV6.section.root).length, `Can use export to add sections (0)`);
  assert(1000 === modulerV6.section.get("#mil/por/1"), `Can use export to add sections (1)`);
  assert(2000 === modulerV6.section.get("#mil/por/2"), `Can use export to add sections (2)`);
  assert(3000 === modulerV6.section.get("#mil/por/3"), `Can use export to add sections (3)`);

  compilerV6._logger.log("Test 107 ok");

};