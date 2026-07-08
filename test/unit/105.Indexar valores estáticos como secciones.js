module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/105/main.js`);

  submoduler.section.set("some/property", 400);

  assert(400 === submoduler.section.get("some/property"), "Can set and get sections from moduler");
  assert(400 === modulerV6.section.get("some/property"), "Can share sections across different moduler instances");
  submoduler.section.set("some/object", {a:0});
  assert(0 === modulerV6.section.get("some/object/a"), "Can access previous values (0)");
  submoduler.section.overwrite("some/object", {a:1,b:2});
  assert(1 === modulerV6.section.get("some/object/a"), "Can access previous values (1)");
  assert(2 === modulerV6.section.get("some/object/b"), "Can access previous values (2)");
  submoduler.section.fill("some/object", {a:3,b:4,c:5});
  assert(1 === modulerV6.section.get("some/object/a"), "Can access previous values (3)");
  assert(2 === modulerV6.section.get("some/object/b"), "Can access previous values (4)");
  assert(5 === modulerV6.section.get("some/object/c"), "Can access previous values (5)");
  submoduler.section.reset();
  assert(0 === Object.keys(modulerV6.section.root).length, "Can reset all values at once (0)");

  compilerV6._logger.log("Test 105 ok");

};