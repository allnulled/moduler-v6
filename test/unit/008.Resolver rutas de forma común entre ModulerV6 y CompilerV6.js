module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  Test_de_resolucion_de_rutas_desde_compiler_y_moduler: {
    assert(typeof DevBinaryV6 === "function", "Can find DevBinary class");
    assert(typeof devBinaryV6 === "object", "Can find devBinary instance");
    const innerDir = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const innerDir2 = devBinaryV6.compiler.moduler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const root1 = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing");
    assert(innerDir === innerDir2, "condicion temporal 1");
    const innerRoot = await DevBinaryV6._findFirstParentDirectoryContaining(innerDir);
    const innerRoot2 = await DevBinaryV6._findFirstParentDirectoryContaining(root1 + "/..");
    assert(innerRoot === root1, "Can find first parent directory containing certain file (1)");
    assert(innerRoot2 !== root1, "Can find first parent directory containing certain file (2)");
  }

  await devBinaryV6.command(["touch", "--file", "@/src/moduler-v6.js"]);

  compilerV6._logger.log("Test 008 ok");

};