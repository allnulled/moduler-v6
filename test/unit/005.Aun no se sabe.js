module.exports = async function ({ assert, utils, modulerV6 }) {

  const output = await modulerV6.compile("test/assets/unit/004/main.js", { to:"data" });

  modulerV6._assert(typeof output.report === "object", "Can compile with {to:'data'} and return an object on .report (1)");
  
  // modulerV6._debug(output);
  
  modulerV6._logger.log("Test 005 ok");

};