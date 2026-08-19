module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("@/test/assets/unit/011/main.js", { to:"source" });
  
  Tests_preparatorios: {
    const content1 = await compilerV6.files.readFile("@/test/assets/unit/011/main.js");
    const parsification1 = await compilerV6.moduler.parser.forJs.parse(content1);
  }


  assert(typeof output.js === "string", "Can compile js files with $compiler.inject.module syntax (1)");
  assert(output.js.includes("// This is an injected header"), "Can compile js files with $compiler.inject.module syntax (2)");
  assert(output.js.includes("const module = {"), "Can compile js files with $compiler.inject.module syntax (3)");
  
  await compilerV6.files.writeFile("@/test/assets/unit/011/bundle.dist.js", await compilerV6.constructor.beautifyJs(output.js));

  const val1 = require(compilerV6.moduler.normalizationOf("@/test/assets/unit/011/bundle.dist.js"));

  assert(typeof val1 === "object", "Can compile js files with $compiler.inject.module syntax (4)");
  assert(typeof val1.AmbivalentModule0 === "string", "Can compile js files with $compiler.inject.module syntax (5)");
  assert(typeof val1.AmbivalentModule1 === "object", "Can compile js files with $compiler.inject.module syntax (6)");
  assert(val1.AmbivalentModule1 instanceof Promise, "Can compile js files with $compiler.inject.module syntax (7)");
  assert(await val1.AmbivalentModule1 === "abc", "Can compile js files with $compiler.inject.module syntax (8)");

  compilerV6._logger.log("Test 011 ok");

};