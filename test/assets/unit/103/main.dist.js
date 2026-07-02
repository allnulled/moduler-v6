module.exports = function () {
  return Promise.all([
    $moduler.import(
      ["./signatures/file1.js", "./signatures/file2.js"],
      (f1, f2) => {
        return { f1, f2 };
      },
    ),
    $moduler.import(["./signatures/file1.js", "./signatures/file2.js"]),
    $moduler.import(() => {
      return 600;
    }),
    $moduler.import("./signatures/file1.js"),
    $moduler.export("#export-string-string", "./signatures/file1.js"),
    $moduler.export("#export-string-array", [
      "./signatures/file1.js",
      "./signatures/file2.js",
    ]),
    $moduler.export("#export-string-function", () => {
      return 500;
    }),
    $moduler.export(
      "#export-string-array-function",
      ["./signatures/file1.js", "./signatures/file2.js"],
      ([f1, f2]) => {
        return { f1, f2 };
      },
    ),
  ]);
};
