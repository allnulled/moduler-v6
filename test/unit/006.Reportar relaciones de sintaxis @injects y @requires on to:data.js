module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/006/main.js", { to:"data" });
  
  Los_injects: {
    compilerV6._assert("@/test/assets/unit/006/framework/layout/header/rule/rule.css" in output.report.tree, "Can compile with to:data and get @injects relations (1)");
    compilerV6._assert("@/test/assets/unit/006/framework/layout/header/header.css" in output.report.tree, "Can compile with to:data and get @injects relations (2)");
    compilerV6._assert("@/test/assets/unit/006/framework/layout/layout.css" in output.report.tree, "Can compile with to:data and get @injects relations (3)");
    compilerV6._assert("@/test/assets/unit/006/framework/framework.css" in output.report.tree, "Can compile with to:data and get @injects relations (4)");
  }
  
  Los_requires: {
    compilerV6._assert("@/test/assets/unit/006/theme/theme1.css" in output.report.tree, "Can compile with to:data and get @requires relations (11)");
    compilerV6._assert("@/test/assets/unit/006/theme/plugins/plugin1.css" in output.report.tree, "Can compile with to:data and get @requires relations (12)");
  }

  compilerV6._logger.log("Test 006 ok");

};