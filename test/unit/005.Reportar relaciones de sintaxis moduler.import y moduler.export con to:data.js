module.exports = async function ({ assert, utils, compilerV6 }) {

  const output = await compilerV6.compile("test/assets/unit/005/app.js", { to:"data" });

  compilerV6._assert(typeof output.report === "object", "Can compile with {to:'data'} and return an object on .report (1)");
  compilerV6._assert(typeof output.report.tree === "object", "Can compile with {to:'data'} and return an object on .report.tree (2)");
  compilerV6._assert(typeof output.report.tree["@/test/assets/unit/005/app.js"] === "object", "Can compile with {to:'data'} and return an object on .report.tree.<file> (3)");
  Test_de_reporte_de_sintaxis_moduler_import_export: {
    compilerV6._assert(Object.keys(output.report.tree).length > 1, "Can compile with {to:'data'} and return an object on .report.tree.<file> with multiple keys on .report.tree when dependencies are found (4)");
    compilerV6._assert(Object.keys(output.report.tree["@/test/assets/unit/005/app.js"]).length !== 0, "Can compile with {to:'data'} and return an object on .report.tree.<file> with multiple keys on .report.tree.<file> when dependencies are found (5)");
    compilerV6._assert("@/test/assets/unit/005/app.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (6)");
    compilerV6._assert("@/test/assets/unit/005/payload.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (100)");
    compilerV6._assert("@/test/assets/unit/005/imported-1.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (101)");
    compilerV6._assert("@/test/assets/unit/005/imported-1.css" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (102)");
    compilerV6._assert("@/test/assets/unit/005/imported-1.md" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (103)");
    compilerV6._assert("@/test/assets/unit/005/framework-1.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (104)");
    compilerV6._assert("@/test/assets/unit/005/framework-2.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (105)");
    compilerV6._assert("@/test/assets/unit/005/framework-3.js" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (106)");
    compilerV6._assert("@/test/assets/unit/005/framework-2.css" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (107)");
    compilerV6._assert("@/test/assets/unit/005/framework-3.css" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (108)");
    compilerV6._assert("@/test/assets/unit/005/framework-3.md" in output.report.tree, "Can compile with {to:'data'} and return $moduler.imported/exported dependencies (109)");
    compilerV6._assert(output.report.tree["@/test/assets/unit/005/app.js"]["426-457"].dependenciesOf.length > 0, `Can compile with {to:'data'} and return dependenciesOf (7)`);
  }
  No_captura_exports_con_primer_string_sin_extension_pq_son_ids_no_files: {
    compilerV6._assert(!("@/test/assets/unit/005/app" in output.report.tree), `Can compile with {to:'data'} and return dependenciesOf (8)`);
  }
  
  compilerV6._logger.log("Test 005 ok");

};