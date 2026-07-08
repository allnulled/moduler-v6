const fs = require("fs");
const path = require("path");

const settings = {
  abortOnError: false,
  separateTests: true,
  debugSuccess: true,
  ignoredTestFiles: [
    // "--000.Inyectar el framework en los tests.js",
    "!001.Compilar recursivamente sintaxis más simple.js",
    "!002.Compilar ficheros js, css y md desde ficheros js mediante inject source.js",
    "!003.Bloquear inyecciones según sintaxis de fichero original.js",
    "!004.Reportar relaciones de sintaxis inject.source y @injects con to:data.js",
    "!!005.Reportar relaciones de sintaxis moduler.import y moduler.export con to:data.js",
    "!006.Reportar relaciones de sintaxis @injects y @requires on to:data.js",
    "!007.Compilar ficheros como strings con inject.string.js",
    "!008.Resolver rutas de forma común entre ModulerV6 y CompilerV6.js",
    "!100.Formateo de firmas de import y export - los métodos concretos de formateo.js",
    "!101.Métodos de ruta: rootdirOf, normalizationOf, basedirOf.js",
    "!103.Modular ficheros js, css y md con ModulerV6.js",
    "!104.CssManager puede compilar las directivas requires con ModulerV6 y sin CompilerV6.js",
    "!105.Indexar valores estáticos como secciones.js",
    "!106.Métodos de section: get, set, overwrite, fill, expand, delete, reset.js",
    "!107.Generar report tree desde los métodos de SectionsManager también.js",
    "!200.DevBinary tiene las firmas esperadas.js",
    "!201.DevBinary puede parsear y formatear argumentos tipo consola.js",
    "!202.DevBinary permite crear proyecto nuevo y lanzar comandos.js",
    // "--999.Cerrar todo.js",
  ]
};

const injection = {};

Object.assign(injection, {
  utils: {},
});

const AssertionError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
};

const main = async function () {
  const errors = [];
  const filenames = (await fs.promises.readdir(`${__dirname}/unit`)).filter(file => {
    return file.endsWith(".js") && !settings.ignoredTestFiles.includes(file);
  });
  console.log(`\x1b[36m  · FOUND ${filenames.length} tests:\x1b[0m${filenames.map((file, index) => "\n   - Test " + (index+1) + ". " + file)}`);
  Correr_tests_unitarios: {
    Iterating_tests:
    for (let index = 0; index < filenames.length; index++) {
      if(settings.separateTests) console.log("");
      const filename = filenames[index];
      const filepath = `${__dirname}/unit/${filename}`;
      let assertionCounter = 0;
      const customTestAssertFunction = function (condition, message) {
        assertionCounter++;
        if (!condition) {
          throw new AssertionError(`${message} | Arised in test «${filename}» | t${index + 1}.a${assertionCounter}`);
        } else {
          if (settings.debugSuccess) {
            console.log(`\x1b[35m   · ${filename} | t${index + 1}.a${assertionCounter} | ok: ${message}\x1b[0m`);
          }
        }
      };
      try {
        console.log(`\x1b[36m  · STARTED test ${filename}: ${index + 1}/${filenames.length} \x1b[0m`);
        const callback = require(filepath);
        const result = await callback({
          ...injection,
          injection,
          assert: customTestAssertFunction,
        });
        if (settings.debugSuccess) {
          console.log(`\x1b[32m  · PASSED test ${filename}: ${index + 1}/${filenames.length} \x1b[0m`);
        }
      } catch (error) {
        console.log(`\x1b[31m❌ · FAILED test ${filename}: ${index + 1}/${filenames.length} \x1b[0m`);
        console.log(error);
        errors.push({file:path.basename(filepath), error});
        if(settings.abortOnError) {
          break Iterating_tests;
        }
      }
    }
  }
  Mostrar_errores_finales: {
    if(settings.separateTests) console.log("");
    if (errors.length) {
      console.log(`\x1b[31m❌ Report errors of ${errors.length}/${filenames.length} failed tests:\x1b[0m`, errors);
    } else {
      console.log("\x1b[32m · All tests successfully passed\x1b[0m");
    }
  }
};

module.exports = main();