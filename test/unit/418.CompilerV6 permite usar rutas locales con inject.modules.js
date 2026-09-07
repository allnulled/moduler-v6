module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/418`);

  Clear_previous_tests: {
    await devbinOne.files.deleteDirectory.try("@/src/ejemplo");
    await devbinOne.files.makeDirectory.try("@/dist");
    await devbinOne.files.makeDirectory.try("@/dist/ejemplo");
    await devbinOne.files.makeDirectory("@/src/ejemplo");
    await devbinOne.files.copyDirectory("@/src/base", "@/src/ejemplo");
  }

  Test_de_inject_module_con_module_exports: {
    const allEntries = await devbinOne.files.findByPattern("@/src/ejemplo/**/*.entry.js");
    for(let index=0; index<allEntries.length; index++) {
      const entryFile = allEntries[index];
      //await devbinOne.utils.touchFile(entryFile);
      const compilation = await devbinOne.compiler.compile(entryFile);
      await compilation.toFile(devbinOne.moduler._getDistRootpathFromSrc(entryFile));
    }
    // SE NECESITA EL AWAIT PORQUE LOS COMPILE.INJECT.MODULES SIEMPRE DEVUELVEN UNA PROMISE:
    const production1 = devbinOne.moduler.normalizationOf("@/dist/ejemplo/example1.dist.js");
    const output = await devbinOne.moduler.import(production1);
    assert(output.module1.submodule1.domain1 === 100, "Can compile multiple modules using local paths (1)");
    assert(output.module1.submodule1.domain2 === 200, "Can compile multiple modules using local paths (2)");
    assert(output.module1.submodule1.domain3 === 300, "Can compile multiple modules using local paths (3)");
    assert(output.module1.submodule2 === 2, "Can compile multiple modules using local paths (4)");
    assert(output.module1.submodule3 === 3, "Can compile multiple modules using local paths (5)");
    assert(output.module2 === 2, "Can compile multiple modules using local paths (6)");
    assert(output.module3 === 3, "Can compile multiple modules using local paths (7)");
  }

  compilerV6._logger.log("Test 418 ok");
};