(function (mod) {
  if (typeof $moduler === 'undefined') {
    if (typeof window !== 'undefined') window['$moduler'] = mod.globalInstance;
    if (typeof global !== 'undefined') global['$moduler'] = mod.globalInstance;
  }
  if (typeof ModulerV6 === 'undefined') {
    if (typeof window !== 'undefined') window['ModulerV6'] = mod;
    if (typeof global !== 'undefined') global['ModulerV6'] = mod;
  }
  return ModulerV6;
  // if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  return $inject.source("./ModulerV6/ModulerV6.class.js");
}.call());