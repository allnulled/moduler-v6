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
  return class ModulerV6 {
  /**
   * @name ModulerV6
   * @type class
   * @description ...
   */
  /**
 * @name ModulerV6.AssertionError
 * @type 
 * @description 
 */
static AssertionError = class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
}
  /**
 * @name ModulerV6.CssManager
 * @type 
 * @description 
 */
static CssManager = /**
 * @name ModulerV6.CssManager
 * @type 
 * @description 
 */
class CssManager {
  /**
 * @name ModulerV6.CssManager.constructor
 * @type 
 * @description 
 */
constructor(moduler, cloneOfCssManager = null) {
  this.trace("constructor", arguments);
  this.assert(typeof moduler === "object", `Parameter «moduler» must be object on «CssManager.constructor»`);
  this.assert(moduler instanceof ModulerV6, `Parameter «moduler» must be instance of ModulerV6 on «CssManager.constructor»`);
  /**
 * @name ModulerV6.CssManager.prototype.moduler
 * @type 
 * @description 
 */
this.moduler = moduler;
  /**
 * @name ModulerV6.CssManager.prototype.sheets
 * @type 
 * @description 
 */
this.sheets = {};
  /**
 * @name ModulerV6.CssManager.prototype.parser
 * @type 
 * @description 
 */
this.parser = TextParserV1.create(ModulerV6.defaultGrammars.forCssOnRuntime);
  /**
 * @name ModulerV6.CssManager.prototype._isTracing
 * @type 
 * @description 
 */
this._isTracing = true;
}
  /**
 * @name ModulerV6.CssManager.prototype._addRecursively
 * @type 
 * @description 
 */
async _addRecursively(fileBrute, addEvent = { sheets: {} }) {
  let file, source, tokens;
  Normalize_filepath: {
    file = this.moduler.rootdirOf(fileBrute);
  }
  Return_cached_if_so: {
    if (file in this.sheets) {
      return this.sheets[file];
    }
    if(file in addEvent.sheets) {
      return addEvent.sheets[file];
    }
  }
  Start_cache: {
    addEvent.sheets[file] = { priority: undefined };
  }
  Load_source: {
    source = await this._fetchSheet(file);
    addEvent.sheets[file].source = source;
  }
  Extract_tokens: {
    tokens = await this._extractRequires(source, file);
    addEvent.sheets[file].tokens = tokens.formatted;
  }
  Load_requires: {
    const loadedRequires = [];
    for (let index = 0; index < tokens.formatted.length; index++) {
      const requiresToken = tokens.formatted[index];
      const requiresPathBrute = JSON.parse(requiresToken.inner);
      const requiresPath = this.moduler.rootdirOf(requiresPathBrute);
      loadedRequires.push(requiresPath);
      const submoduler = this.cloneForFile(requiresPath);
      if (!(requiresPath in this.sheets)) {
        await submoduler.css._addRecursively(requiresPath);
      }
    }
    addEvent.sheets[file].requires = loadedRequires;
  }
  Define_priority_now: {
    addEvent.sheets[file].priority = Object.keys(this.sheets).length;
  }
  return Object.assign(this.sheets, addEvent.sheets);
}
  /**
 * @name ModulerV6.CssManager.prototype._fetchSheet
 * @type 
 * @description 
 */
_fetchSheet(file) {
  return this.moduler._readPath(file);
}
  /**
 * @name ModulerV6.CssManager.prototype._extractRequires
 * @type 
 * @description 
 */
_extractRequires(source, file) {
  const matches = this.parser.parse(source);
  matches.file = {
    original: file,
    absolute: this.moduler.normalizationOf(file),
    basedir: this.moduler.basedir,
    based: this.moduler.basedirOf(file),
    rootdir: this.moduler.rootdir,
    rooted: this.moduler.rootdirOf(file),
  };
  return matches;
}
  /**
 * @name ModulerV6.CssManager.prototype.trace
 * @type 
 * @description 
 */
trace(method, args = [], forceLog = false) {
  if(this._isTracing || forceLog) {
    console.log(`[css-manager][${method}] ${args.length} args: ${[...args].map(arg => typeof arg).join(",")}`);
  }
}
  /**
 * @name ModulerV6.CssManager.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  if(!condition) throw new Error(message);
}
  /**
 * @name ModulerV6.CssManager.prototype.add
 * @type 
 * @description 
 */
async add(input) {
  let output = undefined;
  if(typeof input === "string") {
    output = await this._addRecursively(input);
  } else if(Array.isArray(input)) {
    output = [];
    for(let index=0; index<input.length; index++) {
      const item = input[index];
      this.moduler.assert(typeof item === "string", `Parameter «arguments[0][${index}]» must be string too on «CssManager.prototype.add»`);
      const result = await this._addRecursively(item);
      output.push(result);
    }
  } else {
    throw new Error(`Parameter «arguments[0]» can only be string or array on «CssManager.prototype.add»`);
  }
  return output;
}
  /**
 * @name ModulerV6.CssManager.prototype.remove
 * @type 
 * @description 
 */
remove(file) {
  
}
  /**
 * @name ModulerV6.CssManager.prototype.synchronize
 * @type 
 * @description 
 */
synchronize() {
  let outputCss = "";
  const sorted = this.getSortedSheets().map(sheet => {
    return `\n/*!file:${JSON.stringify(sheet.id)}*/\n${sheet.source}`;
  }).join("\n").replace(/\/\*\@requires\:/g, "/*!requires:");
  return sorted;
}
  /**
 * @name ModulerV6.CssManager.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(file) {
  const submoduler = this.moduler.cloneForFile(file);
  Synchronized_inheritance_between_css_managers: {
    // @ATENTION: Este es el hack que hace que todo vaya ok:
    submoduler.css.sheets = this.sheets;
  }
  return submoduler;
}
  /**
 * @name ModulerV6.CssManager.prototype.getSortedSheets
 * @type 
 * @description 
 */
getSortedSheets() {
  return Object.keys(this.sheets).map(id => {
    return {
      id,
      ...this.sheets[id]
    }
  }).sort((a, b) => {
    return a.priority - b.priority;
  });
}
}
  /**
 * @name ModulerV6.static.SectionsManager
 * @type 
 * @description 
 */
static SectionsManager = class SectionsManager {

  constructor(root = {}) {
    this.root = root;
  }

  _assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  _isPropertoid(it) {
    return ["object", "function"].includes(typeof it);
  }

  isNull(it) {
    return it === null;
  }

  _hasKey(obj, prop) {
    return prop in obj;
  }

  _splitPropertyPath(path) {
    return path.split("/").filter(Boolean);
  }

  _getPropertyAndHolder(path, throwOnMissing = true, commingFromMethod = "_getPropertyAndHolder") {
    const keys = this._splitPropertyPath(path);
    const last = keys.pop();
    let obj = this.root;
    let counter = -1;
    for (const key of keys) {
      counter++;
      if (this.isNull(obj[key]) || !this._isPropertoid(obj[key])) {
        if (throwOnMissing) {
          throw new Error(`Missing iterable intermediate property «${key}» at index «${counter}» of path «${path}» on «SectionsManager.prototype._getPropertyAndHolder called from method «SectionsManager.prototype.${commingFromMethod}»`);
        }
        obj[key] = {};
      }
      obj = obj[key];
    }
    return { obj, last };
  }

  has(path) {
    // @DESCRIPTION: devuelve true si está definida la ruta de propiedad, false si no
    const ref = this._getPropertyAndHolder(path, false, "has");
    if(!this._isPropertoid(ref.obj)) return false;
    return ref.last in ref.obj;
  }

  get(path, defaultValue = Error) {
    // @DESCRIPTION: o devuelve el valor, o el valor por defecto, que en caso de ser Error, lanza un error, que es la conducta por defecto.
    const ref = this._getPropertyAndHolder(path, false, "get");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.get»`);
    if (!this._hasKey(ref.obj, ref.last)) {
      if (defaultValue === Error) throw new Error(`Could not find section property «${ref.last}» in path «${path}» on «SectionsManager.prototype.get»`);
      return defaultValue;
    }
    return ref.obj[ref.last];
  }

  set(path, value) {
    // @DESCRIPTION: sobreescribe la propiedad de la ruta con el valor
    const ref = this._getPropertyAndHolder(path, false, "set");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.set»`);
    return ref.obj[ref.last] = value;
  }

  initialize(path, value) {
    // @DESCRIPTION: rellena la propiedad de la ruta con el valor si está sin definir o en su defecto devuelve la definición anterior
    const ref = this._getPropertyAndHolder(path, false, "initialize");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.initialize»`);
    if (this._hasKey(ref.obj, ref.last)) return ref.obj[ref.last];
    return ref.obj[ref.last] = value;
  }

  overwrite(path, values = {}) {
    // @DESCRIPTION: sobreescribe las propiedades de la ruta (objeto o función) con las propiedades del valor
    const ref = this._getPropertyAndHolder(path, false, "overwrite");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.overwrite»`);
    return Object.assign(ref.obj[ref.last] ??= {}, values);
  }

  fill(path, values = {}) {
    // @DESCRIPTION: rellena las propiedades de la ruta (objeto o función) con las propiedades del valor, e ignora la propiedad en caso de colisión
    const ref = this._getPropertyAndHolder(path, false, "fill");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.fill»`);
    return ref.obj[ref.last] = Object.assign({}, values, ref.obj[ref.last] ??= {});
  }

  expand(path, values = {}) {
    // @DESCRIPTION: rellena las propiedades de la ruta (objeto o función) con las propiedades del valor, y lanza error en caso de colisión
    const ref = this._getPropertyAndHolder(path, false, "expand");
    Initialize_if_it_is_empty: {
      this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.expand»`);
      if (!this._hasKey(ref.obj, ref.last)) {
        ref.obj[ref.last] = {};
      }
    }
    Check_it_has_no_common_properties_before_overwriting: {
      this._assert(this._isPropertoid(ref.obj[ref.last]), `Could not expand last property «${ref.last}» in path «${path}» with more properties because the previous value is of type «${typeof ref.obj[ref.last]}» on «SectionsManager.prototype.expand»`);
      const val = ref.obj[ref.last];
      for (let prop in values) {
        this._assert(!this._hasKey(val, prop), `Property «${prop}» under path «${path}» cannot be expanded because it is already initialized on «SectionsManager.prototype.expand»`);
      }
    }
    Overwrite: {
      return Object.assign(ref.obj[ref.last], values);
    }
  }

  delete(path) {
    // @DESCRIPTION: elimina 1 propiedad de un objeto o 
    const ref = this._getPropertyAndHolder(path, false, "delete");
    if (["object", "function"].includes(typeof ref.obj)) {
      if (ref.obj === null) {
        throw new Error(`Cannot delete property «${ref.last}» of a null value of path «${path}» on «SectionsManager.prototype.delete»`);
      } else if (ref.obj instanceof Array) {
        ref.obj.splice(ref.last, 1);
      } else {
        delete ref.obj[ref.last];
      }
    } else {
      throw new Error(`Cannot delete property «${ref.last}» of a holder of type «${typeof ref.obj}» of path «${path}» on «SectionsManager.prototype.delete»`);
    }
    return ref.obj[ref.last];
  }

  reset() {
    this.root = {};
    return this;
  }

};
  /**
 * @name ModulerV6.Parser
 * @type 
 * @description 
 */
static Parser = (function (mod) {
  if (typeof window !== 'undefined') window['TextParserV1'] = mod;
  if (typeof global !== 'undefined') global['TextParserV1'] = mod;
  // if (typeof module !== 'undefined') module.exports = mod;
  return mod;
})(function () {
  // @source: https://github.com/allnulled/text-parser-v1/blob/main/text-parser-v1.js
  const TextParserV1 = class TextParserV1 {
    static default = this;
    static symbols = {
      PARENTHESYS_BALANCE: {},
    }
    static create(grammars) {
      return new this(grammars);
    }
    debug(...args) {
      console.log("[DEBUG]", ...args);
    }
    assert(condition, message) {
      if (!condition) throw new Error(message);
    }
    constructor(grammars = []) {
      for (let index = 0; index < grammars.length; index++) {
        const grammar = grammars[index];
        if ((typeof grammar[2] === "undefined") || (grammar[2] === null)) {
          grammar[2] = it => it;
        }
        if ((typeof grammar[3] === "undefined") || (grammar[3] === null)) {
          grammar[3] = {};
        }
        this.assert(typeof grammar === "object", `Grammar «${index}» must be object`);
        this.assert(typeof grammar[0] === "string", `Item «0» in grammar «${index}» must be string`);
        this.assert(typeof grammar[1] === "string" || typeof grammar[1] === "object", `Item «1» in grammar «${index}» must be string or object`);
        this.assert(typeof grammar[2] === "function", `Item «2» in grammar «${index}» must be function`);
        this.assert(typeof grammar[3] === "object", `Item «3» in grammar «${index}» must be object`);
      }
      this.grammars = grammars;
    }
    parse(text) {
      const tokens = this._extractTokens(text);
      const output = this._processTokens(text, tokens);
      return output;
    }
    _processTokens(text, tokens) {
      const formattedOutput = { size: text.length, text, tokens, formatted: [] };
      Iterating_tokens:
      for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
        const token = tokens[tokenIndex];
        Iterating_grammars:
        for (let indexGrammar = 0; indexGrammar < this.grammars.length; indexGrammar++) {
          const grammar = this.grammars[indexGrammar];
          const [ starter, ender, formatter, options ] = grammar;
          if (starter === token.starter) {
            const formattedToken = formatter.call(this, token, formattedOutput, tokenIndex, grammar, indexGrammar, text);
            formattedOutput.formatted.push(formattedToken);
            break Iterating_grammars;
          }
        }
      }
      return formattedOutput;
    }
    _extractTokens(text) {
      const state = {
        position: 0,
        output: [],
      };
      Iterating_text:
      while (state.position < text.length) {
        Iterating_grammars:
        for (let index = 0; index < this.grammars.length; index++) {
          const grammar = this.grammars[index];
          const [starter, ender, formatter, options] = grammar;
          const isMatchingStarter = text.startsWith(starter, state.position);
          On_not_matched:
          if (!isMatchingStarter) {
            continue Iterating_grammars;
          }
          const countingFrom = state.position + starter.length;
          let offset = 0;
          let wasEnded = false;
          Processing_match:
          if (typeof ender === "string") {
            while ((countingFrom + offset) < text.length) {
              const currentPosition = countingFrom + offset;
              const isMatchingEnder = text.startsWith(ender, currentPosition);
              if (isMatchingEnder) {
                wasEnded = true;
                state.output.push({
                  starter: starter,
                  location: [state.position, currentPosition + ender.length],
                  // text: text.substring(state.position, currentPosition + ender.length),
                  inner: text.substring(countingFrom, currentPosition),
                  outer: text.substring(state.position, currentPosition + ender.length),
                });
                break Processing_match;
              }
              offset++;
            }
            if (!wasEnded) throw new Error(`Unclosed starter of grammar «${starter}» reached end of text but «${ender}» was not found on grammar index «${index}»`);
          } else if (ender === this.constructor.symbols.PARENTHESYS_BALANCE) {
            let openedParenthesys = 1;
            let wasEnded = false;
            while ((countingFrom + offset) < text.length) {
              const currentPosition = countingFrom + offset;
              // @TODO: meterse dentro de los strings y escapar paréntesis internos
              if (text[currentPosition] === "(") {
                openedParenthesys++;
              } else if (text[currentPosition] === ")") {
                openedParenthesys--;
                if (openedParenthesys === 0) {
                  wasEnded = true;
                  state.output.push({
                    starter: starter,
                    location: [state.position, currentPosition],
                    // text: text.substring(state.position, currentPosition + 1),
                    inner: text.substring(countingFrom, currentPosition),
                    outer: text.substring(state.position, currentPosition + 1),
                  });
                  break Processing_match;
                }
              }
              offset++;
            }
            if (!wasEnded) throw new Error(`Unclosed starter of grammar «${starter}» reached end of text but the first parenthesys was not closed on grammar index «${index}»`);
          } else {
            throw new Error(`Ender (2nd argument) of grammar «${starter}» at grammar index «${index}» has not valid starter: «${typeof ender}»`);
          }
          if (options.allowInside) {
            state.position += starter.length;
          } else {
            state.position += offset;
          }
        }
        state.position++;
      }
      return state.output;
    }
  };
  return TextParserV1;
}.call());;
  /**
 * @name ModulerV6.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if (!condition) throw new this.AssertionError(message);
}
  /**
 * @name ModulerV6.isBrowser
 * @type 
 * @description 
 */
static isBrowser = typeof window !== "undefined";
  /**
 * @name ModulerV6.nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static nativeGrammars = {
  InjectSource: ["$compiler.inject.source(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject Source", inner: token.inner, location: token.location };
  }],
  InjectString: ["$compiler.inject.string(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Inject String", inner: token.inner, location: token.location };
  }],
  ImportJs: ["$moduler.import(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Import", ...token, };
  }, {allowInside:true}],
  ExportJs: ["$moduler.export(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Export", ...token, };
  }, {allowInside:true}],
  SectionGet: ["$moduler.section.get(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Get", ...token, };
  }, {allowInside:true}],
  SectionSet: ["$moduler.section.set(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Set", ...token, };
  }, {allowInside:true}],
  SectionOverwrite: ["$moduler.section.overwrite(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Overwrite", ...token, };
  }, {allowInside:true}],
  SectionExpand: ["$moduler.section.expand(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Expand", ...token, };
  }, {allowInside:true}],
  SectionFill: ["$moduler.section.fill(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Fill", ...token, };
  }, {allowInside:true}],
  SectionHas: ["$moduler.section.has(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Has", ...token, };
  }, {allowInside:true}],
  SectionInitialize: ["$moduler.section.initialize(", this.Parser.symbols.PARENTHESYS_BALANCE, function (token) {
    return { syntax: "Moduler Section Initialize", ...token, };
  }, {allowInside:true}],
  // ["/*%", "%*/", function (token) {
  //   return { syntax: "Multiline Comment Code Injection", ...token, };
  // }],
  MultilineCommentValueInjection: ["/*%=", "%*/", function (token) {
    return { syntax: "Multiline Comment Value Injection", ...token, };
  }],
  AtRequires: ["/*@requires:", "*/", function (token) {
    return { syntax: "@Requires", ...token, };
  }],
  AtInjects: ["/*@injects:", "*/", function (token) {
    return { syntax: "@Injects", ...token, };
  }],
  JavadocComment: ["/**", "*/", function (token) {
    return { syntax: "Javadoc Comment", ...token, };
  }, {allowInside:true}],
};
  /**
 * @name ModulerV6.defaultGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static defaultGrammars = {
  forJs: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
    // Sections management grammars:
    //*
    this.nativeGrammars.SectionGet,
    this.nativeGrammars.SectionSet,
    this.nativeGrammars.SectionOverwrite,
    this.nativeGrammars.SectionExpand,
    this.nativeGrammars.SectionFill,
    this.nativeGrammars.SectionHas,
    this.nativeGrammars.SectionInitialize,
    //*/
  ],
  forCss: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
  ],
  forMd: [
    this.nativeGrammars.InjectSource,
    this.nativeGrammars.InjectString,
    this.nativeGrammars.ImportJs,
    this.nativeGrammars.ExportJs,
    this.nativeGrammars.MultilineCommentValueInjection,
    this.nativeGrammars.AtRequires,
    this.nativeGrammars.AtInjects,
    this.nativeGrammars.JavadocComment,
  ],
  forCssOnRuntime: [
    this.nativeGrammars.AtRequires,
  ]
};
  /**
 * @name ModulerV6.symbols
 * @type 
 * @description 
 */
static symbols = {
  REGEX_FOR_SLASH_AT_THE_END: /(\\|\/)$/g,
  REGEX_FOR_PROTOCOL_BASED_PATH: /^([A-Za-z0-9\-\_\$]*)\:\/\//g,
  REGEX_FOR_ABSOLUTE_WINDOWS_PATH: /^(([A-Za-z]:(\\|\/))|((\\|\/){2}))/g,
};
  /**
 * @name ModulerV6.getEnvironmentDirectory
 * @type 
 * @description 
 */
static getEnvironmentDirectory() {
  if(this.isBrowser) {
    return window.location.origin;
  } else {
    return process.cwd();
  }
}
  /**
 * @name ModulerV6.prototype._formatImportParameters
 * @type 
 * @description 
 */
_formatImportParameters(signature) {
  this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype._formatImportParameters»");
  this.assert(signature.length !== 0, "ModulerV6.prototype.import cannot have 0 arguments");
  if(signature.length === 1) {
    if(typeof signature[0] === "string") {
      // By file or id
      const isId = signature[0].startsWith("#");
      return {
        id: isId ? signature[0] : null,
        file: !isId ? signature[0] : null,
        dependencies: [],
        factory: null,
      };
    } else if(typeof signature[0] === "object") {
      // By dependencies
      return {
        id: null,
        file: null,
        dependencies: signature[0],
        factory: null,
      };
    } else if(typeof signature[0] === "function") {
      // By pure factory
      return {
        id: null,
        file: null,
        dependencies: [],
        factory: signature[0],
      };
    } else {
      this.assert(false, `ModulerV6.prototype.import used with 1 argument does not support the signature: ${typeof signature[0]}`);
    }
  } else if(signature.length === 2) {
    if(typeof signature[0] === "object" && typeof signature[1] === "function") {
      // By factory with module injection
      return {
        id: null,
        file: null,
        dependencies: signature[0],
        factory: signature[1],
      };
    } else {
      this.assert(false, `ModulerV6.prototype.import used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
    }
  } else {
    this.assert(false, `ModulerV6.prototype.import cannot have ${signature.length} arguments`);
  }
}
  /**
 * @name ModulerV6.prototype._formatExportParameters
 * @type 
 * @description 
 */
_formatExportParameters(signature) {
  this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype._formatExportParameters»");
  this.assert(signature.length !== 0, "ModulerV6.prototype.export cannot have 0 arguments");
  this.assert(signature.length !== 1, "ModulerV6.prototype.export cannot have 1 argument only");
  this.assert(typeof signature[0] === "string", "ModulerV6.prototype.export first argument must be a string");
  this.assert(signature[0].startsWith("#"), "ModulerV6.prototype.export first argument must be a string starting with «#»");
  if(signature.length === 2) {
    if(typeof signature[0] === "string" && typeof signature[1] === "function") {
      // Factory module to name
      return {
        id: signature[0],
        file: null,
        dependencies: [],
        factory: signature[1],
      };
    } else if(typeof signature[0] === "string" && typeof signature[1] === "string") {
      // Dependency to name
      return {
        id: signature[0],
        file: signature[1],
        dependencies: [],
        factory: null,
      };
    } else if(typeof signature[0] === "string" && typeof signature[1] === "object") {
      // Dependencies collection to name
      return {
        id: signature[0],
        file: null,
        dependencies: signature[1],
        factory: null,
      };
    } else {
      this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
    }
  } else if(signature.length === 3) {
    if(typeof signature[0] === "string" && typeof signature[1] === "object" && typeof signature[2] === "function") {
      // Factory module with dependencies to name
      return {
        id: signature[0],
        file: null,
        dependencies: signature[1],
        factory: signature[2],
      };
    } else {
      this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}, ${typeof signature[2]}`);
    }
  } else {
    this.assert(false, `ModulerV6.prototype.export cannot have ${signature.length} arguments`);
  }
}
  /**
 * @name ModulerV6.prototype._joinPaths
 * @type 
 * @description 
 */
_joinPaths(subpaths, origin = false) {
  this.assert(Array.isArray(subpaths), `Parameter «subpaths» must be array on «ModulerV6.prototype._joinPaths»`);
  this.assert(subpaths.length !== 0, `Parameter «subpaths.length» cannot be 0 on «ModulerV6.prototype._joinPaths»`);
  let out = "";
  Join_paths_overwritting_when_required:
  for(let index=0; index<subpaths.length; index++) {
    const subpath = subpaths[index];
    this.assert(typeof subpath === "string", `Parameter «subpaths[${index}]» must be string too on «ModulerV6.prototype._joinPaths»`);
    this.assert(typeof subpath !== "", `Parameter «subpaths[${index}]» cannot be empty string on «ModulerV6.prototype._joinPaths»`);
    if(subpath.includes("://")) {
      // @case Ruta por protocolo
      this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_PROTOCOL_BASED_PATH), `Paths can only have «://» at the begining, and preceded only by a protocol id, if any in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
      out = subpath;
    } else if(subpath.includes(":\\") || subpath.includes(":/") || subpath.startsWith("\\\\") || subpath.startsWith("//")) {
      // @case Ruta absoluta estilo Windows
      this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_ABSOLUTE_WINDOWS_PATH), `Paths can only have «:\\|:/|\\\\|//» at the begining, and preceded only by a standard Windows disk unit identifier, if any in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
      out = subpath;
    } else if(subpath.startsWith("/")) {
      // @case Ruta absoluta estilo Linux
      out = subpath;
    } else if(subpath.startsWith("./")) {
      // @case Ruta relativa al basedir
      this.assert(typeof this.basedir === "string", `Cannot use «./» expression because «this.basedir» is «${typeof this.basedir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
      out = this._appendPathSeparator(this.basedir) + subpath.substr(2);
    } else if(subpath.startsWith("../")) {
      // @case Ruta relativa al basedir pero directorio superior
      this.assert(typeof this.basedir === "string", `Cannot use «../» expression because «this.basedir» is «${typeof this.basedir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
      out = this._appendPathSeparator(this.basedir, "..") + subpath.substr(3);
    } else if(subpath.startsWith("@/")) {
      // @case Ruta relativa al rootdir
      this.assert(typeof this.rootdir === "string", `Cannot use «@/» expression because «this.rootdir» is «${typeof this.rootdir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
      out = this._appendPathSeparator(this.rootdir) + subpath.substr(2);
    } else {
      // @case Cualquier otra ruta
      if(out.length) {
        out = this._appendPathSeparator(out) + subpath;
      } else {
        out = subpath;
      }
    }
  }
  Resolve_one_and_two_dots: {
    //    C:/una/ruta/absoluta.js
    //    C:\una\ruta\absoluta.js
    //    \\una\ruta\absoluta.js
    //    /una/ruta/absoluta.js
    //    ://una/ruta/absoluta.js
    //    http://una/ruta/absoluta.js
    //    ./una/ruta/relativa.js
    //    ../una/ruta/relativa.js
    //    @/una/ruta/relativa.js
    //    una/ruta/relativa.js
    const parts = this.splitPath(out);
    const newParts = []
    for(let index=0; index<parts.length; index++) {
      const part = parts[index];
      if(part === "..") {
        newParts.pop();
      } else if(part === ".") {
        // @OK.
      } else {
        newParts.push(part);
      }
    }
    out = newParts.join("/");
  }
  return out;
}
  /**
 * @name ModulerV6.prototype.splitPath
 * @type 
 * @description 
 */
splitPath(path) {
  const out = [""];
  let index = 0;
  while (index < path.length) {
    const ch = path[index];
    if (ch === "/" || ch === "\\") {
      out.push("");
    } else {
      out[out.length - 1] += ch;
    }
    index++;
  }
  return out;
}
  /**
 * @name ModulerV6.prototype._appendPathSeparator
 * @type 
 * @description 
 */
_appendPathSeparator(subpath) {
  return subpath.replace(this.constructor.symbols.REGEX_FOR_SLASH_AT_THE_END, "") + "/";
}
  /**
 * @name ModulerV6.prototype._readFile
 * @type 
 * @description 
 */
_readFile(file) {
  return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
}
  /**
 * @name CompilerV6.prototype._readUrl
 * @type 
 * @description 
 */
_readUrl(url) {
  return fetch(this.normalizationOf(url), {
    method: "GET",
  }).then(response => response.text());
}
  /**
 * @name ModulerV6.prototype._readPath
 * @type 
 * @description 
 */
_readPath(url) {
  return this._isBrowser ? this._readUrl(url) : this._readFile(url);
}
  /**
 * @name ModulerV6.prototype._wrapInTry
 * @type 
 * @description 
 */
_wrapInTry(source, parameters = {}, file = null) {
  let js = "";
  js += `try {\n`;
  js += `  ${source}\n`;
  js += `} catch(error) {\n`;
  js += `  console.error("Injection source failed somewhere:", ${JSON.stringify(source)});\n`;
  js += `  console.error("Injection parameters:", ${JSON.stringify(Object.keys(parameters).map(id => id + ":" + typeof parameters[id]))});\n`;
  if(file !== null) {
    js += `  console.error("Injected file:", ${JSON.stringify(file)});\n`;
  }
  js += `  console.error("Injection failed:", error);\n`;
  js += `}`;
  return js;
}
  /**
 * @name ModulerV6.prototype._createAsyncFunction
 * @type 
 * @description 
 */
_createAsyncFunction(source, parameters = []) {
  return new (async function() {}).constructor(...parameters, source);
}
  /**
 * @name ModulerV6.prototype._importFile
 * @type 
 * @description 
 */
_importFile(filepathBrute) {
  let originalHolder = {};
  const filepath = this.normalizationOf(filepathBrute);
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(output) {
      originalHolder = output;
    }
  };
  // @SCREWING: esto lo estaba jodiendo, y al quitarlo ya devolvía el string, y no entendí el porqué al final
  // this.modules[filepath] = moduleHolder.exports;
  return this.evaluateFile(filepath, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this.cloneForFile(filepath),
  }).then(result => {
    let output = undefined;
    if (typeof result === "undefined") {
      output = moduleHolder.exports;
    } else {
      output = moduleHolder.exports = result;
    }
    return this.modules[filepath] = output;
  });
}
  /**
 * @name ModulerV6.prototype._importFactory
 * @type 
 * @description 
 */
_importFactory(factory, dependencies = []) {
  let originalHolder = {};
  const moduleHolder = {
    get exports() {
      return originalHolder;
    },
    set exports(output) {
      originalHolder = output;
    }
  };
  const result = factory(dependencies, {
    module: moduleHolder,
    exports: moduleHolder.exports,
    $moduler: this,
  });
  return typeof result === "undefined" ? originalHolder : result;
}
  /**
 * @name ModulerV6.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  return this.constructor.assert(condition, message);
}
  /**
 * @name ModulerV6.prototype.createAssertFunction
 * @type 
 * @description 
 */
createAssertFunction() {
  return (...args) => this.assert(...args);
}
  /**
 * @name ModulerV6.prototype.setBasedir
 * @type 
 * @description 
 */
setBasedir(basedir) {
  this.basedir = this.normalizationOf(basedir);
  if(this.compiler) {
    this.compiler.basedir = this.basedir;
  }
}
  /**
 * @name ModulerV6.prototype.setRootdir
 * @type 
 * @description 
 */
setRootdir(rootdir) {
  this.rootdir = this.normalizationOf(rootdir);
  if(this.compiler) {
    this.compiler.rootdir = this.rootdir;
  }
}
  /**
 * @name ModulerV6.prototype.normalizationOf
 * @type 
 * @description 
 */
normalizationOf(subpath) {
  this.assert(typeof subpath === "string", `Parameter «subpath» must be string on «ModulerV6.prototype.normalizationOf»`);
  return this._joinPaths([subpath], "normalizationOf");
}
  /**
 * @name ModulerV6.prototype.basedirOf
 * @type 
 * @description 
 */
basedirOf(subpath) {
  const normalized = this._joinPaths([subpath], "basedirOf");
  const basedirSeparated = this._appendPathSeparator(this.basedir);
  if(normalized.startsWith(basedirSeparated)) {
    return normalized.replace(basedirSeparated, "./");
  }
  return normalized;
}
  /**
 * @name ModulerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(subpath) {
  const normalized = this._joinPaths([subpath], "rootdirOf");
  const rootdirSeparated = this._appendPathSeparator(this.rootdir);
  if(normalized.startsWith(rootdirSeparated)) {
    return normalized.replace(rootdirSeparated, "@/");
  }
  return normalized;
}
  /**
 * @name ModulerV6.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(filepath) {
  const dirpath = this._joinPaths([filepath, ".."]);
  return new ModulerV6(dirpath, this);
}
  /**
 * @name ModulerV6.prototype.evaluateFile
 * @type 
 * @description 
 */
evaluateFile(file, injections = {}) {
  return this._readPath(file).then(source => this.evaluateSource(source, injections, file));
}
  /**
 * @name ModulerV6.prototype.evaluateSource
 * @type 
 * @description 
 */
evaluateSource(source, injections = {}, file = null) {
  this.assert(typeof source === "string", `Parameter «source» must be string but «${typeof source}» was passed instead on «ModulerV6.prototype.evaluateSource»`);
  this.assert(typeof injections === "object", `Parameter «injections» must be object but «${typeof injections}» was passed instead on «ModulerV6.prototype.evaluateSource»`);
  this.assert(!Array.isArray(injections), `Parameter «injections» must be object but not array on «ModulerV6.prototype.evaluateSource»`);
  this.assert(injections !== null, `Parameter «injections» must be object but not null on «ModulerV6.prototype.evaluateSource»`);
  const allKeys = Object.keys(injections);
  const allObjects = Object.values(injections);
  const finalSource = this._wrapInTry(source, injections, file);
  const asyncFunction = this._createAsyncFunction(finalSource, allKeys);
  return asyncFunction(...allObjects);
}
  /**
 * @name ModulerV6.prototype.import
 * @type 
 * @description 
 */
import(...signature) {
  let filepath, dependencies;
  const parameters = this._formatImportParameters(signature);
  const {
    id: _id = null,
    file: _file = null,
    dependencies: _dependencies = null,
    factory: _factory = null,
  } = parameters;
  Resolve_by_id: {
    if (_id) {
      // Si tiene id, devuelve el id por huevos:
      this.assert(this.section.has(_id), `No section named «${_id}» on «ModulerV6.prototype.import»`);
      return this.section.get(_id);
    }
  }
  Resolve_by_file: {
    if (_file) {
      // Si tiene file, o devuelve el file cacheado, o lo cachea y lo devuelve:
      filepath = this.normalizationOf(_file);
      if (filepath in this.modules) {
        return this.modules[filepath];
      }
      return this._importFile(filepath);
    }
  }
  Resolve_by_dependencies: {
    if (_dependencies && _dependencies.length) {
      // Si tiene dependencies, las carga:
      dependencies = Promise.all(_dependencies.map(dependency => {
        // @NOTESE: Diuuuuuu a fondískiuts aquí hay inyéections fuli si no hay algún assert impidiéndolo por otro lao
        return this._importFile(dependency);
      }));
      if(!_factory) {
        return dependencies;
      }
    }
  }
  Resolve_by_factory: {
    if (_factory && dependencies) {
      return dependencies.then(resolvedDependencies => this._importFactory(_factory, resolvedDependencies));
    } else if (_factory && !dependencies) {
      return this._importFactory(_factory, []);
    } else if (dependencies) {
      return dependencies;
    } else {
      throw new Error("This error should never happen by design (8210)");
    }
  }
  throw new Error("This error should never happen by design (4993)");
}
  /**
 * @name ModulerV6.prototype.export
 * @type 
 * @description 
 */
export (...signature) {
  let filepath, dependencies, output;
  const parameters = this._formatExportParameters(signature);
  // @TODO: algoritmo del export
  const {
    id: _id = null,
    file: _file = null,
    dependencies: _dependencies = null,
    factory: _factory = null,
  } = parameters;
  this.assert(!this.section.has(_id), `Cannot export section by id «${_id}» because it already exists on «ModulerV6.prototype.export»`);
  Resolving_module: {
    const signatureCopy = [...signature];
    signatureCopy.splice(0,1);
    output = this.import(...signatureCopy);
  }
  if(output === null) {
    this.section.set(_id, output);
  } else if(["object"].includes(typeof output)) {
    this.section.expand(_id, output);
  } else {
    this.section.set(_id, output);
  }
  return output;
}
  /**
 * @name ModulerV6.globalInstance
 * @type 
 * @description 
 */
static globalInstance = new this();
  /**
 * @name ModulerV6.static.globalSectionsManagerInstance
 * @type 
 * @description 
 */
static globalSectionsManagerInstance = new this.SectionsManager();
  /**
 * @name ModulerV6.prototype.section
 * @type 
 * @description 
 */
section = this.constructor.globalSectionsManagerInstance;
  /**
 * @name ModulerV6.constructor
 * @type 
 * @description 
 */
constructor(basedirArg = null, cloneOf = null) {
  const basedir = (basedirArg === null) ? this.constructor.getEnvironmentDirectory() : basedirArg;
  this.assert(typeof basedir === "string", `Parameter «basedir» must be string and not «${typeof basedir}» on «ModulerV6.constructor»`);
  this.assert(typeof cloneOf === "object", `Parameter «cloneOf» must be object or null not «${typeof cloneOf}» on «ModulerV6.constructor»`);
  /**
 * @name ModulerV6.prototype.basedir
 * @type 
 * @description 
 */
this.assert(typeof basedir === "string", `Parameter «basedir» must be string on «Moduler.constructor»`);
this.basedir = basedir;
  /**
 * @name ModulerV6.prototype.rootdir
 * @type 
 * @description 
 */
this.rootdir = cloneOf ? cloneOf.rootdir : basedir;
  /**
 * @name ModulerV6.prototype.modules
 * @type 
 * @description 
 */
this.modules = cloneOf ? cloneOf.modules : {};
  /**
 * @name ModulerV6.prototype.compiler
 * @type 
 * @description 
 */
this.compiler = null;
  /**
 * @name CompilerV6.prototype.grammars
 * @type 
 * @description 
 */
this.grammars = {
  forJs: this.constructor.defaultGrammars.forJs,
  forCss: this.constructor.defaultGrammars.forCss,
  forMd: this.constructor.defaultGrammars.forMd,
};
  /**
 * @name ModulerV6.prototype.parser
 * @type 
 * @description 
 */
this.parser = {
  forJs: this.constructor.Parser.create(this.grammars.forJs),
  forCss: this.constructor.Parser.create(this.grammars.forCss),
  forMd: this.constructor.Parser.create(this.grammars.forMd),
};
  /**
 * @name ModulerV6.prototype.css
 * @type 
 * @description 
 */
// @SCREWING: esto no permitía fijar el basedir vía cloneForFile
// this.css = cloneOf ? cloneOf.css : new ModulerV6.CssManager(this);
this.css = new ModulerV6.CssManager(this);
}
};
}.call());
  const CompilerV6 = class CompilerV6 {
  /**
   * @name CompilerV6.CompilerV6.class
   * @type 
   * @description 
   */
  /**
 * @name CompilerV6.Parser
 * @type 
 * @description 
 */
static Parser = ModulerV6.Parser;
  /**
 * @name CompilerV6.Tracer
 * @type 
 * @description 
 */
static Tracer = /**
 * @name CompilerV6.Tracer.Tracer
 * @type 
 * @description 
 */
class Tracer {
  constructor(compiler) {
    /**
 * @name CompilerV6.Tracer.prototype.compiler
 * @type 
 * @description 
 */
this.compiler = compiler;
    /**
 * @name CompilerV6.Tracer.prototype.isBrowser
 * @type 
 * @description 
 */
this.isBrowser = compiler.isBrowser;
    /**
 * @name CompilerV6.Tracer.prototype.isTracing
 * @type 
 * @description 
 */
this.isTracing = false;
    /**
 * @name CompilerV6.Tracer.prototype.isLogging
 * @type 
 * @description 
 */
this.isLogging = true;
    /**
 * @name CompilerV6.Tracer.prototype.stack
 * @type 
 * @description 
 */
this.stack = [];
    /**
 * @name CompilerV6.Tracer.prototype.highlightedPatterns
 * @type 
 * @description 
 */
this.highlightedPatterns = [
  // Set patterns to highlight:
  ["assert", "blackBright"],
  ["_compileRecursively", "cyan,underline"],
  ["_tokenizeText", "cyan,underline"],
  ["_compileTokens", "cyan,underline"],
  [".constructor", "blue"],
  ["_replaceTextRange", "yellow,bold"],
];
    /**
 * @name CompilerV6.Tracer.prototype.ignoredPatterns
 * @type 
 * @description 
 */
this.ignoredPatterns = [
  "assert",
  // "[ok]",
];
  }
  /**
 * @name CompilerV6.Tracer.prototype.activate
 * @type 
 * @description 
 */
activate(really = true) {
  this.isTracing = !!really;
  return this;
}
  /**
 * @name CompilerV6.Tracer.prototype.deactivate
 * @type 
 * @description 
 */
deactivate(really = true) {
  this.isTracing = !!!really;
  return this;
}
  /**
 * @name CompilerV6.Tracer.prototype.addHighlighter
 * @type 
 * @description 
 */
addHighlighter(text) {
  if (highlightedPatterns.indexOf(text) === -1) {
    highlightedPatterns.push(text);
  }
}
  /**
 * @name CompilerV6.Tracer.prototype.removeHighlighter
 * @type 
 * @description 
 */
removeHighlighter(text) {
  const pos = highlightedPatterns.indexOf(text);
  if (pos !== -1) {
    highlightedPatterns.splice(pos, 1);
  }
}
  /**
 * @name CompilerV6.Tracer.prototype.indentByLevel
 * @type 
 * @description 
 */
indentByLevel(input) {
  return " ".repeat(this.stack.length) + input;
}
  /**
 * @name CompilerV6.Tracer.prototype.matchesIgnorer
 * @type 
 * @description 
 */
matchesIgnorer(text) {
  for (let index = 0; index < this.ignoredPatterns.length; index++) {
    const pattern = this.ignoredPatterns[index];
    if (text.includes(pattern)) {
      return true;
    }
  }
  return false;
}
  /**
 * @name CompilerV6.Tracer.prototype.highlightIfMatched
 * @type 
 * @description 
 */
highlightIfMatched(output) {
  let styling = false;
  Iterating_patterns:
  for (let index = 0; index < this.highlightedPatterns.length; index++) {
    const details = this.highlightedPatterns[index];
    const [text] = details;
    if (output.indexOf(text) !== -1) {
      styling = details[1] || "yellow,bold";
      break Iterating_patterns;
    }
  }
  if (output.includes("++]") || output.includes("--]")) {
    styling = "bold," + (styling || "");
  }
  if (styling === false) {
    return output;
  }
  return this.compiler.constructor.ansi.colors.style(styling).text(output);
}
  /**
 * @name CompilerV6.Tracer.prototype.trace
 * @type 
 * @description 
 */
trace(message, args, spaceDiff = 0) {
  if (this.isTracing) {
    let output = ``;
    output += `[${this.stack.length}${spaceDiff === 1 ? "++" : spaceDiff === -1 ? "--" : ""}] `;
    output += this.compiler.name ? `[${this.compiler.name}] ` : `[mv6] `;
    output += `[${message}] `;
    output += `arguments: ${args.length}`;
    output = this.highlightIfMatched(output);
    output = this.indentByLevel(output);
    if (!this.matchesIgnorer(output)) {
      console.log(output);
    }
    if(this.isLogging) {
      this.compiler.log(CompilerV6.ansi.colors.stripAnsi(output));
    }
  }
}
  /**
 * @name CompilerV6.Tracer.prototype.traceIn
 * @type 
 * @description 
 */
traceIn(msg, args) {
  this.trace(msg, args, 1);
  this.stack.push(msg);
}
  /**
 * @name CompilerV6.Tracer.prototype.traceOut
 * @type 
 * @description 
 */
traceOut(msg, args) {
  const lastInStack = this.stack[this.stack.length-1];
  // this.compiler.assert(lastInStack === msg, `Method «Tracer.prototype.traceOut» closing different method from stack: it should close «${lastInStack}» but it is trying to close «${msg}» `);
  this.stack.pop()
  this.trace(msg, args, -1);
}
  /**
 * @name CompilerV6.Tracer.prototype.printStack
 * @type 
 * @description 
 */
printStack() {
  console.log(`Tracer «${this.compiler.name || "mv6"}» with:`, this.stack);
}
};
  /**
 * @name CompilerV6.AssertionError
 * @type 
 * @description 
 */
static AssertionError = class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
}
  /**
 * @name CompilerV6.Logger
 * @type 
 * @description 
 */
static Logger = class Logger {
  /**
   * @name CompilerV6.Logger.Logger.class
   * @type 
   * @description 
   */
  /**
 * @name CompilerV6.Logger.fromFile
 * @type 
 * @description 
 */
static fromFile(file) {
  return new this({ file });
}
  /**
 * @name CompilerV6.Logger.Manager
 * @type 
 * @description 
 */
static Manager = /**
 * @name CompilerV6.Logger.Manager
 * @type 
 * @description 
 */
class LoggerManager {
  /**
 * @name CompilerV6.Logger.Manager.fromDirectory
 * @type 
 * @description 
 */
static fromDirectory(basedir) {
  return new this(basedir);
}
  /**
 * @name CompilerV6.Logger.Manager.constructor
 * @type 
 * @description 
 */
constructor(basedir) {
  this.basedir = basedir;
  this.selected = "default";
  this.subloggers = {
    default: new Logger({ file: require("path").resolve(basedir, "default.txt") }),
  };
}
  /**
 * @name CompilerV6.Logger.Manager.get.current
 * @type 
 * @description 
 */
get current() {
  return this.subloggers[this.selected];
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.addLogger
 * @type 
 * @description 
 */
addLogger(id) {
  this.subloggers[id] = new Logger({ file: require("path").resolve(this.basedir, id + ".txt") });
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.has
 * @type 
 * @description 
 */
has(id) {
  return id in this.subloggers;
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.into
 * @type 
 * @description 
 */
into(id) {
  if (!this.has(id)) {
    this.addLogger(id);
  }
  return this.subloggers[id];
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.select
 * @type 
 * @description 
 */
select(id = false) {
  if (id === false) {
    if (!this.has(this.selected)) {
      this.addLogger(this.selected);
    }
    return this.subloggers[this.selected];
  }
  if (!this.has(id)) {
    this.addLogger(this.selected);
  }
  this.selected = id;
  return this.select();
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.resetFile
 * @type 
 * @description 
 */
resetFile(...args) {
  if (!this.has(this.selected)) {
    this.addLogger(this.selected);
  }
  return this.subloggers[this.selected].resetFile(...args);
}
  /**
 * @name CompilerV6.Logger.Manager.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  if (!this.has(this.selected)) {
    this.addLogger(this.selected);
  }
  return this.subloggers[this.selected].log(...args);
}
};

  /**
 * @name CompilerV6.Logger.create
 * @type 
 * @description 
 */
static create(...args) {
  return new this(...args);
}
  /**
 * @name CompilerV6.Logger.defaultOptions
 * @type 
 * @description 
 */
static defaultOptions = {
  console: true,
};
  /**
 * @name CompilerV6.Logger.constructor
 * @type 
 * @description 
 */
constructor(options, compiler) {
  this.options = Object.assign({}, this.constructor.defaultOptions, options);
  this.compiler = compiler;
  this.startedAt = new Date();
  this.lastLogAt = new Date();
}
  /**
 * @name CompilerV6.Logger.prototype.resetFile
 * @type 
 * @description 
 */
resetFile(...args) {
  return require("fs").promises.writeFile(this.options.file, "", "utf8").then(() => {
    this.startedAt = new Date();
    this.lastLogAt = new Date();
    return this.log(...args);
  });
}
  /**
 * @name CompilerV6.Logger.prototype.getTimeOffset
 * @type 
 * @description 
 */
getTimeOffset() {
  return "+" + ((new Date()).getTime() - this.startedAt.getTime());
}
  /**
 * @name CompilerV6.Logger.prototype.getLastLogOffset
 * @type 
 * @description 
 */
getLastLogOffset() {
  return "+" + ((new Date()).getTime() - this.lastLogAt.getTime());
}
  /**
 * @name CompilerV6.Logger.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  const line = this.stringifySafe({
    "@": this.getMomentToString(),
    "#": this.getTimeOffset(),
    "##": this.getLastLogOffset(),
    "*": args,
  });
  if (this.options.console) {
    console.log(`~[LOG] ${line}`);
  }
  this.lastLogAt = new Date();
  if (this.options.file) {
    return require("fs").promises.appendFile(this.options.file, line + "\n", "utf8").catch(console.error);
  }
}
  /**
 * @name CompilerV6.Logger.prototype.setOption
 * @type 
 * @description 
 */
setOption(id, value) {
  this.options[id] = value;
  return this;
}
  /**
 * @name CompilerV6.Logger.prototype.getMomentToString
 * @type 
 * @description 
 */
getMomentToString() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  const pad3 = n => String(n).padStart(3, "0");
  return (
    `${d.getFullYear()}-` +
    `${pad(d.getMonth() + 1)}-` +
    `${pad(d.getDate())} ` +
    `${pad(d.getHours())}:` +
    `${pad(d.getMinutes())}:` +
    `${pad(d.getSeconds())}.` +
    `${pad3(d.getMilliseconds())}`
  );
}
  /**
 * @name CompilerV6.Logger.prototype.stringifySafe
 * @type 
 * @description 
 */
stringifySafe(value) {
  const seen = new WeakSet();
  return JSON.stringify(value, (key, val) => {
    if (typeof val === "bigint") {
      return `${val}n`;
    }
    if (typeof val === "function") {
      return `[Function ${val.name || "anonymous"}]`;
    }
    if (val instanceof Error) {
      return {
        name: val.name,
        message: val.message,
        stack: val.stack
      };
    }
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) {
        return "[Circular]";
      }
      seen.add(val);
    }
    return val;
  }, 0);
}
};

  /**
 * @name CompilerV6.Moduler
 * @type 
 * @description 
 */
static Moduler = ModulerV6;
  /**
 * @name CompilerV6.CompilationProcess
 * @type 
 * @description 
 */
static CompilationProcess = class CompilationProcess {
  /**
 * @name CompilerV6.CompilationProcess.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if(!condition) throw new Error(message);
}
  /**
 * @name CompilerV6.CompilationProcess._defaultProcessData
 * @type 
 * @description 
 */
static get _defaultProcessData() {
  return {
    processedEntries: {},
    // uncacheInjections: false,
  }
};
  /**
 * @name CompilerV6.CompilationProcess.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, compiler) {
  this.constructor.assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationProcess.constructor»");
  this.constructor.assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationProcess.constructor»");
  this.compiler = compiler;
  this.compiler._traceIn("CompilationProcess.constructor", arguments);
  if (compilationProcess instanceof this.constructor) {
    this.compiler._traceOut("CompilationProcess.constructor", arguments);
    Object.assign(this, this.constructor._defaultProcessData, compilationProcess);
    return this;
  } else {
    this.compiler.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationProcess.constructor»");
    this.compiler.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationProcess.constructor»");
    Object.assign(this, this.constructor._defaultProcessData, compilationProcess);
    if (typeof this.resource === "undefined") {
      this.compiler.assert(typeof compilationFile.resource === "string", "Parameter «compilationProcess.resource» or «compilationFile.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
      this.resource = compilationFile.resource;
    }
    if (typeof this.isRoot === "undefined") {
      this.isRoot = compilationFile.isRoot;
    }
    this.compiler.assert(typeof this.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
    this.compiler.assert(typeof this.isRoot === "boolean", "Parameter «compilationProcess.isRoot» must be boolean on «CompilerV6.CompilationProcess.constructor»");
    this.compiler._traceOut("CompilationProcess.constructor", arguments);
    return this;
  }
}
  /**
 * @name CompilerV6.CompilationProcess.from
 * @type 
 * @description 
 */
static from(...args) {
  return new this(...args);
}
}
  /**
 * @name CompilerV6.CompilationFile
 * @type 
 * @description 
 */
static CompilationFile = class CompilationFile {
  /**
 * @name CompilerV6.CompilationFile.assert
 * @type 
 * @description 
 */
static assert(condition, message) {
  if(!condition) throw new Error(message);
}
  /**
 * @name CompilerV6.CompilationFile._defaultFileData
 * @type 
 * @description 
 */
static get _defaultFileData() {
  return {
    compilation: {
      js: "",
      css: "",
      md: "",
    },
    report: {
      tree: {}
    },
  }
};
  /**
 * @name CompilerV6.CompilationFile.constructor
 * @type 
 * @description 
 */
constructor(compilationFile, compilationProcess, compiler) {
  this.constructor.assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationFile.constructor»");
  this.constructor.assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationFile.constructor»");
  this.compiler = compiler;
  if (compilationProcess instanceof this.constructor) {
    this.compiler._traceOut("CompilationProcess.constructor", arguments);
    Object.assign(this, this.constructor._defaultFileData, compilationFile);
    return this;
  }
  this.compiler._traceIn("CompilationFile.constructor", arguments);
  this.compiler.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationFile.constructor»");
  this.compiler.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationFile.constructor»");
  Object.assign(this, this.constructor._defaultFileData, compilationFile);
  this.compiler.assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.CompilationFile.constructor»");
  this.compiler.assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «CompilerV6.CompilationFile.constructor»");
  this.compiler._traceOut("CompilationFile.constructor", arguments);
}
  /**
 * @name CompilerV6.CompilationFile.from
 * @type 
 * @description 
 */
static from(...args) {
  return new this(...args);
}
}
  /**
 * @name CompilerV6.CompilationResult.CompilationResult
 * @type 
 * @description 
 */
static CompilationResult = class {
  /**
 * @name CompilerV6.CompilationResult.constructor
 * @type 
 * @description 
 */
constructor(output = {}, compiler = null) {
  Object.assign(this, output);
  this.compiler = compiler;
}
  /**
 * @name CompilerV6.CompilationResult.prototype.toFile
 * @type 
 * @description 
 */
toFile(file, options = {}) {
  this.compiler.assert(require("path").basename(file).includes(".dist."), `Method «toFile» only accepts files containing «.dist.» pattern and file «${file}» does not incur the case`);
  const fileExtension = require("path").extname(file);
  const fileNormalization = this.compiler.normalizationOf(file);
  const fileJs = this.compiler.constructor._changeFileExtension(fileNormalization, ".js");
  const fileCss = this.compiler.constructor._changeFileExtension(fileNormalization, ".css");
  const fileMd = this.compiler.constructor._changeFileExtension(fileNormalization, ".md");
  const promises = [];
  if (this.js) {
    const outputJs = (options.mode === "beautified" && this.beautifiedJs) ? this.beautifiedJs.code : (options.mode === "minified" && this.minifiedJs) ? this.minifiedJs.code : this.js;
    promises.push(require("fs").promises.writeFile(fileJs, outputJs, "utf8"));
  } else if (this.css) {
    promises.push(require("fs").promises.writeFile(fileCss, this.css, "utf8"));
  } else if (this.md) {
    promises.push(require("fs").promises.writeFile(fileMd, this.md, "utf8"));
  }
  return Promise.all(promises);
}
  /**
 * @name CompilerV6.CompilationResult.prototype.toJsonable
 * @type 
 * @description 
 */
toJsonable() {
  return Object.assign({}, this, {
    // @CUSTOMIZABLE: override non-jsonable properties here:
    compiler: undefined,
    moduler: undefined,
  });
}
}
  /**
 * @name CompilerV6._nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static _nativeGrammars = ModulerV6.nativeGrammars;
  /**
 * @name CompilerV6._defaultGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
static _defaultGrammars = ModulerV6.defaultGrammars;
  /**
 * @name CompilerV6._changeFileExtension
 * @type 
 * @description 
 */
static _changeFileExtension(file, nuevaExt) {
  const path = require("path");
  if (!nuevaExt.startsWith(".")) {
    nuevaExt = "." + nuevaExt;
  }
  const dir = path.dirname(file);
  const nombre = path.basename(file, path.extname(file));
  return path.join(dir, nombre + nuevaExt);
}
  /**
 * @name CompilerV6.beautifyJs
 * @type 
 * @description 
 */
static beautifyJs(code) {
  return require("prettier").format(code, {
    parser: "babel"
  });
}
  /**
 * @name CompilerV6.softMinifyJs
 * @type 
 * @description 
 */
static softMinifyJs(code) {
  return require("terser").minify(code, {
    compress: {
      sequences: true,
    },
    mangle: false,
    toplevel: true,
    format: {
      comments: false, // Esta es la única cambiada
      beautify: true,
      indent_level: 2,
      max_line_len: true,
    }
  });
}
  /**
 * @name CompilerV6.hardMinifyJs
 * @type 
 * @description 
 */
static hardMinifyJs(code) {
  return require("terser").minify(code, {
    compress: {
      defaults: true,
      passes: 5,
      unsafe: true,
      toplevel: true
    },
    mangle: {
      toplevel: true
    },
  });
}
  /**
 * @name CompilerV6.getStringSize
 * @type 
 * @description 
 */
static getStringSize(text) {
  let bytes = undefined;
  if (this.isBrowser) {
    bytes = new TextEncoder().encode(text).length;
  } else {
    bytes = Buffer.byteLength(text, "utf8");
  }
  if(bytes < (1024 * 1024)) {
    return `${(bytes / 1024).toFixed(2)}KB`;
  } else {
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  }
}
  /**
 * @name CompilerV6.create
 * @type 
 * @description 
 */
static create(...args) {
  return new this(...args);
}
  /**
 * @name CompilerV6.fromDirectory
 * @type 
 * @description 
 */
static fromDirectory(dir) {
  return new this(dir);
}
  /**
 * @name CompilerV6.fromRootOf
 * @type 
 * @description 
 */
static async fromRootOf(file) {
  const root = await this.findRootOf(file);
  return new this(root);
}
  /**
 * @name CompilerV6.findRootOf
 * @type 
 * @description 
 */
static async findRootOf(file, whenContains = "package.json") {
  const fs = require("fs");
  const path = require("path");
  let dir0 = null;
  let dir1 = file;
  while (dir0 !== dir1) {
    try {
      const filepath = path.resolve(dir1, whenContains);
      await fs.promises.readFile(filepath);
      return filepath;
    } catch (error) {
      dir0 = dir1;
      dir1 = fs.promises.readdir(dir1);
    }
  }
}
  /**
 * @name CompilerV6.colors
 * @type 
 * @description 
 */
static ansi = {
  colors: /**
 * @name CompilerV6.colors
 * @type 
 * @description 
 */
Object.assign({
  available: {

    // estilos
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    blink: [5, 25],
    inverse: [7, 27],
    strike: [9, 29],

    // colores
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],

    // fondo
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],

    // brillantes
    blackBright: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],

    bgBlackBright: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49],

  },
  endToken: "\x1b[0m",
  squad: {
    tl: "┌",
    tr: "┐",
    bl: "└",
    br: "┘",
  },
  line: {
    h: "─",
    v: "│",
  },
  style: function (config = "red,bold,underline") {
    const styles = config.split(",");
    return {
      text: (text) => {
        const begin = styles.reduce((out, it) => {
          if (!(it in this.available)) {
            return out;
          }
          const code = this.available[it];
          out += `\x1b[${code[0]}m`;
          return out;
        }, "");
        const end = this.endToken;
        return `${begin}${text}${end}`;
      },
      print(text) {
        console.log(this.text(text));
      }
    }
  },
  stripAnsi: function (str) {
    return str.replace(/\x1b\[[0-9;]*m/g, "");
  },
  wrapAnsi: function (str, maxWidth) {
    return require("wrap-ansi").default(str, maxWidth, {
      hard: true
    });
  },
  box: function (text, maxWidth = 110) {
    const lines = this.wrapAnsi(text, maxWidth).split("\n");
    const cleanLines = lines.map(l => this.stripAnsi(l));
    const width = Math.max(...cleanLines.map(l => l.length));
    const top = "┌" + "─".repeat(width + 2) + "┐";
    const bottom = "└" + "─".repeat(width + 2) + "┘";
    const body = lines
      .map(line => {
        const clean = this.stripAnsi(line);
        const pad = width - clean.length;
        return "│ " + line + " ".repeat(pad) + " │";
      })
      .join("\n");
    return `${top}\n${body}\n${bottom}`;
  }
}, {
  table: function table(listOfColumns, options = {}) {
    const Table = require("cli-table3");
    const table = new Table(options);
    table.push(...listOfColumns);
    return table.toString();
  },
  borderlessTable: function borderlessTable(listOfColumns, optionsObject = {}) {
    return this.alignTable(listOfColumns, 2, optionsObject);
  },
  visibleLength(str) {
    return require('strip-ansi').default(str).length;
  },
  alignTable(rows, gap = 2, max = {}) {
    for (let indexRow = 0; indexRow < rows.length; indexRow++) {
      const row = rows[indexRow];
      for (let indexCol = 0; indexCol < row.length; indexCol++) {
        const cell = row[indexCol];
        const cellLen = this.visibleLength(cell);
        if (!(indexCol in max)) {
          max[indexCol] = 5;
        }
        if (max[indexCol] < cellLen) {
          max[indexCol] = cellLen;
        }
      }
    }
    let out = "";
    for (let indexRow = 0; indexRow < rows.length; indexRow++) {
      const row = rows[indexRow];
      for (let indexCol = 0; indexCol < row.length; indexCol++) {
        const cell = row[indexCol];
        const currCellLen = this.visibleLength(cell);
        const cellLen = max[indexCol];
        const col = cell + " ".repeat(cellLen - currCellLen);
        if (indexCol !== 0) {
          out += " │ ";
        }
        out += col;
      }
      out += "\n";
    }
    return out.trimEnd();
  },
  padLinesToMax: function padLinesToMax(text) {
    const lines = text.split("\n");
    let out = "";
    let max = 0;
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (max < line.length) {
        max = line.length;
      }
    }
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const padded = line.padEnd(max, " ");
      if (index !== 0) out += "\n";
      out += padded;
    }
    return out;
  },
})
}
  /**
 * @name CompilerV6.constructor  
 * @type 
 * @description 
 */
constructor(basedirInput, parent = null, grammars = this.constructor._defaultGrammars) {
  if(!(typeof basedirInput === "string")) { throw new this.constructor.AssertionError(`Parameter «basedir» must be string not «${typeof basedirInput}» on «CompilerV6.constructor»`); }
  if(!(typeof parent === "object")) { throw new this.constructor.AssertionError(`Parameter «parent» must be object not «${typeof parent}» on «CompilerV6.constructor»`); }
  if(!(typeof grammars === "object")) { throw new this.constructor.AssertionError(`Parameter «grammars» must be object not «${typeof grammars}» on «CompilerV6.constructor»`); }
  if(parent) {
    this._tracer = parent._tracer;
  }
  this._trace("constructor", arguments);
  const basedir = parent ? parent.fullpathOf(basedirInput) : this.fullpathOf(basedirInput);
  // const basedir = this.normalizationOf(basedirInput);
  /**
 * @name CompilerV6.prototype.isBrowser
 * @type 
 * @description 
 */
this.isBrowser = typeof window !== "undefined";
  /**
 * @name CompilerV6.prototype.basedir
 * @type 
 * @description 
 */
this.basedir = basedir;
  /**
 * @name CompilerV6.prototype.previousdir
 * @type 
 * @description 
 */
this.previousdir = parent ? parent.basedir : basedir;
  /**
 * @name CompilerV6.prototype.rootdir
 * @type 
 * @description 
 */
this.rootdir = parent ? parent.rootdir : basedir;
  /**
 * @name CompilerV6.prototype.moduler
 * @type 
 * @description 
 */
this.moduler = new ModulerV6(basedir);
this.moduler.compiler = this;
  /**
 * @name CompilerV6.prototype._grammars
 * @type 
 * @description 
 */
this._grammars = {
  forJs: this.constructor._defaultGrammars.forJs,
  forCss: this.constructor._defaultGrammars.forCss,
  forMd: this.constructor._defaultGrammars.forMd,
};
  /**
 * @name CompilerV6.prototype._parser
 * @type 
 * @description 
 */
this._parser = {
  forJs: this.constructor.Parser.create(this._grammars.forJs),
  forCss: this.constructor.Parser.create(this._grammars.forCss),
  forMd: this.constructor.Parser.create(this._grammars.forMd),
};
}

  /**
 * @name CompilerV6.prototype._readPath
 * @type 
 * @description 
 */
_readPath(url) {
  this._trace("_readPath", arguments);
  return this._isBrowser ? this._readUrl(url) : this._readFile(url);
}
  /**
 * @name CompilerV6.prototype._readUrl
 * @type 
 * @description 
 */
_readUrl(url) {
  this._trace("_readUrl", arguments);
  return fetch(this.normalizationOf(url), { method: "GET" }).then(response => response.text());
}
  /**
 * @name CompilerV6.prototype._readFile
 * @type 
 * @description 
 */
_readFile(file) {
  this._trace("_readFile", arguments);
  return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
}
  /**
 * @name CompilerV6.prototype.assert
 * @type 
 * @description 
 */
assert(condition, message) {
  this._trace("assert", arguments);
  if (!condition) {
    throw new this.constructor.AssertionError(message);
  } else if(this._tracer.isTracing) {
    this._notifyAssertion(message);
  }
}
  /**
 * @name CompilerV6.prototype.assertThrows
 * @type 
 * @description 
 */
async assertThrows(callback, message, checker = () => true) {
  const localError = new Error("Should have thrown: " + message);
  try {
    await callback();
    throw localError;
  } catch (err) {
    if(err === localError) {
      throw new this.constructor.AssertionError(`Should have thrown: ${err.name}: ${err.message} | ${err.stack}`);
    }
    if (!checker(err)) {
      throw new this.constructor.AssertionError(`Should have thrown but not specific error: ${err.name}: ${err.message} | ${err.stack}`);
    }
    this._notifyAssertion(message);
  }
}
  /**
 * @name CompilerV6.prototype.assertDoesNotThrow
 * @type 
 * @description 
 */
async assertDoesNotThrow(callback, message, checker = () => true) {
  try {
    await callback();
    this._notifyAssertion(message);
  } catch (err) {
    if (!checker(err)) {
      throw new this.constructor.AssertionError(`Should not have thrown specific error: ${err.name}: ${err.message}`);
    }
    throw new this.constructor.AssertionError(`Should not have thrown: ${err.name}: ${err.message}`);
  }
}
  /**
 * @name CompilerV6.prototype.createAssertFunction
 * @type 
 * @description 
 */
createAssertFunction() {
  return (...args) => this.assert(...args);
}
  /**
 * @name CompilerV6.prototype._notifyAssertion
 * @type 
 * @description 
 */
_notifyAssertion(message) {
  const text = `[ok] ${message}`;
  if(this._tracer.isTracing && (!this._tracer.matchesIgnorer(text))) {
    console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
  }
}
  /**
 * @name CompilerV6.prototype._logger
 * @type 
 * @description 
 */
_logger = null;
  /**
 * @name CompilerV6.prototype._tracer
 * @type 
 * @description 
 */
_tracer = new this.constructor.Tracer(this);
  /**
 * @name CompilerV6.prototype._trace
 * @type 
 * @description 
 */
_trace(method, args = []) {
  return this._tracer.trace(method, args);
}
  /**
 * @name CompilerV6.prototype._traceIn
 * @type 
 * @description 
 */
_traceIn(method, args = []) {
  return this._tracer.traceIn(method, args);
}
  /**
 * @name CompilerV6.prototype._traceOut
 * @type 
 * @description 
 */
_traceOut(method, args = []) {
  return this._tracer.traceOut(method, args);
}
  /**
 * @name CompilerV6.prototype._debug
 * @type 
 * @description 
 */
_debug(...list) {
  for(let index=0; index<list.length; index++) {
    const item = list[index];
    let output = item;
    try {
      output = JSON.stringify(item, null, 2);
    } catch (error) {
      // @OK
      console.warn(error);
    }
    console.log(this.constructor.ansi.colors.style("yellow,bold,underline").text(`[debug] parameter ${index}:`), output);
  }
  return list[0];
}
  /**
 * @name CompilerV6.prototype._die
 * @type 
 * @description 
 */
_die(...args) {
  this._trace("die", arguments);
  console.log("[DIE]", ...args);
  process.exit(0);
}
  /**
 * @name CompilerV6.prototype._tokenizeText
 * @type 
 * @description 
 */
_tokenizeText(compilationFile, compilationProcess) {
  this._traceIn("_tokenizeText", arguments);
  this.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.prototype._tokenizeText»");
  this.assert(typeof compilationProcess.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.prototype._tokenizeText»");
  this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._tokenizeText»");
  this.assert(typeof compilationFile.source === "string", "Parameter «compilationFile.source» must be string on «CompilerV6.prototype._tokenizeText»");
  this.assert(typeof compilationFile.extension === "string", "Parameter «compilationFile.extension» must be string on «CompilerV6.prototype._tokenizeText»");
  let out = undefined;
  if(compilationFile.extension === "js") {
    out = this._parser.forJs.parse(compilationFile.source);
  } else if(compilationFile.extension === "css") {
    out = this._parser.forCss.parse(compilationFile.source);
  } else if(compilationFile.extension === "md") {
    out = this._parser.forMd.parse(compilationFile.source);
  } else {
    throw new Error(`File extension cannot be tokenized: «${compilationFile.resource}»`);
  }
  delete out.text;
  compilationFile.tokenization = out;
  // 
  this._traceOut("_tokenizeText", arguments);
  return out;
}
  /**
 * @name CompilerV6.prototype._replaceTextRange
 * @type 
 * @description 
 */
_replaceTextRange(text, start, end, replacement) {
  this._trace("_replaceTextRange", arguments);
  if(text.length < start) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (1)");
  }
  if(text.length < end) {
    this._tracer.printStack();
    throw new Error("Text replacement out of text boundaries (2)");
  }
  const output = text.slice(0, start) + replacement + text.slice(end + 1);
  
  return output;
}
  /**
 * @name CompilerV6.prototype._compileTokens
 * @type 
 * @description 
 */
async _compileTokens(compilationFile, compilationProcess) {
  this._traceIn("_compileTokens", arguments);
  const { resource, source, tokenization: { formatted: tokens } } = compilationFile;
  const _tokenCompilationSwitcher = {
    "Inject Source": this._compileAsInjectSource,
    "Inject String": this._compileAsInjectString,
    "Multiline Comment Code Injection": this._compileAsMultilineCommentCodeInjection,
    "Multiline Comment Value Injection": this._compileAsMultilineCommentValueInjection,
    "Moduler Import": this._compileAsModulerImport,
    "Moduler Export": this._compileAsModulerExport,
    "@Requires": this._compileAsRequires,
    "@Injects": this._compileAsInjects,
    "Javadoc Comment": this._compileAsJavadocComment,
    "Moduler Section Get": this._compileAsModulerSectionGet,
    "Moduler Section Set": this._compileAsModulerSectionSet,
    "Moduler Section Delete": this._compileAsModulerSectionDelete,
    "Moduler Section Overwrite": this._compileAsModulerSectionOverwrite,
    "Moduler Section Fill": this._compileAsModulerSectionFill,
    "Moduler Section Expand": this._compileAsModulerSectionExpand,
  };
  Iterating_tokens:
  for (let tokenIndex = tokens.length - 1; tokenIndex >= 0; tokenIndex--) {
    const token = tokens[tokenIndex];
    Extraer_las_rutas_dependencia: {
      this.assert(token.syntax in _tokenCompilationSwitcher, `Syntax not identified «${token.syntax}»`);
      const methodCallback = _tokenCompilationSwitcher[token.syntax];
      await methodCallback.call(this, compilationFile, compilationProcess, { token, tokenIndex, });
    }
  }
  this._traceOut("_compileTokens", arguments);
  return compilationFile.compilation;
}

  /**
 * @name CompilerV6.prototype._compileRecursively
 * @type private class method
 * @description  
 */
async _compileRecursively(fileParameters = {}, processParameters = {}) {
  this._traceIn("_compileRecursively", arguments);
  this.assert(typeof fileParameters === "object", "Parameter «fileParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof fileParameters.resource === "string", "Parameter «fileParameters.resource» must be string on «CompilerV6.prototype._compileRecursively»");
  this.assert(typeof processParameters === "object", "Parameter «processParameters» must be object on «CompilerV6.prototype._compileRecursively»");
  let compilationFile, compilationProcess, subcompiler, output;
  Initialize_parameters: {
    compilationFile = this.constructor.CompilationFile.from(fileParameters, processParameters, this);
    compilationProcess = this.constructor.CompilationProcess.from(fileParameters, processParameters, this);
  }
  this.assert(processParameters.uncacheInjections === compilationProcess.uncacheInjections, "Las inyecciones 1");
  Add_entry_in_tree: {
    // compilationFile.resource = this.rootdirOf(compilationFile.resource);
    const id = this.rootdirOf(compilationFile.resource);
    compilationFile.report.tree[id] = compilationFile.report.tree[id] || {};
  }
  Compile_inner_files_recursively_with_subcompiler: {
    subcompiler = this._cloneForFile(compilationFile.resource, this);
    compilationFile.subcompiler = subcompiler;
    await subcompiler._fetchCompilable(compilationFile, compilationProcess);
    subcompiler._tokenizeText(compilationFile, compilationProcess);
    await subcompiler._compileTokens(compilationFile, compilationProcess);
    output = subcompiler._getPreferredOutput(compilationFile, compilationProcess);
  }
  Beautify_and_minify: {
    if (fileParameters.isRoot && (processParameters.beautify || processParameters.minify) && (!this.isBrowser) && (typeof output.js === "string")) {
      const originalSize = this.constructor.getStringSize(output.js);
      if (processParameters.beautify) {
        const startedAt = new Date();
        const beautifiedCode = await this.constructor.beautifyJs(output.js);
        output.beautifiedJs = {
          code: beautifiedCode,
          chars: beautifiedCode.length,
          originalSize: originalSize,
          size: this.constructor.getStringSize(beautifiedCode),
          sizeRelationOf: ((beautifiedCode.length / output.js.length) * 100).toFixed(2) + "%",
          time: ((((new Date()) - startedAt) / 1000).toFixed(3) + "s"),
        };
      }
      if (processParameters.minify) {
        const startedAt = new Date();
        const minifiedCode = (await this.constructor.hardMinifyJs(output.js)).code;
        output.minifiedJs = {
          code: minifiedCode,
          chars: minifiedCode.length,
          originalSize: originalSize,
          size: this.constructor.getStringSize(minifiedCode),
          sizeRelationOf: ((minifiedCode.length / output.js.length) * 100).toFixed(2) + "%",
          time: ((((new Date()) - startedAt) / 1000).toFixed(3) + "s"),
        };
      }
    }
  }
  Bundle_as_CompilationResult_if_file_is_root:
  if (fileParameters.isRoot) {
    output = new this.constructor.CompilationResult(output, this);
  }
  this._traceOut("_compileRecursively", arguments);
  return output;
}
  /**
 * @name CompilerV6.prototype._fetchCompilable
 * @type 
 * @description 
 */
_fetchCompilable(compilationFile, compilationProcess) {
  this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._fetchCompilable»");
  this.assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.prototype._fetchCompilable»");
  // console.log(compilationFile.resource);
  this.assert((/\.(js|css|md)$/g).test(compilationFile.resource), `Parameter «compilationFile.resource» now «${compilationFile.resource}» must match with valid extension on «CompilerV6.prototype._fetchCompilable»`);
  Sacar_la_extension_del_fichero: {
    compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
  }
  Propagar_la_extension_al_proceso_si_es_la_primera: {
    if(typeof compilationProcess.extension === "undefined") {
      compilationProcess.extension = compilationFile.extension;
    }
  }
  Bloquear_imports_segun_extension_de_compilable_original: {
    if(compilationProcess.extension === "js") {
      // @OK, con js todo.
    } else if(compilationProcess.extension === "css") {
      this.assert(compilationFile.extension !== "js", `From a «css» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
    } else if(compilationProcess.extension === "md") {
      this.assert(compilationFile.extension !== "js", `From an «md» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
      this.assert(compilationFile.extension !== "css", `From an «md» file «${compilationProcess.resource}» cannot inject «css» file «${compilationFile.resource}»`);
    }
  }
  return this._readPath(compilationFile.resource).then(source => {
    compilationFile.source = source;
    return compilationFile.compilation[compilationFile.extension] = source;
  });
}
  
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionGet
 * @type 
 * @description 
 */
_compileAsModulerSectionGet(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionGet", arguments);
    return false;
  }
}
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionSet
 * @type 
 * @description 
 */
_compileAsModulerSectionSet(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionSet", arguments);
    return false;
  }
}
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionDelete
 * @type 
 * @description 
 */
_compileAsModulerSectionDelete(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionDelete", arguments);
    return false;
  }
}
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionExpand
 * @type 
 * @description 
 */
_compileAsModulerSectionExpand(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionExpand", arguments);
    return false;
  }
}
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionOverwrite
 * @type 
 * @description 
 */
_compileAsModulerSectionOverwrite(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionOverwrite", arguments);
    return false;
  }
}
  /**
 * @name CompilerV6.prototype._compileAsModulerSectionFill
 * @type 
 * @description 
 */
_compileAsModulerSectionFill(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerSectionFill", arguments);
    return false;
  }
}

  /**
 * @name CompilerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectSource", arguments);
  let parameters, targetPath, targetCompilation, targetInjection;
  const {
    tokenization,
    source,
    resource,
    isRoot,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    });
  }
  Extend_token: {
    this._extendToken(token, ["referenceOf"]);
  }
  Extract_target_path: {
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectSource»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    Use_processedEntries_cache_if_possible: {
      if (compilationProcess.to === "data") {
        break Use_processedEntries_cache_if_possible;
      }
      if (compilationProcess.uncacheInjections) {
        // @CHATGPT:
        // se está perdiendo la info del compilationProcess.uncacheInjections en el test que lo lanzo con el --uncacheInjections
        // parece que hay coherencia entre las transformaciones
        // dime dónde quieres que ponga logs o asserts si quieres
        // pero aquí no entra aunque el comando se lo lance con command(["touch", "--file", "file-tal.js", "--uncacheInjections"])
        break Use_processedEntries_cache_if_possible;
      }
      if (Object.keys(compilationProcess.processedEntries).length) {
        if (targetPath in compilationProcess.processedEntries) {
          targetInjection = await require("fs").promises.readFile(compilationProcess.processedEntries[targetPath].distJs, "utf8");
          break Compile_target;
        }
      }
    }
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    this.assert(compilationFile.extension === "js", `Syntax of «$compiler.inject.source» should only be available on «js» files and not on «${compilationFile.extension}»`);
    this.assert(targetPath.endsWith(".js"), `Syntax of «$compiler.inject.source» on file «${targetPath}» is trying to import foraneous extension format from file «${targetPath}» on «CompilerV6.prototype._compileAsInjectSource»`);
    if (!targetInjection) {
      targetInjection = targetCompilation.js;
    }
    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], targetInjection);
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjectSource", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsInjectString
 * @type 
 * @description 
 */
async _compileAsInjectString(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjectString", arguments);
  let parameters, targetPath, fileContent;
  const {
    tokenization,
    source,
    resource,
    isRoot,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    });
  }
  Extend_token: {
    this._extendToken(token, ["referenceOf"]);
  }
  Extract_target_path: {
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectString»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    fileContent = await this._readPath(targetPath);
  }
  Inject_in_compilation_text: {
    if (compilationFile.extension !== "js") {
      break Inject_in_compilation_text;
    }
    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], this._getStringForDevelopment(fileContent));
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjectString", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsMultilineCommentCodeInjection
 * @type 
 * @description 
 */
_compileAsMultilineCommentCodeInjection() {
  this._trace("_compileAsMultilineCommentCodeInjection", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsMultilineCommentValueInjection
 * @type 
 * @description 
 */
_compileAsMultilineCommentValueInjection() {
  this._trace("_compileAsMultilineCommentValueInjection", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsModulerImport
 * @type 
 * @description 
 */
async _compileAsModulerImport(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerImport", arguments);
    return false;
  }
  this._traceIn("_compileAsModulerImport", arguments);
  let parameters, namedParameters = {}, targetPaths = [];
  const {
    tokenization,
    source,
    resource,
    isRoot,
    subcompiler,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    }, {
      onError(error) {
        return error;
      }
    });
  }
  if(parameters instanceof Error) {
    Handle_errors_evaluating_parameters: {
      // @OK: no compilation or path guessing if parameters can not be evaluated
      console.error(`The load of inner parameters of token type «$moduler.import» on file «${compilationFile.resource}» could not be retrieved maybe because of runtime code that cannot be solved on compilation-time on «ModulerV6.prototype._compileAsModulerImport»`);
      console.error(parameters);
    }
  } else {
    Extract_targets_path: {
      namedParameters = this.moduler._formatImportParameters(parameters, compilationFile.resource);
      // @CAUTION: esta línea está en experimental, pero debería ser así
      targetPaths = (namedParameters.file ? [namedParameters.file] : []).concat(namedParameters.dependencies);
    }
    Extend_token: {
      token.dependenciesOf = targetPaths;
    }
    Compile_all_targets: {
      for(let indexTarget=0; indexTarget<targetPaths.length; indexTarget++) {
        const targetPath = targetPaths[indexTarget];
        const targetCompilation = await subcompiler._compileRecursively({
          resource: subcompiler.fullpathOf(targetPath),
          isRoot: false,
        }, compilationProcess);
        Inject_in_compilation_text: {
          // @OK: no code injection on moduler.import
        }
        Inject_in_report_object: {
          this._reportFileToken(compilationFile, targetPath, token);
          Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
        }
      }
    }
  }
  this._traceOut("_compileAsModulerImport", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsModulerExport
 * @type 
 * @description 
 */
async _compileAsModulerExport(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsModulerExport", arguments);
    return false;
  }
  this._traceIn("_compileAsModulerExport", arguments);
  let parameters, namedParameters = {}, targetPaths = [];
  const {
    tokenization,
    source,
    resource,
    isRoot,
    subcompiler,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    }, {
      onError(error) {
        return error;
      }
    });
  }
  if(parameters instanceof Error) {
    Handle_errors_evaluating_parameters: {
      // @OK: no compilation or path guessing if parameters can not be evaluated
      console.error(`The load of inner parameters of token type «$moduler.export» on file «${compilationFile.resource}» could not be retrieved maybe because of runtime code that cannot be solved on compilation-time on «ModulerV6.prototype._compileAsModulerExport»`);
      console.error(parameters);
    }
  } else {
    Extract_targets_path: {
      namedParameters = this.moduler._formatExportParameters(parameters, compilationFile.resource);
      targetPaths = (namedParameters.file ? [namedParameters.file] : []).concat(namedParameters.dependencies);
    }
    Extend_token: {
      token.dependenciesOf = targetPaths;
    }
    Compile_all_targets: {
      for(let indexTarget=0; indexTarget<targetPaths.length; indexTarget++) {
        const targetPath = targetPaths[indexTarget];
        const targetCompilation = await subcompiler._compileRecursively({
          resource: subcompiler.fullpathOf(targetPath),
          isRoot: false,
        }, compilationProcess);
        Inject_in_compilation_text: {
          // @OK: no code injection on moduler.export
        }
        Inject_in_report_object: {
          this._reportFileToken(compilationFile, targetPath, token);
          Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
        }
      }
    }
  }
  this._traceOut("_compileAsModulerExport", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsRequires
 * @type 
 * @description 
 */
async _compileAsRequires(compilationFile, compilationProcess, { token, tokenIndex }) {
  if (compilationProcess.to !== "data") {
    this._trace("_compileAsRequires", arguments);
    return false;
  }
  this._traceIn("_compileAsRequires", arguments);
  let parameters, targetPath, targetCompilation;
  const {
    tokenization,
    source,
    resource,
    isRoot,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    });
  }
  Extend_token: {
    this._extendToken(token, ["referenceOf"]);
  }
  Extract_target_path: {
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsRequires»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    // @OK: nothing to add to the main sources, by @requires
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsRequires", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsInjects
 * @type 
 * @description 
 */
async _compileAsInjects(compilationFile, compilationProcess, { token, tokenIndex }) {
  this._traceIn("_compileAsInjects", arguments);
  let parameters, targetPath, targetCompilation;
  const {
    tokenization,
    source,
    resource,
    isRoot,
  } = compilationFile;
  Evaluate_parameters: {
    parameters = await this._getDataForTokenCompilation({
      compilationFile,
      compilationProcess,
      token,
      tokenIndex,
    });
  }
  Extend_token: {
    this._extendToken(token, ["referenceOf"]);
  }
  Extract_target_path: {
    this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjects»");
    targetPath = token.referenceOf.fullpath;
  }
  Compile_target: {
    targetCompilation = await this._compileRecursively({
      resource: targetPath,
      isRoot: false,
    }, compilationProcess);
  }
  Inject_in_compilation_text: {
    if (compilationFile.resource.endsWith(".js")) {
      // Cuando desde un JS se hace @injects...
      let replacement = "";
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» should not be used to import «js» files from «js» files. Use another syntax instead, like «$v6.injects.source» or «commented template injection» on «CompilerV6.prototype._compileAsInjects»");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
    } else if (compilationFile.resource.endsWith(".css")) {
      let replacement = "";
      // Cuando desde un CSS se hace @injects...
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «css» files. Use another syntax instead.");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.css = this._replaceTextRange(compilationFile.compilation.css, token.location[0], token.location[1], replacement);
    } else if (compilationFile.resource.endsWith(".md")) {
      // Cuando desde un MD se hace @injects...
      let replacement = "";
      if (targetPath.endsWith("js")) {
        // ...a un .js
        throw new Error("Syntax of «@injects» can't be used to import «js» files from «md» files. Use another syntax instead.");
        replacement = targetCompilation.js;
      } else if (targetPath.endsWith("css")) {
        // ...a un .css
        throw new Error("Syntax of «@injects» can't be used to import «css» files from «md» files. Use another syntax instead.");
        compilationFile.compilation.css += "\n" + targetCompilation.css;
      } else if (targetPath.endsWith("md")) {
        // ...a un .md
        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
      } else {
        // ...a otro formato
        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`)
      }
      compilationFile.compilation.md = this._replaceTextRange(compilationFile.compilation.md, token.location[0], token.location[1], replacement);
    } else {
      throw new Error(`Syntax of «@injects» should only be available on «css,md» files and not on «${compilationFile.extension}»`);
    }
  }
  Inject_in_report_object: {
    if (compilationProcess.to !== "data") {
      break Inject_in_report_object;
    }
    this._reportFileToken(compilationFile, targetPath, token);
    Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
  }
  this._traceOut("_compileAsInjects", arguments);
}
  /**
 * @name CompilerV6.prototype._compileAsJavadocComment
 * @type 
 * @description 
 */
_compileAsJavadocComment() {
  this._trace("_compileAsJavadocComment", arguments);
}
  /**
 * @name CompilerV6.prototype._initializeLogger
 * @type 
 * @description 
 */
_initializeLogger(directory) {
  this._trace("_initializeLogger", arguments);
  return this._logger = this.constructor.Logger.Manager.fromDirectory(directory, this);
}
  /**
 * @name CompilerV6.prototype._reportFileToken
 * @type 
 * @description 
 */
_reportFileToken(compilationFile, targetBrute, token) {
  this._traceIn("_reportFileToken", arguments);
  const owner = this.rootdirOf(compilationFile.resource);
  const target = this.rootdirOf(targetBrute);
  if (!(owner in compilationFile.report.tree)) {
    compilationFile.report.tree[owner] = {};
  }
  const reportedToken = this._cloneStructureAsJson(token);
  delete reportedToken.location;
  compilationFile.report.tree[owner][token.location.join("-")] = reportedToken;
  this._traceOut("_reportFileToken", arguments);
}
  /**
 * @name CompilerV6.prototype._getPreferredOutput
 * @type 
 * @description 
 */
_getPreferredOutput(compilationFile, compilationProcess) {
  this._trace("_getPreferredOutput", arguments);
  return {
    file: compilationFile.resource,
    report: compilationProcess.to === "data" ? compilationFile.report : false,
    ...compilationFile.compilation,
  };
}
  /**
 * @name CompilerV6.prototype._hydrateParameters
 * @type 
 * @description 
 */
_hydrateParameters(parametersSource) {
  this._trace("_hydrateParameters", arguments);
  // @ATTENTION: Diu-a-fondiskiuts
  return (new Function(`return [${parametersSource}]`)).call();
}
  /**
 * @name CompilerV6.prototype._cloneForFile
 * @type 
 * @description 
 */
_cloneForFile(resource, compiler = false) {
  this._traceIn("_cloneForFile", arguments);
  this.assert(typeof resource === "string", "Parameter «resource» must be string on «CompilerV6.prototype._cloneForFile»");
  this.assert(typeof this.basedir === "string", "Property «this.basedir» must be string on «CompilerV6.prototype._cloneForFile»");
  const dirpath = require("path").dirname(this.fullpathOf(resource));
  const clone = new this.constructor(dirpath, compiler || this);
  this._traceOut("_cloneForFile", arguments);
  return clone;
}
  /**
 * @name CompilerV6.prototype._cloneStructureAsJson
 * @type 
 * @description 
 */
_cloneStructureAsJson(data) {
  return JSON.parse(JSON.stringify(data));
}
  /**
 * @name CompilerV6.prototype._extendToken
 * @type 
 * @description 
 */
_extendToken(token, fields = [], submoduler = false) {
  this._trace("_extendToken", arguments);
  return Object.assign(token, !fields.includes("referenceOf") ? {} : {
    referenceOf: (() => {
      const entry = this._hydrateParameters(token.inner)[0];
      const fullpath = this.fullpathOf(entry);
      const rootpath = this.rootdirOf(fullpath);
      return { type: "file", entry, fullpath, rootpath };
    })(),
  });
}
  /**
 * @name CompilerV6.prototype._getDataForTokenCompilation
 * @type 
 * @description 
 */
async _getDataForTokenCompilation(input, options = {}) {
  this._traceIn("_getDataForTokenCompilation", arguments);
  this.assert(typeof input === "object", "Parameter «input» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationFile === "object", "Parameter «input.compilationFile» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationFile.resource === "string", "Parameter «input.compilationFile.resource» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.compilationProcess === "object", "Parameter «input.compilationProcess» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  this.assert(typeof input.token === "object", "Parameter «input.token» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
  this.assert(typeof input.token.inner === "string", "Parameter «input.token.inner» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
  // this.assert(typeof input.tokenIndex === "number", "Parameter «input.tokenIndex» must be number on «CompilerV6.prototype._getDataForTokenCompilation»");
  let output, parameters = undefined;
  if(typeof options.onError === "function") {
    try {
      parameters = this._hydrateParameters(input.token.inner);
      Checks: {
        this.assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» extracting parameters from resource «${input.resource}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
      }
      output = parameters;
    } catch (error) {
      output = options.onError(error, parameters);
    }
  } else {
    parameters = this._hydrateParameters(input.token.inner);
    Checks: {
      this.assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
    }
    output = parameters;
  }
  this._traceOut("_getDataForTokenCompilation", arguments);
  return output;
}
  /**
 * @name CompilerV6.prototype._getStringForDevelopment
 * @type 
 * @description 
 */
_getStringForDevelopment(text, tab = 0) {
  this._trace("_getStringForDevelopment", arguments);
  return text.split("\n").map(line => JSON.stringify(line)).join("\n + ");
}
  /**
 * @name CompilerV6.prototype.normalizationOf
 * @type 
 * @description 
 */
normalizationOf(nodepath, origin = false) {
  this._trace("normalizationOf", arguments);
  return this.moduler.normalizationOf(nodepath);
}
  /**
 * @name CompilerV6.prototype.rootdirOf
 * @type 
 * @description 
 */
rootdirOf(fullpath) {
  this._trace("rootdirOf", arguments);
  // return this.moduler.rootdirOf(fullpath);
  const normalization = this.normalizationOf(fullpath);
  return normalization.startsWith(this.rootdir + "/") ? normalization.replace((this.rootdir + "/"), "@/") : normalization;
}
  /**
 * @name CompilerV6.prototype.fullpathOf
 * @type 
 * @description 
 */
fullpathOf(nodepath) {
  this._trace("fullpathOf", arguments);
  if(nodepath.startsWith("@/")) {
    return require("path").resolve(this.rootdir, nodepath.substr(2));
  }
  return require("path").resolve(this.basedir, nodepath);
}
  /**
 * @name CompilerV6.prototype.compile
 * @type 
 * @description 
 */
async compile(resource, options = {}) {
  return this._compileRecursively({
    resource: this.normalizationOf(resource),
    isRoot: true,
  }, {
    ...options,
  });
}
  /**
 * @name CompilerV6.prototype.setBasedir
 * @type 
 * @description 
 */
setBasedir(basedir) {
  this.basedir = this.normalizationOf(basedir);
  this.moduler.basedir = this.basedir;
}
  /**
 * @name CompilerV6.prototype.setRootdir
 * @type 
 * @description 
 */
setRootdir(rootdir) {
  this.rootdir = this.normalizationOf(rootdir);
  this.moduler.rootdir = this.rootdir;
}
  /**
 * @name CompilerV6.prototype.log
 * @type 
 * @description 
 */
log(...args) {
  if (!this._logger) {
    this._logger = new this.constructor.Logger({ file: false }, this);
  }
  this._logger.log(...args);
}
};
  return CompilerV6;
}.call());;
  return class DevBinaryV6 {
  /**
   * @name DevBinaryV6
   * @type 
   * @description 
   */
  /**
 * @name DevBinaryV6.static.create
 * @type 
 * @description 
 */
static create(...args) {
  return new this(...args);
}
  /**
 * @name DevBinaryV6.static.fromRootDirectoryOf
 * @type 
 * @description 
 */
static fromRootDirectoryOf(dir, file = "package.json") {
  return this.Utils.findFirstParentDirectoryContaining(dir, file).then(upperDir => new this(upperDir));
}
  /**
 * @name DevBinaryV6.static.Refrescador
 * @type 
 * @description 
 */
static Refrescador = require(`${__dirname}/refrescador/refrescador.api.dist.js`);
  /**
 * @name DevBinaryV6.static.CompilerV6
 * @type 
 * @description 
 */
static CompilerV6 = CompilerV6;
  /**
 * @name DevBinaryV6.static.Cronometer
 * @type 
 * @description 
 */
static Cronometer = () => {

  let tasks = Object.assign({}, { counter: 0 });
  
  const getTask = function(name) {
    if (tasks[name]) return tasks[name];
    tasks[name] = {
      name,
      openedAt: null,
      lastMarkAt: null,
      stoppedAt: null,
      marks: [],
      open(label) {
        const now = new Date();
        this.openedAt = now;
        this.lastMarkAt = now;
        this.stoppedAt = null;
        this.marks = [];
        this.order = tasks.counter++;
        if(label) this.mark(label);
        return this;
      },
      mark(label) {
        const now = new Date();
        this.marks.push({
          label,
          fromLast: now - this.lastMarkAt,
          fromStart: now - this.openedAt
        });
        this.lastMarkAt = now;
        return this;
      },
      stop(label) {
        if(label) this.mark(label);
        this.stoppedAt = new Date();
        return this;
      },
    };
    return tasks[name];
  }

  getTask.export = function () {
    return Object.values(tasks).map(task => ({
      name: task.name,
      fromStart: task.stoppedAt - task.openedAt,
      marks: (task.marks || []).map(it => `·${it.fromStart} | +${it.fromLast} | #${it.label}`),
    }));
  };

  getTask.print = function () {
    const out = getTask.export();
    return console.log(JSON.stringify(out, null, 2)) || out;
  };

  getTask.reset = function () {
    tasks = Object.assign({}, { counter: 0 });
  };

  return getTask;

};
  /**
 * @name DevBinaryV6.static.ModulerV6
 * @type 
 * @description 
 */
static ModulerV6 = CompilerV6.ModulerV6;
  /**
 * @name DevBinaryV6.static.Utils
 * @type 
 * @description 
 */
static Utils = /**
 * @name DevBinaryV6.Utils.class
 * @type 
 * @description 
 */
class DevBinaryV6Utils {
  /**
 * @name DevBinaryV6.Utils.static.defaultTouchFileOptions
 * @type 
 * @description 
 */
static defaultTouchFileOptions(overrider = {}) {
  return {
    propagateUp: true,
    ...overrider,
  };
}
  /**
 * @name DevBinaryV6Utils.findFirstParentDirectoryContaining
 * @type 
 * @description 
 */
static async findFirstParentDirectoryContaining(dirBrute, file = "package.json", includingSelf = true) {
  const fs = require("fs").promises;
  const path = require("path");
  const dir = path.resolve(dirBrute);
  let dir2 = includingSelf ? dir : path.dirname(dir);
  let prevDir2 = undefined;
  let selectedDir = false;
  Search_directory_up:
  while(dir2 !== prevDir2) {
    const filepath = path.resolve(dir2, file);
    try {
      await fs.readFile(filepath, "utf8");
      selectedDir = dir2;
      break Search_directory_up;
    } catch (error) {
      // @OK
    }
    prevDir2 = dir2;
    dir2 = path.dirname(dir2);
  }
  if(selectedDir) {
    return selectedDir;
  }
  throw new Error(`No directory up found with file «${file}» from directory «${dir}» on «DevBinaryV6Utils.findFirstParentDirectoryContaining»`);
}
  /**
 * @name DevBinaryV6.Utils.prototype.assert
 * @type 
 * @description 
 */
assert(...args) {
  return this.devbin.moduler.assert(...args);
}
  /**
 * @name DevBinaryV6.Utils.prototype.parseCliArgs
 * @type 
 * @description 
 */
parseCliArgs(args) {
  this.assert(typeof args === "object", `Parameter «args» must be object on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  this.assert(Array.isArray(args), `Parameter «args» must be array on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  this.assert(args.length !== 0, `Parameter «args» must have at least 1 item on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  let params = { _: [] };
  let selected = "_"
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg.startsWith("-")) {
      selected = arg;
      params[selected] = params[selected] || [];
    } else {
      params[selected].push(arg);
    }
  }
  return params;
}
  /**
 * Unifica los argumentos parseados de la CLI.
 *
 * args:
 * {
 *   _: ["param1", "param2"],
 *   "--option": ["a", "b"],
 *   "-o": ["c"]
 * }
 *
 * definition:
 * {
 *   option: {
 *     alias: ["-o"],
 *     onFormat(list) {
 *       return list[list.length - 1];
 *     },
 *     description: "..."
 *   }
 * }
 */
formatCliArgs(definition = false, argsBrute = process.argv) {
  // Si no hay definición simplemente devolvemos una copia.
  this.assert(typeof definition === "object", "Parameter «definition» must be object on «DevBinaryV6.Utils.prototype.formatCliArgs»");
  Validate_arguments: {
    this.assert(typeof argsBrute === "object", "Parameter «args» must be object on «DevBinary.Utils.prototype.formatCliArgs»");
    this.assert(argsBrute !== null, "Parameter «args» cannot be null on «DevBinary.Utils.prototype.formatCliArgs»");
  }
  let args, result, usedKeys;
  Initialize_args: {
    args = Array.isArray(argsBrute) ? this.parseCliArgs(argsBrute) : argsBrute;
  }
  result = {};
  Initialize_positionals: {
    result._ = args ? args._ : [];
  }
  usedKeys = new Set(["_"]);
  Iterating_definition_entries:
  for (const [name, config] of Object.entries(definition)) {
    const longKey = "--" + name;
    const aliases = config.alias || [];
    const sources = [];
    if (longKey in args) {
      sources.push({
        key: longKey,
        value: args[longKey]
      });
    }
    Iterating_aliases:
    for (const alias of aliases) {
      if (alias in args) {
        sources.push({
          key: alias,
          value: args[alias]
        });
      }
    }
    // Si aparecen varias fuentes distintas, es ambiguo.
    if (sources.length > 1) {
      throw new Error(`Option "${name}" was specified multiple times (${sources.map(v => v.key).join(", ")}).`);
    }
    if (sources.length === 0) {
      if("default" in config) {
        result[name] = config.default;
      }
      continue Iterating_definition_entries;
    }
    usedKeys.add(longKey);
    for (const alias of aliases) {
      usedKeys.add(alias);
    }
    let value = sources[0].value;
    if (typeof config.onFormat === "function") {
      value = config.onFormat.call(this, [...value]);
    }
    result[name] = value;
  }
  // Detectar opciones desconocidas
  Iterating_keys:
  for (const key of Object.keys(args)) {
    if (usedKeys.has(key)) {
      continue Iterating_keys;
    }
    if (key.startsWith("-")) {
      throw new Error(`Unknown option "${key}".`);
    }
    result[key] = args[key];
  }
  return result;
}
  /**
 * @name DevBinaryV6.Utils.prototype.compileDistribuiblesOf
 * @type 
 * @description 
 */
async compileDistribuiblesOf(filepath, event) {
  let compilation, srcDistJs, srcDistCss, srcDistMd, distJs, distCss, distMd, report;
  Initialize_report: {
    report = {};
  }
  Get_compilation: {
    compilation = await this.devbin.compiler.compile(filepath, {
      processedEntries: event.processedEntries,
      uncacheInjections: event.uncacheInjections,
    });
  }
  Get_dist_filepaths: {
    const outputNames = this.getDistribuibleFilenamesOf(compilation.file);
    const inputDir = require("path").dirname(outputNames.file);
    const inputRootdir = this.devbin.compiler.rootdirOf(inputDir);
    const outputDir = this.devbin.compiler.fullpathOf(inputRootdir.replace(/^\@\//g, "@/dist/"));
    distJs = require("path").resolve(outputDir, outputNames.js);
    distCss = require("path").resolve(outputDir, outputNames.css);
    distMd = require("path").resolve(outputDir, outputNames.md);
    srcDistJs = require("path").resolve(inputDir, outputNames.js);
    srcDistCss = require("path").resolve(inputDir, outputNames.css);
    srcDistMd = require("path").resolve(inputDir, outputNames.md);
    report.names = outputNames;
  }
  Make_assertions_for_safety: {
    this.assert(distJs.endsWith(".dist.js"));
    this.assert(distCss.endsWith(".dist.css"));
    this.assert(distMd.endsWith(".md"));
    this.assert(distJs.includes("/dist/"));
  }
  Overwrite_dist_files: {
    await this.ensureDirectoryOf(distJs);
    if (compilation.js) {
      await require("fs").promises.writeFile(distJs, compilation.js, "utf8");
      // Antes se creaba un .dist en el source:
      // await require("fs").promises.writeFile(srcDistJs, compilation.js, "utf8");
      report.js = distJs;
      Save_in_touch_event_cache: {
        // Antes estaba esto:
        // event.processedEntries[compilation.file] = compilation;
        event.processedEntries[compilation.file] = { distJs };
      }
    }
    if (compilation.css) {
      await require("fs").promises.writeFile(distCss, compilation.css, "utf8");
      await require("fs").promises.writeFile(srcDistCss, compilation.css, "utf8");
      report.css = distCss;
      // No cache para css ni md:
      // event.processedEntries[distCss] = compilation.css;
    }
    if (compilation.md) {
      await require("fs").promises.writeFile(distMd, compilation.md, "utf8");
      await require("fs").promises.writeFile(srcDistMd, compilation.md, "utf8");
      report.md = distMd;
      // No cache para css ni md:
      // event.processedEntries[distMd] = compilation.md;
    }
  }
  Feedback_report: {
    return report;
  }
}
  /**
 * @name DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf
 * @type 
 * @description 
 */
getDistribuibleFilenamesOf(fileBrute) {
  let file, filename, fileExtension;
  file = require("path").basename(fileBrute);
  if(file.endsWith(".entry.js")) {
    filename = file.substr(0, file.length - ".entry.js".length);
    fileExtension = "js";
  } else if(file.endsWith(".entry.css")) {
    filename = file.substr(0, file.length - ".entry.css".length);
    fileExtension = "css";
  } else if(file.endsWith(".entry.md")) {
    filename = file.substr(0, file.length - ".entry.md".length);
    fileExtension = "md";
  } else {
    throw new Error(`Parameter «file» must end with «.entry.js», «.entry.css» or «.entry.md» but it is «${file}» on «DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf»`);
  }
  return {
    file: fileBrute,
    rootdir: this.devbin.compiler.rootdirOf(fileBrute),
    rootdirDirectory: require("path").dirname(this.devbin.compiler.rootdirOf(fileBrute)),
    basename: file,
    extension: fileExtension,
    test: filename + ".test.js",
    js: filename + ".dist.js",
    css: filename + ".dist.css",
    md: filename + ".md",
  };
}
  /**
 * @name DevBinaryV6.Utils.prototype.fabricateUnitTestFileOf
 * @type 
 * @description 
 */
async fabricateUnitTestFileOf(filepath, event) {
  const path = require("path");
  const fs = require("fs");
  const testunitFile = path.resolve(event.distribution.names.rootdirDirectory.replace(/^\@\/src/g, this.devbin.compiler.fullpathOf("@/test/unit/src")), event.distribution.names.test);
  const devBinaryV6Filepath = this.devbin.compiler.fullpathOf("@/dev/bin.js");
  const devBinaryV6RelativeFilepath = path.relative(path.dirname(testunitFile), devBinaryV6Filepath);
  const relativeTarget = path.relative(path.dirname(testunitFile), event.distribution.js);
  const testunitContent = `const devbin = require(__dirname + ${JSON.stringify("/" + devBinaryV6RelativeFilepath)});\nconst target = require(__dirname + ${JSON.stringify("/" + relativeTarget)});\n\ndevbin.assert(true, "Test is empty right now");`
  const testunitDir = path.dirname(testunitFile);
  await fs.promises.mkdir(testunitDir, { recursive: true });
  await fs.promises.writeFile(testunitFile, testunitContent, "utf8");
  return {
    unitDir: testunitDir,
    unitFile: testunitFile,
    unitContent: testunitContent,
    targetFile: event.distribution.names.file,
  };
}
  /**
 * @name DevBinaryV6.Utils.prototype.executeUnitTestFileOf
 * @type 
 * @description 
 */
executeUnitTestFileOf(filepath, event) {
  if(false) {
    return require(event.testFabrication.unitFile);
  }
}
  /**
 * @name DevBinaryV6.Utils.prototype.propagateUpTouchEventFrom
 * @type 
 * @description 
 */
async propagateUpTouchEventFrom(filepath, event = {}) {
  const fs = require("fs");
  const path = require("path");
  let nextPropagationFiles = [];
  let dir = path.dirname(path.dirname(path.resolve(filepath)));
  Iterating_entries:
  while (true) {
    const entries = await fs.promises.readdir(dir, {
      withFileTypes: true
    });
    const matchedEntries = entries.filter(e => {
      return e.isFile() && (e.name.endsWith(".entry.js") || e.name.endsWith(".entry.css") || e.name.endsWith(".entry.md"));
    }).map(e => path.resolve(e.path, e.name));
    if (matchedEntries.length) {
      nextPropagationFiles = matchedEntries;
      break Iterating_entries;
    }
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      return null; // Hemos llegado a la raíz.
    }
    dir = parentDir;
  }
  const file0 = nextPropagationFiles[0];
  await Promise.all(nextPropagationFiles.map(file => {
    return this.touchFile(file, {
      propagateUp: false,
      processedEntries: event.processedEntries || {},
    });
  }));
  return this.propagateUpTouchEventFrom(file0, event);
}
  /**
 * @name DevBinaryV6.Utils.prototype.ensureDirectoryOf
 * @type 
 * @description 
 */
ensureDirectoryOf(file) {
  return require("fs").promises.mkdir(require("path").dirname(file), { recursive: true }).catch(error => false);
}
  /**
 * @name DevBinaryV6.Utils.prototype.touchFile
 * @type 
 * @description 
 */
async touchFile(file, optionsInput = {}) {
  this.assert(typeof file === "string", `Parameter «--file» must be string and not «${typeof file}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const fs = require("fs");
  const path = require("path");
  const filepath = this.devbin.compiler.fullpathOf(file);
  this.assert(this.devbin.compiler.rootdirOf(filepath).startsWith("@/src"), `Parameter «--file» must start with «${this.devbin.compiler.rootdir}» but it is «${filepath}» on «DevBinaryV6.Utils.prototype.touchFile»`);
  const event = this.constructor.defaultTouchFileOptions({
    propagateUp: true,
    processedEntries: {},
    ...optionsInput,
  });
  this.assert(optionsInput.uncacheInjections === event.uncacheInjections, "Las inyections 2");
  // console.log(event.uncacheInjections);
  event.isJsEntry = filepath.endsWith(".entry.js");
  event.isCssEntry = filepath.endsWith(".entry.css");
  event.isMdEntry = filepath.endsWith(".entry.md");
  const isEntry = event.isJsEntry || event.isCssEntry || event.isMdEntry;
  Processing_entry: {
    if (!isEntry) {
      console.log(`[*] Touch event not triggered because file is not entry: ${filepath}`) || -1;
      break Processing_entry;
    }
    Paso_1_compilar_distribuibles: {
      Object.assign(event, {
        distribution: await this.compileDistribuiblesOf(filepath, event),
      });
    }
    Paso_2_fabricar_test_unitario: {
      Object.assign(event, {
        testFabrication: await this.fabricateUnitTestFileOf(filepath, event),
      });
    }
    Paso_3_ejecutar_test_unitario: {
      Object.assign(event, {
        testExecution: await this.executeUnitTestFileOf(filepath, event),
      });
    }
  }
  Propagating_touch_up: {
    Paso_4_propagar_evento_arriba: {
      Object.assign(event, {
        touchPropagation: event.propagateUp ? await this.propagateUpTouchEventFrom(filepath, event) : false,
      });
    }
  }
  return event;
}
  /**
 * @name DevBinaryV6.Utils.prototype.ensureCoreFrom
 * @type 
 * @description 
 */
async ensureCoreFrom(basedirInput, parametersInput = {}) {

  const basedir = this.devbin.compiler.normalizationOf(basedirInput);

  const parameters = Object.assign({}, {
    ignoreErrors: false,
    allowDirtyDirectory: false,
    dontOverride: false,
  }, parametersInput, {
    from: basedirInput,
  });

  const fs = require("fs");
  const path = require("path");
  const targetDir = path.resolve(parameters.from);
  const innerFiles = await fs.promises.readdir(targetDir);

  if (!parameters.allowDirtyDirectory) {
    this.assert(innerFiles.length === 0, `Parameter «--from» should point to an empty directory but «${targetDir}» is not empty on «DevBinaryV6.Utils.prototype.ensureCoreFrom»`);
  }

  const initialPackageJson = {
    name: "name-of-the-project",
    bin: {},
    main: "dist/main.dist.js",
    scripts: {
      test: "echo 'no tests now'"
    },
    author: "allnulled",
    version: "1.0.0",
  };

  const utils = {};
  
  Object.assign(utils, {
    _createDirectory: function (dir) {
      return fs.promises.mkdir(dir);
    },
    _saveFile: async function (file, contents) {
      if (parameters.dontOverride && await utils._existsFile(file)) {
        return;
      }
      return await fs.promises.writeFile(file, contents, "utf8");
    },
    _duplicateFile: async function (src, dst) {
      if (parameters.dontOverride && await utils._existsFile(dst)) {
        return;
      }
      return await fs.promises.copyFile(src, dst);
    },
    _duplicateDirectory: function (src, dst) {
      // @CAUTION: aquí no hay filtro de dontOverride
      return fs.promises.cp(src, dst, { recursive: true });
    },
    _readFile: function (src) {
      return fs.promises.readFile(src, "utf8");
    },
    trify: function (callback, errorSignal = false) {
      return async function (...args) {
        try {
          return await callback(...args);
        } catch (error) {
          return errorSignal;
        }
      };
    },
  });

  Object.assign(utils, {
    _existsFile: utils.trify(utils._readFile, false),
  });


  const createDirectory = parameters.ignoreErrors ? utils.trify(utils._createDirectory) : utils._createDirectory;
  const saveFile = parameters.ignoreErrors ? utils.trify(utils._saveFile) : utils._saveFile;
  const duplicateFile = parameters.ignoreErrors ? utils.trify(utils._duplicateFile) : utils._duplicateFile;
  const duplicateDirectory = parameters.ignoreErrors ? utils.trify(utils._duplicateDirectory) : utils._duplicateDirectory;

  await createDirectory(`${targetDir}/dev`);
  await createDirectory(`${targetDir}/dev/bin`);
  await createDirectory(`${targetDir}/dev/bin/help`);
  await createDirectory(`${targetDir}/src`);
  await createDirectory(`${targetDir}/src/lib`);
  await createDirectory(`${targetDir}/dist`);
  await createDirectory(`${targetDir}/dist/src`);
  await createDirectory(`${targetDir}/dist/src/lib`);
  await createDirectory(`${targetDir}/test`);
  await createDirectory(`${targetDir}/test/unit`);
  await createDirectory(`${targetDir}/test/unit/src`);
  await createDirectory(`${targetDir}/docs`);
  
  await saveFile(`${targetDir}/package.json`, JSON.stringify(initialPackageJson, null, 2), "utf8");
  
  await saveFile(`${targetDir}/dev/bin/help/command.js`, 'module.exports = async function() {\n  throw new Error("Command «help» is not coded yet");\n};', "utf8");
  await saveFile(`${targetDir}/dev/run.js`, "#!/usr/bin/env node\n\nmodule.exports = require(`${__dirname}/bin.js`).selfDispatch();", "utf8");
  await saveFile(`${targetDir}/dev/bin.js`, "#!/usr/bin/env node\n\nrequire(`${__dirname}/../dist/src/lib/dev-binary-v6.dist.js`);\n\nmodule.exports = DevBinaryV6.create(`${__dirname}/..`);", "utf8");
  
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/src/lib/moduler-v6.entry.js`);
  await duplicateFile(`${__dirname}/moduler-v6.dist.js`, `${targetDir}/dist/src/lib/moduler-v6.dist.js`);
  
  await duplicateFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/src/lib/compiler-v6.entry.js`);
  await duplicateFile(`${__dirname}/compiler-v6.dist.js`, `${targetDir}/dist/src/lib/compiler-v6.dist.js`);
  
  await duplicateFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/src/lib/dev-binary-v6.entry.js`);
  await duplicateFile(`${__dirname}/dev-binary-v6.dist.js`, `${targetDir}/dist/src/lib/dev-binary-v6.dist.js`);

  await duplicateFile(`${__dirname}/refrescador.dist.js`, `${targetDir}/src/lib/refrescador.entry.js`);
  await duplicateFile(`${__dirname}/refrescador.dist.js`, `${targetDir}/dist/src/lib/refrescador.dist.js`);
  await duplicateDirectory(`${__dirname}/refrescador`, `${targetDir}/src/lib/refrescador`, { recursive: true });
  await duplicateDirectory(`${__dirname}/refrescador`, `${targetDir}/dist/src/lib/refrescador`, { recursive: true });

  return { targetDir };

}
  /**
 * @name DevBinaryV6.Utils.constructor
 * @type 
 * @description 
 */
constructor(devbin) {
  this.devbin = devbin;
}
};
  /**
 * @name DevBinaryV6.static.ShadowCommands
 * @type 
 * @description 
 */
static ShadowCommands = /**
 * @name DevBinaryV6.ShadowCommands.class
 * @type 
 * @description 
 */
class DevBinaryV6ShadowCommands {
  /**
 * @name DevBinaryV6.Hooks.constructor
 * @type 
 * @description 
 */
constructor(devbin) {
  this.devbin = devbin;
}
  /**
 * @name DevBinaryV6.ShadowCommands.prototype.assert
 * @type 
 * @description 
 */
assert(...args) {
  return this.devbin.assert(...args);
}
  /**
 * @name DevBinaryV6.ShadowCommands.prototype.new project
 * @type 
 * @description 
 */
"new project"(args, devbin) {
  
  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Empty directory from which to start the new project"
    }
  }, args);
  
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['new project']»`);

  return devbin.utils.ensureCoreFrom(parameters.from, {
    ignoreErrors: 0,
    allowDirtyDirectory: 0,
  });

}
  /**
 * @name DevBinaryV6.ShadowCommands.prototype.ensure core
 * @type 
 * @description 
 */
async "ensure core"(args, devbin) {

  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Any directory from which to ensure the core os a devbin project"
    }
  }, args);
  
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['ensure core']»`);

  return devbin.utils.ensureCoreFrom(parameters.from, {
    ignoreErrors: 1,
    allowDirtyDirectory: 1,
    dontOverride: 1,
  });

}
  /**
 * @name DevBinaryV6.Hooks.prototype.loop
 * @type 
 * @description 
 */
async loop(args) {
  const targetRoot = await this.devbin.utils.constructor.findFirstParentDirectoryContaining(process.cwd(), "package.json");
  const targetDir = require("path").resolve(targetRoot, "src");
  return this.devbin.constructor.Refrescador.run({
    watch: [
      targetDir,
    ],
    bulletproof: false,
    ignore: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/*.dist.*",
      "**/logs/**/*",
      "**/test/assets/unit/**/*"
    ],
    port: 3005,
    debounce: 0,
    extensions: [
      "sh",
      "ts",
      "tsx",
      "txt",
      "js",
      "json",
      "css",
      "html",
      "md",
    ],
    execute: [
      'dev/run.js touch --file @{refrescador.file}',
    ],
    message: "El tiempo de refrescar ha llegado",
    messageFile: "TODO.md",
    payload: 'console.log("📟 Evento de refrescar activado");',
    // ignoreCallback: __dirname + "/ignorer.js",
    // executeCallback: ["file/from/cwd/target.js",],
    // payloadFile: 'browser-payload.js',
    // serve: 'some/static/www',
    // urlPrefix: 'static/subpath/on/server',
  });
}
  /**
 * @name DevBinaryV6.ShadowCommands.prototype.touch
 * @type 
 * @description 
 */
touch(args) {
  const parameters = this.devbin.utils.formatCliArgs({
    file: {
      onFormat: this.devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Target file. Must be js, css or md."
    },
    trace: {
      onFormat: this.devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-t"],
      description: "Message to use as traceable property."
    },
    uncacheInjections: {
      onFormat: this.devbin.constructor.Formatters.asBoolean,
      default: false,
      alias: ["-ui"],
      description: "To not use cache for files type «.entry.js». Defaults to false, so, it is used by default."
    }
  }, args);
  this.assert(typeof parameters.file === "string", `Parameter «--file» is required as string on «DevBinaryV6.ShadowCommands.prototype.touch»`);
  return this.devbin.utils.touchFile(parameters.file, {
    uncacheInjections: parameters.uncacheInjections,
  });
}
};
  /**
 * @name DevBinaryV6.static.Formatters
 * @type 
 * @description 
 */
static Formatters = {
  asString: function(values) {
    return values.at(-1);
  },
  asBoolean: function(values) {
    return true;
  },
};
  /**
 * @name DevBinaryV6.prototype.cronometer
 * @type 
 * @description 
 */
cronometer = this.constructor.Cronometer();
  /**
 * @name DevBinaryV6.prototype.assert
 * @type 
 * @description 
 */
assert(...args) {
  return this.moduler.assert(...args);
}
  /**
 * @name DevBinaryV6.prototype.command
 * @type 
 * @description 
 */
async command(args = []) {
  let commandParameters, commandSubpath, commandCallback, commandType;
  Format_input: {
    if (Array.isArray(args)) {
      commandParameters = this.utils.parseCliArgs(args);
      break Format_input;
    } else if (typeof args === "object") {
      commandParameters = args;
      break Format_input;
    }
    throw new Error(`Parameter «args» must be array or object but «${typeof args}» was found instead on «DevBinary.prototype.command»`);
  }
  Define_path_from_command: {
    commandSubpath = this.compiler.normalizationOf(`./dev/bin/${commandParameters._.join("/")}/command.js`);
  }
  Load_command_callback_from_file_or_shadowCommands: {
    let isReadable = undefined;
    First_file: {
      try {
        // Check if its readable:
        await require("fs").promises.readFile(commandSubpath, "utf8");
        isReadable = true;
      } catch (error) {
        isReadable = false;
      }
    }
    Second_hook: {
      if (isReadable) {
        commandType = "file";
        commandCallback = require(commandSubpath);
      } else {
        commandType = "hook";
        const possibleHookId = commandParameters._.join(" ");
        if (possibleHookId in this.shadowCommands) {
          commandCallback = this.shadowCommands[possibleHookId];
          break Load_command_callback_from_file_or_shadowCommands;
        }
        throw new Error(`Could not find any command «${commandParameters._.join("/")}/command.js» at «${commandSubpath}» or any hook «${commandParameters._.join(" ")}» on «DevBinaryV6.prototype.command»`);
      }
    }
  }
  Execute_command_callback: {
    return await commandCallback.call(this.shadowCommands, commandParameters, this, commandType, commandSubpath);
  }
}
  /**
 * @name DevBinaryV6.prototype.selfDispatch
 * @type 
 * @description 
 */
selfDispatch() {
  return this.command([...process.argv].splice(2));
  throw new Error("Method «selfDispatch» is not coded yet");
}
  /**
 * @name DevBinaryV6.prototype.cloneForFile
 * @type 
 * @description 
 */
cloneForFile(resource, devbin = false) {
  this.assert(typeof resource === "string", "Parameter «resource» must be string on «DevBinaryV6.prototype.cloneForFile»");
  const dirpath = require("path").dirname(this.compiler.fullpathOf(resource));
  const clone = new this.constructor(dirpath, devbin);
  return clone;
}
  /**
 * @name DevBinaryV6.static.globalInstance
 * @type 
 * @description 
 */
static globalInstance = new DevBinaryV6();
  /**
 * @name DevBinaryV6.constructor
 * @type 
 * @description 
 */
constructor(basedir, parent = null) {
  /**
 * @name DevBinaryV6.prototype.compiler
 * @type 
 * @description 
 */
this.compiler = new CompilerV6(basedir || process.cwd(), ...(parent ? [parent.compiler] : []));
  /**
 * @name DevBinaryV6.prototype.moduler
 * @type 
 * @description 
 */
this.moduler = this.compiler.moduler;
  /**
 * @name DevBinaryV6.prototype.utils
 * @type 
 * @description 
 */
this.utils = parent ? parent.utils : new this.constructor.Utils(this);
  /**
 * @name DevBinaryV6.prototype.shadowCommands
 * @type 
 * @description 
 */
this.shadowCommands = parent ? parent.shadowCommands : new this.constructor.ShadowCommands(this);
}
};
}.call());