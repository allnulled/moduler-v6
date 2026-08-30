module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/412`);

  Clear_previous_tests: {
    await devbinOne.files.deleteDirectory.try("@/src/kuku");
    await devbinOne.files.makeDirectory.try("@/dist");
    await devbinOne.files.makeDirectory.try("@/dist/kuku");
    await devbinOne.files.makeDirectory("@/src/kuku");
    await devbinOne.files.copyDirectory("@/src/base", "@/src/kuku");
  }

  Test_de_inject_module_con_module_exports: {
    const compilation = await devbinOne.compiler.compile("@/src/kuku/example1.entry.js");
    await compilation.toFile("@/dist/kuku/example1.dist.js");
    // SE NECESITA EL AWAIT PORQUE LOS COMPILE.INJECT.MODULES SIEMPRE DEVUELVEN UNA PROMISE:
    const production1 = devbinOne.moduler.normalizationOf("@/dist/kuku/example1.dist.js");
    const output = await require(production1);
    console.log(output);
    console.log("");
    console.log(await require("fs").promises.readFile(production1, "utf8"));
    console.log("");
    
  }

  compilerV6._logger.log("Test 412 ok");
};