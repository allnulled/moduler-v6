/**
 * @name CompilerV6.prototype._compileAsInjectModule
 * @type 
 * @description 
 */
_compileAsInjectModule(compilationFile, compilationProcess, { token, tokenIndex }) {
  return this._compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex, }, {
    modifySource: function(source) {
      return [
        `(() => {`,
        `let __firstHolder = {};`,
        `let __originalHolder = __firstHolder;`,
        `const module = {`,
        `  get exports() {`,
        `    return __originalHolder;`,
        `  },`,
        `  set exports(value) {`,
        `    __originalHolder = value;`,
        `  }`,
        `};`,
        `const exports = module.exports;`,
        `const __result = (() => {`,
        source,
        `})();`,
        `let __output = undefined;`,
        `const __returnsUndefined = () => typeof __result === "undefined";`,
        `const __isSameEmptyObject = () => (module.exports === __firstHolder) && ((Object.keys(__firstHolder).length === 0));`,
        `if(!__returnsUndefined()) {`,
        `  __output = module.exports = __result;`,
        `} else if(!__isSameEmptyObject()) {`,
        `  __output = module.exports;`,
        `}`,
        `return __output;`,
        `})()`,
      ].join("\n");
    },
  });
}