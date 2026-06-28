(function (mod) {
  if (typeof window !== 'undefined') window['CompilerV6'] = mod;
  if (typeof global !== 'undefined') global['CompilerV6'] = mod;
  if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  $inject.source("./text-parser-v1.js")
  const CompilerV6 = $inject.source("./CompilerV6/CompilerV6.class.js");
  return CompilerV6;
}.call());