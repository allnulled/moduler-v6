module.exports = (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ikk/node-module1.js", arguments[0], (function() {
    module.exports = 400;
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ikk/node-module1.js"));