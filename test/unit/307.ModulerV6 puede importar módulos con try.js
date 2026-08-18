module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  Caso_import_file_entiende_el_simbolo: {
    const it1 = await modulerV6.import("@/test/assets/unit/307/exists.js");
    const it2 = await modulerV6.import("!@/test/assets/unit/307/not-exists.js");
    assert(it1 === 100, "Can import non-existent modules with try when lookahead prefix (1)");
    assert(typeof it2 === "undefined", "Can import non-existent modules with try when lookahead prefix (2)");
  }

  Caso_rutas_respeta_el_simbolo: {
    const path1 = modulerV6._joinPaths(["@/path/to/somewhere"]);
    const path2 = modulerV6._joinPaths(["!@/path/to/somewhere"]);
    const path3 = `!${path1}`;
    assert(path2 === path3, "Can use joinPaths with prefix of justTry option usable in imports and exports (3)");
  }

  Caso_import_dependencias_entiende_el_simbolo: {
    const resultado1 = await modulerV6.import(["!@/test/assets/unit/307/not-exists.js"], function ([notExists]) {
      return notExists;
    });
    assert(typeof resultado1 === "undefined", "Can import non-existent modules with try when lookahead prefix (4)");
  }

  Caso_import_json_entiende_el_simbolo: {
    const resultado1 = await modulerV6.import(["!@/test/assets/unit/307/not-exists.json"], function ([notExists]) {
      return notExists;
    });
    assert(typeof resultado1 === "undefined", "Can import non-existent modules with try when lookahead prefix (5)");
  }

  Caso_mixto_chatgpt: {
    const it3 = await modulerV6.import("!@/test/assets/unit/307/mixto.js");
    assert(typeof it3 === "object", "Can use ! to import missing files but still throws on evaluation errors (0)");
    assert(typeof it3.missingJs === "undefined", "Can use ! to import missing files but still throws on evaluation errors (1)");
    assert(typeof it3.missingJson === "undefined", "Can use ! to import missing files but still throws on evaluation errors (2)");
    assert(typeof it3.validJs === "number", "Can use ! to import missing files but still throws on evaluation errors (3)");
    assert(typeof it3.validJson === "object", "Can use ! to import missing files but still throws on evaluation errors (4)");
    assert(typeof it3.brokenJs === "string", "Can use ! to import missing files but still throws on evaluation errors (5)");
    assert(typeof it3.brokenJson === "string", "Can use ! to import missing files but still throws on evaluation errors (6)");
    assert(typeof it3.mixedDependencies === "object", "Can use ! to import missing files but still throws on evaluation errors (7)");
    assert(typeof it3.mixedDependencies[0] === "undefined", "Can use ! to import missing files but still throws on evaluation errors (8)");
    assert(typeof it3.mixedDependencies[1] === "number", "Can use ! to import missing files but still throws on evaluation errors (9)");
  }


  compilerV6._logger.log("Test 307 ok");
};