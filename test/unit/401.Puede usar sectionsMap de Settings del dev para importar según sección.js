module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localModuler = ModulerV6.create(`${__dirname}/../assets/unit/401`);
  await localModuler.settings.load();
  await devBinaryV6.utils.ensureCoreFrom(`${__dirname}/../assets/unit/401`, { allowDirtyDirectory: true });
  const SomeSection = await localModuler.import("#SomeSection");
  const SomeSectionFromDev = await localModuler.import("#SomeSectionFromDev");
  assert(typeof SomeSection === "number", "Can use moduler.settings.data.sectionsMap to find modules by section (point 1)");
  assert(SomeSection === 500, "Can use moduler.settings.data.sectionsMap to find modules by section (point 2)");
  assert(SomeSectionFromDev === 700, "Can use moduler.settings.data.sectionsMap to find modules by section using the sectionsMap from dev/settings.js too (point 3)");

  compilerV6._logger.log("Test 401 ok");
};