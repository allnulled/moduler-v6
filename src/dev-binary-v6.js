(function (mod) {
  if (typeof $devbin === 'undefined') {
    if (typeof window !== 'undefined') window['$devbin'] = mod.globalInstance;
    if (typeof global !== 'undefined') global['$devbin'] = mod.globalInstance;
  }
  if (typeof DevBinaryV6 === 'undefined') {
    if (typeof window !== 'undefined') window['DevBinaryV6'] = mod;
    if (typeof global !== 'undefined') global['DevBinaryV6'] = mod;
  }
  return DevBinaryV6;
  // if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  $inject.source("./compiler-v6.js");
  return $inject.source("./DevBinaryV6/DevBinaryV6.class.js");
}.call());