module.exports = function () {
  return Promise.all([
    $moduler.export(
      "#export-string-array-function",
      ["./file1.js", "./file2.js"],
      (f1, f2) => {
        return { f1, f2 };
      },
    ),
    $moduler.export("#export-string-array", ["./file1.js", "./file2.js"]),
    $moduler.export("#export-string-function", () => {
      return 500;
    }),
    $moduler.export("#export-string-string", "./file1.js"),
    $moduler.import(["./file1.js", "./file2.js"], (f1, f2) => {
      return { f1, f2 };
    }),
    $moduler.import(["./file.js", "./file2.js"]),
    $moduler.import(() => {
      return 600;
    }),
    $moduler.import("./file.js"),
  ]);
};
