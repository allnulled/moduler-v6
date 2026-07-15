module.exports = async function ({ assert:assertLoudly, utils, compilerV6 }) {

  compilerV6._logger.log("Test 103 iniciando");

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction() || assertLoudly;

  Test_from_assets: {
    const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/103/main.js`);
    const subcompiler = compilerV6._cloneForFile(`${__dirname}/../assets/unit/103/main.js`);
    try {await require("fs").promises.unlink(subcompiler.normalizationOf("./main.dist.js"));} catch (error) {}
    try {await require("fs").promises.unlink(subcompiler.normalizationOf("./main.dist.min.js"));} catch (error) {}
    Test_de_los_distribuibles: {
      // @ATENTION: si vienes por los tiempos del test:
      // La llamada cara es esta:;
      const compilation = await subcompiler.compile("./main.js", {
        beautify: true,
        minify: true,
      });
      const [persistenceDist, persistenceDistMin] = await Promise.all([
        compilation.toFile("./main.dist.js", {mode:"beautified"}),
        compilation.toFile("./main.dist.min.js", {mode:"minified"}),
      ]);
    }
    compilerV6._logger.log("Test 103 - ok - parte 1 - distribuibles");
    Test_of_first_level_file_evaluation: {
      const middletest1 = await submoduler.import("./middletests/exports.any.js");
      const middletest2 = await submoduler.import("./middletests/module.exports.js");
      const middletest3 = await submoduler.import("./middletests/return.js");
      const middletest4 = await submoduler.import("./middletests/return-string.js");
      const middletest5 = await submoduler.import("./middletests/export-id-file.js");
      assert(typeof middletest1 === "object", "is not returning expectations about «ModulerV6.prototype.import» (31)");
      assert(middletest1.default === 701, "is not returning expectations about «ModulerV6.prototype.import» (32)");
      assert(middletest2 === 702, "is not returning expectations about «ModulerV6.prototype.import» (33)");
      assert(middletest3 === 703, "is not returning expectations about «ModulerV6.prototype.import» (34)");
      assert(middletest4 === "hello", "is not returning expectations about «ModulerV6.prototype.import» (35)");
      assert(middletest5 === "hello", "is not returning expectations about «ModulerV6.prototype.export(String:id,String:file)» (36)");
    }
    compilerV6._logger.log("Test 103 - ok - parte 2 - evaluación de ficheros");
    const main = await submoduler.import("./main.dist.js");
    assert(typeof main === "function", "is not returning a function here about «ModulerV6.prototype.import» (1)");
    const result = await main();
    Tests_of_import: {
      assert(Array.isArray(result), "is not returning 8 an array here about «ModulerV6.prototype.import» (2)");
      assert(result.length === 8, "is not returning 8 items in the array here about «ModulerV6.prototype.import» (3)");
      assert(typeof result[0] === "object", "is not returning expectations about «ModulerV6.prototype.import» (4)");
      assert(typeof result[0].f1 === "object", "is not returning expectations about «ModulerV6.prototype.import» (5)");
      assert(typeof result[0].f2 === "object", "is not returning expectations about «ModulerV6.prototype.import» (6)");
      assert(typeof result[1] === "object", "is not returning expectations about «ModulerV6.prototype.import» (7)");
      assert(typeof result[1][0] === "string", "is not returning expectations about «ModulerV6.prototype.import» (8)");
      assert(typeof result[1][1] === "string", "is not returning expectations about «ModulerV6.prototype.import» (9)");
      assert(typeof result[1][2] === "undefined", "is not returning expectations about «ModulerV6.prototype.import» (10)");
      assert(typeof result[2] === "number", "is not returning expectations about «ModulerV6.prototype.import» (11)");
      assert(typeof result[3] === "string", "is not returning expectations about «ModulerV6.prototype.import» (12)");
    }
    Tests_of_export: {
      assert(typeof result[4] === "string", "is not returning expectations about «ModulerV6.prototype.export» (20)");
      assert(typeof result[5] === "object", "is not returning expectations about «ModulerV6.prototype.export» (21)");
      assert(typeof result[6] === "number", "is not returning expectations about «ModulerV6.prototype.export» (22)");
      assert(typeof result[7] === "object", "is not returning expectations about «ModulerV6.prototype.export» (23)");
    }
    compilerV6._logger.log("Test 103 - ok - parte 3 - firmas de import y export");
  }

  compilerV6._logger.log("Test 103 ok");

};