// This is an injected header;
module.exports = {
  AmbivalentModule0: "ok",
  AmbivalentModule1: (() => {
    let __firstHolder = {};
    let __originalHolder = __firstHolder;
    const module = {
      get exports() {
        return __originalHolder;
      },
      set exports(value) {
        __originalHolder = value;
      },
    };
    const exports = module.exports;
    const __result = (() => {
      module.exports = $moduler.import(
        [
          "@/test/assets/unit/011/a.js",
          "@/test/assets/unit/011/b.js",
          "@/test/assets/unit/011/c.js",
        ],
        function ([a, b, c]) {
          return a + b + c;
        },
      );
    })();
    let __output = undefined;
    const __returnsUndefined = () => typeof __result === "undefined";
    const __isSameEmptyObject = () =>
      module.exports === __firstHolder &&
      Object.keys(__firstHolder).length === 0;
    if (!__returnsUndefined()) {
      __output = module.exports = __result;
    } else if (!__isSameEmptyObject()) {
      __output = module.exports;
    }
    return __output;
  })(),
};
