module.exports = async function({ assert, utils, compilerV6 }) {
  const output1 = await compilerV6.compile("./test/assets/unit/002/main.js", { to: "code" });
  const output2 = await compilerV6.compile("./test/assets/unit/002/main.css", { to: "code" });
  const output3 = await compilerV6.compile("./test/assets/unit/002/main.md", { to: "code" });
  compilerV6.assert(typeof output1 === "object", "Can compile and produce an object (1)");
  compilerV6.assert(typeof output1.js === "string", "Can compile and produce a string on «output.js» (1.1)");
  compilerV6.assert(typeof output1.css === "string", "Can compile and produce a string on «output.css» (1.2)");
  compilerV6.assert(output1.js.length !== 0, "Can compile and produce a string on «output.js» with no empty content (1.2.1)");
  compilerV6.assert(output1.css.length !== 0, "Can compile and produce a string on «output.css» with no empty content (1.2.2)");
  compilerV6.assert(output1.md.length !== 0, "Can compile and produce a string on «output.md» with no empty content (1.2.3)");
  compilerV6.assert(!output1.js.includes("$compiler.inject.source("), "Can compile and produce a string on «output.js» with no '$compiler.inject.source(' strings in it (1.2.4)");
  compilerV6.assert(typeof output1.md === "string", "Can compile and produce a string on «output.md» (1.3)");
  compilerV6.assert(output1.css.includes("html.global"), "Can compile and produce a string on «output.css» with the expected injection (1.4)");
  compilerV6.assert(output1.md.includes("main.js y el main.css"), "Can compile and produce a string on «output.md» with the expected injection (1.5)");
  compilerV6.assert(typeof output2 === "object", "Can compile and produce an object (2)");
  compilerV6.assert(typeof output3 === "object", "Can compile and produce an object (3)");
  compilerV6._logger.log("Test 002 ok");
}