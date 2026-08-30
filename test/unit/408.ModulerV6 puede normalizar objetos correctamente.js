module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const out1 = devBinaryV6.moduler.toolkit.normalizeObject({}, {
    option1: {
      default: 800 + 1,
      validate: it => typeof it === "number" || "Parameter «option1» must be a number or empty",
      format: it => it * 2,
    },
    option2: {
      default: () => 500,
    },
    option3: {
      default: () => () => 500,
    },
  });
  
  assert(out1.option1 === 1602, "Can normalize object through property default + validate + format (1)")
  assert(out1.option2 === 500, "Can normalize object through default callback (2)")
  assert(out1.option3() === 500, "Can normalize object through default callback returning a callback (3)")

  compilerV6.assertThrows(() => {
    devBinaryV6.moduler.toolkit.normalizeObject({ option4: "this text will arise validation error" }, {
      option4: {
        default: 0,
        validate: it => typeof it === "number" || "Parameter «option4» must be a number or empty",
      },
    });
  }, "Can normalize object through validate callback (5)", error => error.message.includes("Parameter «option4» must be a number"));

  compilerV6._logger.log("Test 408 ok");
};