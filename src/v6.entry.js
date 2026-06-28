V6_API: {

  $inject.source("./common-v6.js")

  $inject.source("./compiler-v6.js")

  $inject.source("./compiler-v6.js")

  V6_injection: {
    let V6 = undefined;
    Definition: {
      V6 = class V6 {
        static create(...args) {
          return new this(...args);
        }
        constructor(basedir) {
          this.compiler = typeof CompilerV6 === "function" ? CompilerV6.create(basedir) : null;
          this.compiler = CompilerV6.create(basedir);
        }
        compile = {
          js: (...args) => this.compiler.compileJs(...args),
          css: (...args) => this.compiler.compileCss(...args),
        }
        define = {
          js: (...args) => this.compiler.importJs(...args),
          css: (...args) => this.compiler.importCss(...args),
        }
      }
    }
    Exportation: {
      if (typeof window !== "undefined") window.V6 = V6;
      if (typeof global !== "undefined") global.V6 = V6;
      if (typeof module !== "undefined") module.exports = V6;
    }
  }
}