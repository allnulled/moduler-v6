module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/110/main.js`);

  submoduler.setRootdir(submoduler.basedir);

  await submoduler.settings.load();
  
  assert(typeof submoduler.settings.data === "object", "Can access settings instance from moduler");
  assert(typeof submoduler.settings.data.instrumentalize === "object", "Can load settings instance from moduler");

  compilerV6._logger.log("Test 110 ok");

};