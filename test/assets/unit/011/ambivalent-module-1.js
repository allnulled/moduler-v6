module.exports = $moduler.import([
  "@/test/assets/unit/011/a.js",
  "@/test/assets/unit/011/b.js",
  "@/test/assets/unit/011/c.js",
], function([a,b,c]) {
  return a + b + c;
});