module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localModuler = ModulerV6.create(`${__dirname}/../assets/unit/307`);
  await localModuler.settings.load();
  const SomeSection = await localModuler.import("#SomeSection");
  assert(typeof SomeSection === "number", "Can use moduler.settings.data.sectionsMap to find modules by section (point 1)");
  assert(SomeSection === 500, "Can use moduler.settings.data.sectionsMap to find modules by section (point 2)");

  compilerV6._logger.log("Test 307 ok");
};