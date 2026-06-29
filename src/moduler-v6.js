(function (mod) {
  if (typeof ModulerV6 !== 'undefined') return ModulerV6;
  if (typeof window !== 'undefined') window['ModulerV6'] = mod;
  if (typeof global !== 'undefined') global['ModulerV6'] = mod;
  // if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  return $inject.source("./ModulerV6/ModulerV6.class.js");
}.call());