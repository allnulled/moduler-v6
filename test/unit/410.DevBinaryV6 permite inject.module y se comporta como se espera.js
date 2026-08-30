module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/410`);

  Clear_previous_tests: {
    await devbinOne.files.deleteDirectory.try("@/src/ikk");
    await devbinOne.files.makeDirectory.try("@/dist");
    await devbinOne.files.makeDirectory.try("@/dist/ikk");
    await devbinOne.files.makeDirectory("@/src/ikk");
    await devbinOne.files.copyDirectory("@/src/base", "@/src/ikk");
  }

  Test_de_inject_module_con_module_exports: {
    const compilation = await devbinOne.compiler.compile("@/src/ikk/module1.entry.js");
    await compilation.toFile("@/dist/ikk/module1.dist.js");
    // SE NECESITA EL AWAIT PORQUE LOS COMPILE.INJECT.MODULE SIEMPRE DEVUELVEN UNA PROMISE:
    const output = await require(devbinOne.moduler.normalizationOf("@/dist/ikk/module1.dist.js"));
    assert(output === 400, "Can use «$compiler.inject.module» normal node.js module respecting «module.exports» syntax (1)");
  }

  Test_de_multiples_inject_module_con_module_exports: {
    const compilation = await devbinOne.compiler.compile("@/src/ikk/module2.entry.js");
    await compilation.toFile("@/dist/ikk/module2.dist.js");
    const output = await require(devbinOne.moduler.normalizationOf("@/dist/ikk/module2.dist.js"));
    assert(typeof output === "object", "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (2)");
    assert(output.a === 1, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (3)");
    assert(output.b === 2, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (4)");
    assert(output.c === 3, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (5)");
  }

  Test_de_inject_module_con_export_property: {
    const compilation = await devbinOne.compiler.compile("@/src/ikk/module3.entry.js");
    await compilation.toFile("@/dist/ikk/module3.dist.js");
    const output = await require(devbinOne.moduler.normalizationOf("@/dist/ikk/module3.dist.js"));
    assert(typeof output === "object", "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (12)");
    assert(output.a === 1, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (13)");
    assert(output.b === 2, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (14)");
    assert(output.c === 3, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (15)");
  }

  Test_de_inject_module_y_su_reserveFile: {
    const compilation = await devbinOne.compiler.compile("@/src/ikk/module4.entry.js");
    await compilation.toFile("@/dist/ikk/module4.dist.js");
    const output = await require(devbinOne.moduler.normalizationOf("@/dist/ikk/module4.dist.js"));
    assert(output.u === 90, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (16)");
    assert(output.x === 290, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (17)");
    assert(output.w === 190, "Can use multiple «$compiler.inject.module» respecting «module.exports» syntax (18)");
  }

  compilerV6._logger.log("Test 410 ok");
};