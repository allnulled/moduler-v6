(function (mod) {
  if (typeof window !== 'undefined') window['ModulerV6'] = mod;
  if (typeof global !== 'undefined') global['ModulerV6'] = mod;
  if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  $inject.source("./text-parser-v1.js")
  const ModulerV6 = $inject.source("./ModulerV6/ModulerV6.class.js");
  return ModulerV6;
}.call());