module.exports = async function({ assert, utils, modulerV6 }) {
  const output1 = await modulerV6.compile("test/assets/unit/001/main.js", { to: "data" });
  const output2 = await modulerV6.compile("test/assets/unit/001/main.js", { to: "code" });

  To_data: {
    modulerV6._assert(typeof output1 === "object", "can compile (to data) and return an object (point 1)");
    modulerV6._assert(typeof output1.js === "object", "can compile (to data) and return an object on .js (point 2)");
    modulerV6._assert(typeof output1.css === "object", "can compile (to data) and return an object on .css (point 3)");
    modulerV6._assert(typeof output1.md === "object", "can compile (to data) and return an object on .md (point 4)");
    modulerV6._assert(typeof output1.file === "string", "can compile (to data) and return a string on .js and return .file as string (point 5)");
  }
  
  To_code: {
    modulerV6._assert(typeof output2 === "object", "can compile (to code) and return an object (point 21)");
    modulerV6._assert(typeof output2.js === "string", "can compile (to code) and return a string on .js (point 22)");
    modulerV6._assert(typeof output2.css === "string", "can compile (to code) and return a string on .css (point 23)");
    modulerV6._assert(typeof output2.md === "string", "can compile (to code) and return a string on .md (point 24)");
    modulerV6._assert(typeof output2.file === "string", "can compile (to code) and return a string on .file (point 25)");
    modulerV6._assert(output2.js.length !== 0, "can compile (to code) and return a string on .js.length not in 0 (point 26)");
    modulerV6._assert(output2.js.includes('console.log("Injection 1!")'), "can compile (to code) and return a string on .js.length not in 0 (point 27)");
    modulerV6._assert(output2.js.includes('console.log("Injection 2!")'), "can compile (to code) and return a string on .js.length not in 0 (point 28)");
  }

}