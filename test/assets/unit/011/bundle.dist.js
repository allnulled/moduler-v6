// This is an injected header;
module.exports = {
  AmbivalentModule0: "ok",
  AmbivalentModule1: function ({ module, exports }) {
    return $moduler.releaseFile(
      "@/test/assets/unit/011/ambivalent-module-1.js",
      arguments[0],
      function () {
        module.exports = $moduler.import(
          [
            "@/test/assets/unit/011/a.js",
            "@/test/assets/unit/011/b.js",
            "@/test/assets/unit/011/c.js",
          ],
          function ([a, b, c]) {
            return a + b + c;
          },
        );
      }.call(this),
    );
  }.call(
    this,
    $moduler.reserveFile("@/test/assets/unit/011/ambivalent-module-1.js"),
  ),
};
