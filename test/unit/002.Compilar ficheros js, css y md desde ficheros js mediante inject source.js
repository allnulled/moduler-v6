module.exports = async function({ assert, utils, modulerV6 }) {
  const output1 = await modulerV6.compile("test/assets/unit/002/main.js", { to: "code" });
  const output2 = await modulerV6.compile("test/assets/unit/002/main.css", { to: "code" });
  const output3 = await modulerV6.compile("test/assets/unit/002/main.md", { to: "code" });
  modulerV6._assert(typeof output1 === "object", "Can compile and produce an object (1)");
  modulerV6._assert(typeof output1.js === "string", "Can compile and produce a string on «output.js» (1.1)");
  modulerV6._assert(typeof output1.css === "string", "Can compile and produce a string on «output.css» (1.2)");
  modulerV6._assert(output1.js.length !== 0, "Can compile and produce a string on «output.js» with no empty content (1.2.1)");
  modulerV6._assert(output1.css.length !== 0, "Can compile and produce a string on «output.css» with no empty content (1.2.2)");
  modulerV6._assert(output1.md.length !== 0, "Can compile and produce a string on «output.md» with no empty content (1.2.3)");
  modulerV6._assert(!output1.js.includes("$v6.inject.source("), "Can compile and produce a string on «output.js» with no '$v6.inject.source(' strings in it (1.2.4)");
  modulerV6._assert(typeof output1.md === "string", "Can compile and produce a string on «output.md» (1.3)");
  modulerV6._assert(output1.css.includes("html.global"), "Can compile and produce a string on «output.css» with the expected injection (1.4)");
  modulerV6._assert(output1.md.includes("main.js y el main.css"), "Can compile and produce a string on «output.md» with the expected injection (1.5)");
  modulerV6._assert(typeof output2 === "object", "Can compile and produce an object (2)");
  modulerV6._assert(typeof output3 === "object", "Can compile and produce an object (3)");
}