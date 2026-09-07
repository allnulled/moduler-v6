module.exports = $moduler.import([
  "./module1/submodule1.entry.js",
  "./module1/submodule2.entry.js",
  "./module1/submodule3.entry.js",
], function([submodule1, submodule2, submodule3]) {
  return { submodule1, submodule2, submodule3 };
});