module.exports = $localModuler.import(async function () {
  const fails = [];
  let missingJs, missingJson, validJs, validJson, brokenJs, brokenJson, mixedDependencies;
  // 1. No existe → undefined
  missingJs = await $localModuler.import("!./missing.js");
  // 2. Existe y funciona → resultado
  validJs = await $localModuler.import("!./valid.js");
  // 3. Existe pero JS explota → ERROR
  try {
    brokenJs = await $localModuler.import("!./broken.js");
  } catch (error) {
    brokenJs = "Error...";
    fails.push(3);
  }
  // 4. JSON no existe → undefined
  missingJson = await $localModuler.import("!./missing.json");
  // 5. JSON existe pero está mal formado → ERROR
  try {
    brokenJson = await $localModuler.import("!./broken.json");
  } catch (error) {
    brokenJson = "Error...";
    fails.push(5);
  }
  // 6. Dependencias mixtas
  mixedDependencies = await $localModuler.import(["!./missing.js", "./valid.js", "!./valid.json"]);
  // 7. JSON válido:
  validJson = await $localModuler.import("!./valid.json");
  return {
    missingJs, missingJson, validJs, validJson, brokenJs, brokenJson, mixedDependencies
  };
});