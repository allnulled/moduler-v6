module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/010/main.html", { to:"source" });
  
  assert(typeof output.html === "string", "Can compile html files with @injects and $compiler.inject.source syntax (1)");
  assert(output.html.includes("Hello from atomized js!"), "Can compile html files with @injects and $compiler.inject.source syntax (2)");
  assert(output.html.includes("Hello from atomized css!"), "Can compile html files with @injects and $compiler.inject.source syntax (3)");
  assert(output.html.includes("<\\/script>"), "Can compile html files with @injects and $compiler.inject.source syntax escaping script html tag (4)");
  assert(output.html.includes("<\\/style>"), "Can compile html files with @injects and $compiler.inject.source syntax escaping style html tag (5)");

  compilerV6._logger.log("Test 010 ok");

};