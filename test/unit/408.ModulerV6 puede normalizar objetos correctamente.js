module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const out1 = devBinaryV6.moduler.toolkit.normalizeObject({}, {
    option1: {
      default: 800 + 1,
      validate: it => 
        (typeof it === "number" || "Parameter «option1» must be a number or empty") &&
        (true) &&
        (true) &&
        (true) &&
        (true),
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

  Puede_usar_validacion_recursiva: {
    const out2 = devBinaryV6.moduler.toolkit.normalizeObject({
      // @OK: vacío al principio, pero...
    }, {
      nombre: {
        // Esto lo necesitamos para cubrir todos los casos por defecto:
        default: {},
        // Y ESTE ES EL VALIDATE QUE ESTAMOS TESTEANDO:
        validate: {
          personal: {
            default: "Carlos",
            validate: it => 
              (typeof it === "string" || "Property «nombre.personal» must be string") &&
              (it.startsWith("Carlos") || "Property «nombre.personal» must start with «Carlos»"),
          },
          apellidos: {
            default: "Jim Hern",
            validate: it => typeof it === "string" || "Property «nombre.apellidos» must be string",
          }
        },
        format: it => {
          it.version = "1.0";
        }
      }
    });
    devBinaryV6.assert(out2.nombre.personal === "Carlos", "Can normalize object recursively (1)");
    devBinaryV6.assert(out2.nombre.apellidos === "Jim Hern", "Can normalize object recursively (2)");
  };

  compilerV6._logger.log("Test 408 ok");
};