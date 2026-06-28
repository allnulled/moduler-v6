module.exports = async function({ assert, utils, compilerV6 }) {
  const output1 = await compilerV6.compile("test/assets/unit/001/main.js", { to: "data" });
  const output2 = await compilerV6.compile("test/assets/unit/001/main.js", { to: "code" });

  To_data: {
    compilerV6._assert(typeof output1 === "object", "can compile (to data) and return an object (point 1)");
    compilerV6._assert(typeof output1.report.tree === "object", "can compile (to data) and return an object on .report.tree (point 2)");
    compilerV6._assert(typeof output1.file === "string", "can compile (to data) and return a string on .file as string (point 5)");
  }
  
  To_code: {
    compilerV6._assert(typeof output2 === "object", "can compile (to code) and return an object (point 21)");
    compilerV6._assert(typeof output2.js === "string", "can compile (to code) and return a string on .js (point 22)");
    compilerV6._assert(typeof output2.css === "string", "can compile (to code) and return a string on .css (point 23)");
    compilerV6._assert(typeof output2.md === "string", "can compile (to code) and return a string on .md (point 24)");
    compilerV6._assert(typeof output2.file === "string", "can compile (to code) and return a string on .file (point 25)");
    compilerV6._assert(output2.js.length !== 0, "can compile (to code) and return a string on .js.length not in 0 (point 26)");
    compilerV6._assert(output2.js.includes('console.log("Injection 1!")'), "can compile (to code) and return a string on .js.length not in 0 (point 27)");
    compilerV6._assert(output2.js.includes('console.log("Injection 2!")'), "can compile (to code) and return a string on .js.length not in 0 (point 28)");
  }
  
  compilerV6._logger.log("Test 001 ok");

}