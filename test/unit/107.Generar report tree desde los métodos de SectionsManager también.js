module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const subcompiler = compilerV6._cloneForFile(`${__dirname}/../assets/unit/107/main.js`);

  const output = await subcompiler.compile("./main.js", { to: "data" });

  assert("@/test/assets/unit/107/main.js" in output.report.tree, "Dependencies static analysis is not working as expected (1)");
  assert("@/test/assets/unit/107/example-2.js" in output.report.tree, "Dependencies static analysis is not working as expected (2)");
  assert("@/test/assets/unit/107/example-4.js" in output.report.tree, "Dependencies static analysis is not working as expected (3)");
  assert("@/test/assets/unit/107/example-3.js" in output.report.tree, "Dependencies static analysis is not working as expected (4)");
  assert("@/test/assets/unit/107/example-1.js" in output.report.tree, "Dependencies static analysis is not working as expected (5)");

  // @ABANDONED: Esta tarea fue abandonada a favor de usar el # para secciones, pero el report.tree solo hable de los ficheros
  // @ABANDONED: La razón es que es una complicación en el código, principalmente
  // @ABANDONED: y secundariamente que este tree puede hablar de APIs o estados internos de la aplicación
  // 
  // @FROMHERE: Seguir aquí, si escaece.
  // @STATE: Están los tokens solo de los imports y exports que hablan de ficheros: en el file o en el dependencies.
  // @FILES: Los siguientes ficheros están implicados en esto:
  // src/ModulerV6/prototype._formatImportParameters.js - no cae aquí pero pasa por aqui
  // src/ModulerV6/prototype._formatExportParameters.js - no cae aquí pero pasa por aqui
  // src/CompilerV6/prototype._compileAsModulerExport.js - en el Compile_all_targets cae
  // src/CompilerV6/prototype._compileAsModulerImport.js - en el Compile_all_targets cae
  // @FROMHERE: Lo que hay que conseguir es que el parameter._id se utilice en ese bucle, que es el que va a ir decorando el report.tree
  // @FROMHERE: Pero es eso, ahora las decoraciones no serían solamente file
  // console.log(output.report.tree);
  const tokens1 = output.report.tree["@/test/assets/unit/107/main.js"];
  for(let tokenPosition in tokens1) {
    const tokenData = tokens1[tokenPosition];
    // console.log("Token at", tokenPosition + ":", tokenData);
  }

  assert(output.report.tree["@/test/assets/unit/107/main.js"]["117-168"].syntax === "Moduler Import", "Can report runtime dependencies only if they are based on files (1)");
  assert(output.report.tree["@/test/assets/unit/107/main.js"]["81-113"].syntax === "Moduler Import", "Can report runtime dependencies only if they are based on files (2)");
  assert(output.report.tree["@/test/assets/unit/107/main.js"]["172-225"].syntax === "Moduler Export", "Can report runtime dependencies only if they are based on files (3)");
  assert(3 === Object.keys(output.report.tree["@/test/assets/unit/107/main.js"]).length, "Can report runtime dependencies only if they are based on files (99)");

  compilerV6._logger.log("Test 107 ok");

};