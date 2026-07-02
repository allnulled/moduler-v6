module.exports = function () {
  return Promise.all([
    $compiler.inject.source("./signatures/import-array-function.js"),
    $compiler.inject.source("./signatures/import-array.js"),
    $compiler.inject.source("./signatures/import-function.js"),
    $compiler.inject.source("./signatures/import-string.js"),
    $compiler.inject.source("./signatures/export-string-string.js"),
    $compiler.inject.source("./signatures/export-string-array.js"),
    $compiler.inject.source("./signatures/export-string-function.js"),
    $compiler.inject.source("./signatures/export-string-array-function.js"),
  ]);
};