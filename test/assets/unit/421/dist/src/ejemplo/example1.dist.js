module.exports = $moduler.lockFiles([
"@/dist/src/ejemplo/module1.dist.js",
  "@/dist/src/ejemplo/module2.dist.js",
  "@/dist/src/ejemplo/module3.dist.js"
]).until(Promise.fromCollection({
module1: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module1.dist.js", arguments[0], (function() {
    module.exports = $moduler.import([
  "./module1/submodule1.entry.js",
  "./module1/submodule2.entry.js",
  "./module1/submodule3.entry.js",
], function([submodule1, submodule2, submodule3]) {
  return { submodule1, submodule2, submodule3 };
});
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module1.dist.js")),
module2: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module2.dist.js", arguments[0], (function() {
    module.exports = $moduler.export("#Module2", [], function() {
  return {value:"two"};
});
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module2.dist.js")),
module3: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module3.dist.js", arguments[0], (function() {
    module.exports = $moduler.import(["#Module2"], function([Module2]) {
  return Module2.thirdModule = 300;
});
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module3.dist.js")),
 }));