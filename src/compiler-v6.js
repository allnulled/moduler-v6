/**
 * @name compiler-v6
 * @type library entrypoint
 * @description ...
 */
(function (mod) {
  if (typeof CompilerV6 !== 'undefined') return CompilerV6;
  if (typeof window !== 'undefined') window['CompilerV6'] = mod;
  if (typeof global !== 'undefined') global['CompilerV6'] = mod;
  // if (typeof module !== 'undefined') module.exports = mod;
})(function () {
  $inject.source("./moduler-v6.js")
  const CompilerV6 = $inject.source("./CompilerV6/CompilerV6.class.js");
  return CompilerV6;
}.call());