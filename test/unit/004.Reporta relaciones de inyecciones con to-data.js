module.exports = async function ({ assert, utils, modulerV6 }) {

  const output = await modulerV6.compile("test/assets/unit/004/main.js", { to:"data" });

  // modulerV6._debug(output);

  modulerV6._assert(typeof output.report === "object", "Can compile with {to:'data'} and return an object on .report (-1)");
  modulerV6._assert(typeof output.report.tree === "object", "Can compile with {to:'data'} and return an object on .report.tree (-2)");
  modulerV6._assert(Object.keys(output.report.tree).length !== 0, "Can compile with {to:'data'} and return an object on .report.tree with multiple keys in it (-5)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib3/lib3.js"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (1)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib3/lib3.md"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (2)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib3/lib3.css"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (3)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib2/lib2.js"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (4)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib2/lib2.css"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (5)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/004/lib1.js"] === "object", "Can compile with {to:'data'} and return expected files in .report.tree (6)");

  const references = {};
  let counter = 0;
  for(let file in output.report.tree) {
    references[file] = {};
    const tokens = output.report.tree[file];
    for(let range in tokens) {
      const token = tokens[range];
      const entry = token.referenceOf.rootpath;
      references[file][range] = entry;
      modulerV6._assert(entry in output.report.tree, `Can find every referenceOf in the same object when the case is so (counter: ${counter++})`);
    }
  }

  modulerV6._assert(output.report.tree["@/test/assets/unit/004/lib3/lib3.js"]["37-61"].referenceOf.rootpath === "@/test/assets/unit/004/lib3/lib3.md", "Can find lib3.md as reference of lib3.js");

  modulerV6._logger.log("Test 004 ok");

};