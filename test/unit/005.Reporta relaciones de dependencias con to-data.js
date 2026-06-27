module.exports = async function ({ assert, utils, modulerV6 }) {

  const output = await modulerV6.compile("test/assets/unit/005/app.js", { to:"data" });

  modulerV6._assert(typeof output.report === "object", "Can compile with {to:'data'} and return an object on .report (1)");
  modulerV6._assert(typeof output.report.tree === "object", "Can compile with {to:'data'} and return an object on .report.tree (2)");
  modulerV6._assert(typeof output.report.tree["@/test/assets/unit/005/app.js"] === "object", "Can compile with {to:'data'} and return an object on .report.tree.<file> (3)");
  modulerV6._assert(Object.keys(output.report.tree["@/test/assets/unit/005/app.js"]).length !== 0, "Can compile with {to:'data'} and return an object on .report.tree.<file> with multiple keys when dependencies are found (4)");
  
  //modulerV6._debug(output);
  
  modulerV6._logger.log("Test 005 ok");

};