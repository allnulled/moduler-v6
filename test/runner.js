const fs = require("fs");
const path = require("path");

const settings = {
  separateTests: false,
  debugSuccess: true,
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
  const filenames = (await fs.promises.readdir(`${__dirname}/unit`)).filter(file => file.endsWith(".js"));
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
        errors.push(error);
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