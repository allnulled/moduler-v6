module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/007/main.js", { to:"source" });
  
  Los_injects: {
    compilerV6._assert(typeof output.js === "string", "Can compile files as strings using inject.string and to:source (1)");
    compilerV6._assert(output.js.includes('"como un string de js"'), "Can compile files as strings using inject.string and to:source (2)");
    compilerV6._assert(output.js.includes("con la sintaxis de inject"), "Can compile files as strings using inject.string and to:source (3)");
  }

  compilerV6._logger.log("Test 006 ok");

};