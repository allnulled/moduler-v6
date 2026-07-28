module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/009/main.js", { to:"source" });
  
  Los_injects: {
    compilerV6.assert(typeof output.js === "string", "Can compile files using @injects syntax (1)");
    compilerV6.assert(output.js.includes('"include1"'), "Can compile files using @injects syntax (2)");
    compilerV6.assert(output.js.includes('"include2"'), "Can compile files using @injects syntax (3)");
  }

  compilerV6._logger.log("Test 009 ok");

};