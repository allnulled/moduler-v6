module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const localDevbin = DevBinaryV6.create(`${__dirname}/../assets/unit/401`);
  await localDevbin.compiler.files.deleteFile.try(localDevbin.moduler.normalizationOf("@/dist/www/t-404/ExampleT404.md"));
  await localDevbin.command(["touch", "--file", "@/src/www/t-404/ExampleT404.entry.js"]);
  assert(await localDevbin.compiler.files.hasFile(localDevbin.moduler.normalizationOf("@/dist/www/t-404/ExampleT404.md")), "Can generate md from entry in src to dist through touch (1)");
  const mdContent = await localDevbin.compiler.files.readFile("@/dist/www/t-404/ExampleT404.md");
  assert(typeof mdContent === "string", "Can generate md from entry in src to dist through touch (2)");

  assert(mdContent.includes("# Class ExampleT404"), "Can generate correctly indented markdown by comments (1)");
  assert(mdContent.includes("\n- Clase para test/demo de documentación markdown escalable"), "Can generate correctly indented markdown by comments (2)");
  assert(mdContent.includes("\n- Se inicia aquí, esto debería ser una recursiva correcta en markdown"), "Can generate correctly indented markdown by comments (3)");
  assert(mdContent.includes("\n- Método `ExampleT404.constructor`"), "Can generate correctly indented markdown by comments (4)");
  assert(mdContent.includes("\n   - Parámetro `base:any`"), "Can generate correctly indented markdown by comments (5)");
  assert(mdContent.includes("\n      - Uso: es el objeto inicial"), "Can generate correctly indented markdown by comments (6)");
  assert(mdContent.includes("\n   - Parámetro `options:Object={}`"), "Can generate correctly indented markdown by comments (7)");
  assert(mdContent.includes("\n      - Uso: las opciones del método"), "Can generate correctly indented markdown by comments (8)");
  assert(mdContent.includes("\n   - Proceso:"), "Can generate correctly indented markdown by comments (9)");
  assert(mdContent.includes("\n      - Paso 1. Hace algo."), "Can generate correctly indented markdown by comments (10)");
  assert(mdContent.includes("\n         - Paso 1.1. Hace algo más."), "Can generate correctly indented markdown by comments (11)");
  assert(mdContent.includes("\n            - Paso 1.1.1. Hace otro algo."), "Can generate correctly indented markdown by comments (12)");
  assert(mdContent.includes("\n            - Paso 1.1.2. Hace otro algo."), "Can generate correctly indented markdown by comments (13)");
  assert(mdContent.includes("\n            - Paso 1.1.3. Hace otro algo."), "Can generate correctly indented markdown by comments (14)");

  compilerV6._logger.log("Test 404 ok");
};