module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/006/main.js", { to:"data" });
  
  compilerV6._debug(output);

  compilerV6._logger.log("Test 006 ok");

};