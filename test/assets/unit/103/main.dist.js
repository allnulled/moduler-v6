module.exports = function () {
  return Promise.all([
    $localModuler.import(
      ["@/signatures/file1.js", "@/signatures/file2.js"],
      (f1, f2) => {
        return { f1, f2 };
      },
    ),
    $localModuler.import(["@/signatures/file1.js", "@/signatures/file2.js"]),
    $moduler.import(() => {
      return 600;
    }),
    $localModuler.import("@/signatures/file1.js"),
    $localModuler.export("#export-string-string", "@/signatures/file1.js"),
    $localModuler.export("#export-string-array", [
      "@/signatures/file1.js",
      "@/signatures/file2.js",
    ]),
    $localModuler.export("#export-string-function", () => {
      return 500;
    }),
    $localModuler.export(
      "#export-string-array-function",
      ["@/signatures/file1.js", "@/signatures/file2.js"],
      ([f1, f2]) => {
        return { f1, f2 };
      },
    ),
  ]);
};
