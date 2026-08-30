module.exports = Promise.fromObject({
  a: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ikk/node-module2a.js", arguments[0], (function() {
    module.exports = 1;
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ikk/node-module2a.js")),
  b: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ikk/node-module2b.js", arguments[0], (function() {
    module.exports = 2;
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ikk/node-module2b.js")),
  c: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ikk/node-module2c.js", arguments[0], (function() {
    module.exports = 3;
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ikk/node-module2c.js")),
});