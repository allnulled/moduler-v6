module.exports = $moduler.lockFiles([
"@/dist/src/ejemplo/module1/domains/domain1.dist.js",
  "@/dist/src/ejemplo/module1/domains/domain2.dist.js",
  "@/dist/src/ejemplo/module1/domains/domain3.dist.js"
]).until(Promise.fromCollection({
domain1: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module1/domains/domain1.dist.js", arguments[0], (function() {
    module.exports = 100;
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module1/domains/domain1.dist.js")),
domain2: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module1/domains/domain2.dist.js", arguments[0], (function() {
    module.exports = 200;
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module1/domains/domain2.dist.js")),
domain3: (function({ module, exports, $moduler }) {
  return $moduler.releaseFile("@/dist/src/ejemplo/module1/domains/domain3.dist.js", arguments[0], (function() {
    module.exports = 300;
  }).call(this));
}).call(this, $moduler.reserveFile("@/dist/src/ejemplo/module1/domains/domain3.dist.js")),
 }));