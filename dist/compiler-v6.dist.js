(function(mod) {
    if (typeof CompilerV6 !== "undefined") return CompilerV6;
    if (typeof window !== "undefined") window["CompilerV6"] = mod;
    if (typeof global !== "undefined") global["CompilerV6"] = mod;
    if (typeof module !== "undefined") module.exports = mod;
})(function() {
    const ModulerV6 = class ModulerV6 {
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        };
        static CssManager=class CssManager {
            constructor() {
                this.sheets = [];
            }
            addSheet(id, cssContent) {}
            removeSheet(id) {}
        };
        static Parser=function(mod) {
            if (typeof window !== "undefined") window["TextParserV1"] = mod;
            if (typeof global !== "undefined") global["TextParserV1"] = mod;
            return mod;
        }(function() {
            const TextParserV1 = class TextParserV1 {
                static default=this;
                static symbols={
                    PARENTHESYS_BALANCE: {}
                };
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
                        if (typeof grammar[2] === "undefined" || grammar[2] === null) {
                            grammar[2] = it => it;
                        }
                        if (typeof grammar[3] === "undefined" || grammar[3] === null) {
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
                    const formattedOutput = {
                        size: text.length,
                        text: text,
                        tokens: tokens,
                        formatted: []
                    };
                    Iterating_tokens: for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
                        const token = tokens[tokenIndex];
                        Iterating_grammars: for (let indexGrammar = 0; indexGrammar < this.grammars.length; indexGrammar++) {
                            const grammar = this.grammars[indexGrammar];
                            const [starter, ender, formatter, options] = grammar;
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
                        output: []
                    };
                    Iterating_text: while (state.position < text.length) {
                        Iterating_grammars: for (let index = 0; index < this.grammars.length; index++) {
                            const grammar = this.grammars[index];
                            const [starter, ender, formatter, options] = grammar;
                            const isMatchingStarter = text.startsWith(starter, state.position);
                            On_not_matched: if (!isMatchingStarter) {
                                continue Iterating_grammars;
                            }
                            const countingFrom = state.position + starter.length;
                            let offset = 0;
                            let wasEnded = false;
                            Processing_match: if (typeof ender === "string") {
                                while (countingFrom + offset < text.length) {
                                    const currentPosition = countingFrom + offset;
                                    const isMatchingEnder = text.startsWith(ender, currentPosition);
                                    if (isMatchingEnder) {
                                        wasEnded = true;
                                        state.output.push({
                                            starter: starter,
                                            location: [ state.position, currentPosition + ender.length ],
                                            inner: text.substring(countingFrom, currentPosition),
                                            outer: text.substring(state.position, currentPosition + ender.length)
                                        });
                                        break Processing_match;
                                    }
                                    offset++;
                                }
                                if (!wasEnded) throw new Error(`Unclosed starter of grammar «${starter}» reached end of text but «${ender}» was not found on grammar index «${index}»`);
                            } else if (ender === this.constructor.symbols.PARENTHESYS_BALANCE) {
                                let openedParenthesys = 1;
                                let wasEnded = false;
                                while (countingFrom + offset < text.length) {
                                    const currentPosition = countingFrom + offset;
                                    if (text[currentPosition] === "(") {
                                        openedParenthesys++;
                                    } else if (text[currentPosition] === ")") {
                                        openedParenthesys--;
                                        if (openedParenthesys === 0) {
                                            wasEnded = true;
                                            state.output.push({
                                                starter: starter,
                                                location: [ state.position, currentPosition ],
                                                inner: text.substring(countingFrom, currentPosition),
                                                outer: text.substring(state.position, currentPosition + 1)
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
        }.call());
        static assert(condition, message) {
            if (!condition) throw new this.AssertionError(message);
        }
        static isBrowser=typeof window !== "undefined";
        static nativeGrammars={
            InjectSource: [ "$compiler.inject.source(", this.Parser.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject Source",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            InjectString: [ "$compiler.inject.string(", this.Parser.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject String",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            ImportJs: [ "$moduler.import(", this.Parser.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Moduler Import",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            ExportJs: [ "$moduler.export(", this.Parser.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Moduler Export",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            MultilineCommentValueInjection: [ "/*%=", "%*/", function(token) {
                return {
                    syntax: "Multiline Comment Value Injection",
                    ...token
                };
            } ],
            AtRequires: [ "/*@requires:", "*/", function(token) {
                return {
                    syntax: "@Requires",
                    ...token
                };
            } ],
            AtInjects: [ "/*@injects:", "*/", function(token) {
                return {
                    syntax: "@Injects",
                    ...token
                };
            } ],
            JavadocComment: [ "/**", "*/", function(token) {
                return {
                    syntax: "Javadoc Comment",
                    ...token
                };
            }, {
                allowInside: true
            } ]
        };
        static defaultGrammars={
            forJs: [ this.nativeGrammars.InjectSource, this.nativeGrammars.InjectString, this.nativeGrammars.ImportJs, this.nativeGrammars.ExportJs, this.nativeGrammars.MultilineCommentValueInjection, this.nativeGrammars.AtRequires, this.nativeGrammars.AtInjects, this.nativeGrammars.JavadocComment ],
            forCss: [ this.nativeGrammars.InjectSource, this.nativeGrammars.InjectString, this.nativeGrammars.ImportJs, this.nativeGrammars.ExportJs, this.nativeGrammars.MultilineCommentValueInjection, this.nativeGrammars.AtRequires, this.nativeGrammars.AtInjects, this.nativeGrammars.JavadocComment ],
            forMd: [ this.nativeGrammars.InjectSource, this.nativeGrammars.InjectString, this.nativeGrammars.ImportJs, this.nativeGrammars.ExportJs, this.nativeGrammars.MultilineCommentValueInjection, this.nativeGrammars.AtRequires, this.nativeGrammars.AtInjects, this.nativeGrammars.JavadocComment ]
        };
        static symbols={
            REGEX_FOR_SLASH_AT_THE_END: /(\\|\/)$/g,
            REGEX_FOR_PROTOCOL_BASED_PATH: /^([A-Za-z0-9\-\_\$]*)\:\/\//g,
            REGEX_FOR_ABSOLUTE_WINDOWS_PATH: /^(([A-Za-z]:(\\|\/))|((\\|\/){2}))/g
        };
        static getEnvironmentDirectory() {
            if (this.isBrowser) {
                return window.location.origin;
            } else {
                return process.cwd();
            }
        }
        constructor(basedirArg = null, cloneOf = null) {
            const basedir = basedirArg === null ? this.constructor.getEnvironmentDirectory() : basedirArg;
            this.assert(typeof basedir === "string", `Parameter «basedir» must be string and not «${typeof basedir}» on «ModulerV6.constructor»`);
            this.assert(typeof cloneOf === "object", "Parameter «cloneOf» must be object on «ModulerV6.constructor»");
            this.assert(typeof basedir === "string", `Parameter «basedir» must be string on «Moduler.constructor»`);
            this.basedir = basedir;
            this.rootdir = cloneOf ? cloneOf.rootdir : basedir;
            this.modules = {};
            this.grammars = {
                forJs: this.constructor.defaultGrammars.forJs,
                forCss: this.constructor.defaultGrammars.forCss,
                forMd: this.constructor.defaultGrammars.forMd
            };
            this.parser = {
                forJs: this.constructor.Parser.create(this.grammars.forJs),
                forCss: this.constructor.Parser.create(this.grammars.forCss),
                forMd: this.constructor.Parser.create(this.grammars.forMd)
            };
        }
        _formatImportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype._formatImportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.import cannot have 0 arguments");
            if (signature.length === 1) {
                if (typeof signature[0] === "string") {
                    const isId = signature[0].startsWith("#");
                    return {
                        id: isId ? signature[0] : null,
                        file: !isId ? signature[0] : null,
                        dependencies: [],
                        factory: null
                    };
                } else if (typeof signature[0] === "object") {
                    return {
                        id: null,
                        file: null,
                        dependencies: signature[0],
                        factory: null
                    };
                } else if (typeof signature[0] === "function") {
                    return {
                        id: null,
                        file: null,
                        dependencies: [],
                        factory: signature[0]
                    };
                } else {
                    this.assert(false, `ModulerV6.prototype.import used with 1 argument does not support the signature: ${typeof signature[0]}`);
                }
            } else if (signature.length === 2) {
                if (typeof signature[0] === "object" && typeof signature[1] === "function") {
                    return {
                        id: null,
                        file: null,
                        dependencies: signature[0],
                        factory: signature[1]
                    };
                } else {
                    this.assert(false, `ModulerV6.prototype.import used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
                }
            } else {
                this.assert(false, `ModulerV6.prototype.import cannot have ${signature.length} arguments`);
            }
        }
        _formatExportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype._formatExportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.export cannot have 0 arguments");
            this.assert(signature.length !== 1, "ModulerV6.prototype.export cannot have 1 argument only");
            this.assert(typeof signature[0] === "string", "ModulerV6.prototype.export first argument must be a string");
            this.assert(signature[0].startsWith("#"), "ModulerV6.prototype.export first argument must be a string starting with «#»");
            if (signature.length === 2) {
                if (typeof signature[0] === "string" && typeof signature[1] === "function") {
                    return {
                        id: signature[0],
                        file: null,
                        dependencies: [],
                        factory: signature[1]
                    };
                } else if (typeof signature[0] === "string" && typeof signature[1] === "string") {
                    return {
                        id: signature[0],
                        file: null,
                        dependencies: [ signature[1] ],
                        factory: null
                    };
                } else if (typeof signature[0] === "string" && typeof signature[1] === "object") {
                    return {
                        id: signature[0],
                        file: null,
                        dependencies: signature[1],
                        factory: null
                    };
                } else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
                }
            } else if (signature.length === 3) {
                if (typeof signature[0] === "string" && typeof signature[1] === "object" && typeof signature[2] === "function") {
                    return {
                        id: signature[0],
                        file: null,
                        dependencies: signature[1],
                        factory: signature[2]
                    };
                } else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}, ${typeof signature[2]}`);
                }
            } else {
                this.assert(false, `ModulerV6.prototype.export cannot have ${signature.length} arguments`);
            }
        }
        _joinPaths(subpaths, origin = false) {
            this.assert(Array.isArray(subpaths), `Parameter «subpaths» must be array on «ModulerV6.prototype._joinPaths»`);
            this.assert(subpaths.length !== 0, `Parameter «subpaths.length» cannot be 0 on «ModulerV6.prototype._joinPaths»`);
            let out = "";
            Join_paths_overwritting_when_required: for (let index = 0; index < subpaths.length; index++) {
                const subpath = subpaths[index];
                this.assert(typeof subpath === "string", `Parameter «subpaths[${index}]» must be string too on «ModulerV6.prototype._joinPaths»`);
                this.assert(typeof subpath !== "", `Parameter «subpaths[${index}]» cannot be empty string on «ModulerV6.prototype._joinPaths»`);
                if (subpath.includes("://")) {
                    this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_PROTOCOL_BASED_PATH), `Paths can only have «://» at the begining, and preceded only by a protocol id, if any in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
                    out = subpath;
                } else if (subpath.includes(":\\") || subpath.includes(":/") || subpath.startsWith("\\\\") || subpath.startsWith("//")) {
                    this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_ABSOLUTE_WINDOWS_PATH), `Paths can only have «:\\|:/|\\\\|//» at the begining, and preceded only by a standard Windows disk unit identifier, if any in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
                    out = subpath;
                } else if (subpath.startsWith("/")) {
                    out = subpath;
                } else if (subpath.startsWith("./")) {
                    this.assert(typeof this.basedir === "string", `Cannot use «./» expression because «this.basedir» is «${typeof this.basedir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
                    out = this._appendPathSeparator(this.basedir) + subpath.substr(2);
                } else if (subpath.startsWith("../")) {
                    this.assert(typeof this.basedir === "string", `Cannot use «../» expression because «this.basedir» is «${typeof this.basedir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
                    out = this._appendPathSeparator(this.basedir, "..") + subpath.substr(3);
                } else if (subpath.startsWith("@/")) {
                    this.assert(typeof this.rootdir === "string", `Cannot use «@/» expression because «this.rootdir» is «${typeof this.rootdir}» right now in the case of «${subpath}» on «ModulerV6.prototype._joinPaths»`);
                    out = this._appendPathSeparator(this.rootdir) + subpath.substr(2);
                } else {
                    if (out.length) {
                        out = this._appendPathSeparator(out) + subpath;
                    } else {
                        out = subpath;
                    }
                }
            }
            Resolve_one_and_two_dots: {
                const parts = this.splitPath(out);
                const newParts = [];
                for (let index = 0; index < parts.length; index++) {
                    const part = parts[index];
                    if (part === "..") {
                        newParts.pop();
                    } else if (part === ".") {} else {
                        newParts.push(part);
                    }
                }
                out = newParts.join("/");
            }
            return out;
        }
        splitPath(path) {
            const out = [ "" ];
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
        _appendPathSeparator(subpath) {
            return subpath.replace(this.constructor.symbols.REGEX_FOR_SLASH_AT_THE_END, "") + "/";
        }
        _readFile(file) {
            return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
        }
        _readUrl(url) {
            return fetch(this.normalizationOf(url), {
                method: "GET"
            }).then(response => response.text());
        }
        _readPath(url) {
            return this._isBrowser ? this._readUrl(url) : this._readFile(url);
        }
        _wrapInTry(source, parameters = {}, file = null) {
            let js = "";
            js += `try {\n`;
            js += `  ${source}\n`;
            js += `} catch(error) {\n`;
            js += `  console.error("Injection source failed somewhere:", ${JSON.stringify(source)});\n`;
            js += `  console.error("Injection parameters:", ${JSON.stringify(Object.keys(parameters).map(id => id + ":" + typeof parameters[id]))});\n`;
            if (file !== null) {
                js += `  console.error("Injected file:", ${JSON.stringify(file)});\n`;
            }
            js += `  console.error("Injection failed:", error);\n`;
            js += `}`;
            return js;
        }
        _createAsyncFunction(source, parameters = []) {
            return new async function() {}.constructor(...parameters, source);
        }
        assert(condition, message) {
            return this.constructor.assert(condition, message);
        }
        createAssertFunction() {
            return (...args) => this.assert(...args);
        }
        normalizationOf(subpath) {
            this.assert(typeof subpath === "string", `Parameter «subpath» must be string on «ModulerV6.prototype.normalizationOf»`);
            return this._joinPaths([ subpath ], "normalizationOf");
        }
        basedirOf(subpath) {
            const normalized = this._joinPaths([ subpath ], "basedirOf");
            const basedirSeparated = this._appendPathSeparator(this.basedir);
            if (normalized.startsWith(basedirSeparated)) {
                return normalized.replace(basedirSeparated, "./");
            }
            return normalized;
        }
        rootdirOf(subpath) {
            const normalized = this._joinPaths([ subpath ], "rootdirOf");
            const rootdirSeparated = this._appendPathSeparator(this.rootdir);
            if (normalized.startsWith(rootdirSeparated)) {
                return normalized.replace(rootdirSeparated, "@/");
            }
            return normalized;
        }
        cloneForFile(filepath) {
            const dirpath = this._joinPaths([ filepath, ".." ]);
            return new ModulerV6(dirpath, this);
        }
        evaluateFile(file, injections = {}) {
            return this._readPath(file).then(source => this.evaluateSource(source, injections, file));
        }
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
        async import(...signature) {
            let filepath, dependencies;
            const parameters = this._formatImportParameters(signature);
            const {id: _id = null, file: _file = null, dependencies: _dependencies = null, factory: _factory = null} = parameters;
            Resolve_by_id: {
                if (_id) {
                    this.assert(_id in this.modules, `No module named «${_id}» on «ModulerV6.prototype.import»`);
                    return this.modules[_id];
                }
            }
            Resolve_by_file: {
                if (_file) {
                    filepath = this.normalizationOf(_file);
                    if (filepath in this.modules) {
                        return this.modules[filepath];
                    }
                    return this._importFile(filepath);
                }
            }
            Resolve_by_dependencies: {
                if (_dependencies && _dependencies.length) {
                    dependencies = Promise.all(_dependencies.map(dependency => this.import(dependency)));
                    if (!_factory) {
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
            console.log(parameters);
        }
        export(...signature) {
            const parameters = this._formatExportParameters(signature);
        }
        _importFile(filepath) {
            let originalHolder = {};
            const moduleHolder = {
                get exports() {
                    return originalHolder;
                },
                set exports(output) {
                    originalHolder = output;
                }
            };
            this.modules[filepath] = moduleHolder.exports;
            const intermediatePromise = this.evaluateFile(filepath, {
                module: moduleHolder,
                exports: moduleHolder.exports,
                $moduler: this.cloneForFile(filepath)
            });
            return intermediatePromise.then(result => {
                if (typeof result !== "undefined") {
                    this.modules[filepath] = result;
                } else {
                    this.modules[filepath] = originalHolder;
                }
                return this.modules[filepath];
            });
        }
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
                $moduler: this
            });
            return typeof result === "undefined" ? originalHolder : result;
        }
        static globalInstance=new this;
    };
    const CompilerV6 = class CompilerV6 {
        static Parser=ModulerV6.Parser;
        static Tracer=class Tracer {
            constructor(compiler) {
                this.compiler = compiler;
                this.isBrowser = compiler.isBrowser;
                this.isTracing = true;
                this.isLogging = true;
                this.stack = [];
                this.highlightedPatterns = [ [ "assert", "blackBright" ], [ "_compileRecursively", "cyan,underline" ], [ "_tokenizeText", "cyan,underline" ], [ "_compileTokens", "cyan,underline" ], [ ".constructor", "blue" ], [ "_replaceTextRange", "yellow,bold" ] ];
                this.ignoredPatterns = [ "assert" ];
            }
            activate(really = true) {
                this.isTracing = !!really;
                return this;
            }
            deactivate(really = true) {
                this.isTracing = !!!really;
                return this;
            }
            addHighlighter(text) {
                if (highlightedPatterns.indexOf(text) === -1) {
                    highlightedPatterns.push(text);
                }
            }
            removeHighlighter(text) {
                const pos = highlightedPatterns.indexOf(text);
                if (pos !== -1) {
                    highlightedPatterns.splice(pos, 1);
                }
            }
            indentByLevel(input) {
                return " ".repeat(this.stack.length) + input;
            }
            matchesIgnorer(text) {
                for (let index = 0; index < this.ignoredPatterns.length; index++) {
                    const pattern = this.ignoredPatterns[index];
                    if (text.includes(pattern)) {
                        return true;
                    }
                }
                return false;
            }
            highlightIfMatched(output) {
                let styling = false;
                Iterating_patterns: for (let index = 0; index < this.highlightedPatterns.length; index++) {
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
                    if (this.isLogging) {
                        this.compiler.log(CompilerV6.ansi.colors.stripAnsi(output));
                    }
                }
            }
            traceIn(msg, args) {
                this.trace(msg, args, 1);
                this.stack.push(msg);
            }
            traceOut(msg, args) {
                const lastInStack = this.stack[this.stack.length - 1];
                this.stack.pop();
                this.trace(msg, args, -1);
            }
            printStack() {
                console.log(`Tracer «${this.compiler.name || "mv6"}» with:`, this.stack);
            }
        };
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        };
        static Logger=class Logger {
            static fromFile(file) {
                return new this({
                    file: file
                });
            }
            static Manager=class LoggerManager {
                static fromDirectory(basedir) {
                    return new this(basedir);
                }
                constructor(basedir) {
                    this.basedir = basedir;
                    this.selected = "default";
                    this.subloggers = {
                        default: new Logger({
                            file: require("path").resolve(basedir, "default.txt")
                        })
                    };
                }
                get current() {
                    return this.subloggers[this.selected];
                }
                addLogger(id) {
                    this.subloggers[id] = new Logger({
                        file: require("path").resolve(this.basedir, id + ".txt")
                    });
                }
                has(id) {
                    return id in this.subloggers;
                }
                into(id) {
                    if (!this.has(id)) {
                        this.addLogger(id);
                    }
                    return this.subloggers[id];
                }
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
                resetFile(...args) {
                    if (!this.has(this.selected)) {
                        this.addLogger(this.selected);
                    }
                    return this.subloggers[this.selected].resetFile(...args);
                }
                log(...args) {
                    if (!this.has(this.selected)) {
                        this.addLogger(this.selected);
                    }
                    return this.subloggers[this.selected].log(...args);
                }
            };
            static create(...args) {
                return new this(...args);
            }
            static defaultOptions={
                console: true
            };
            constructor(options, compiler) {
                this.options = Object.assign({}, this.constructor.defaultOptions, options);
                this.compiler = compiler;
                this.startedAt = new Date;
                this.lastLogAt = new Date;
            }
            resetFile(...args) {
                return require("fs").promises.writeFile(this.options.file, "", "utf8").then(() => {
                    this.startedAt = new Date;
                    this.lastLogAt = new Date;
                    return this.log(...args);
                });
            }
            getTimeOffset() {
                return "+" + ((new Date).getTime() - this.startedAt.getTime());
            }
            getLastLogOffset() {
                return "+" + ((new Date).getTime() - this.lastLogAt.getTime());
            }
            log(...args) {
                const line = this.stringifySafe({
                    "@": this.getMomentToString(),
                    "#": this.getTimeOffset(),
                    "##": this.getLastLogOffset(),
                    "*": args
                });
                if (this.options.console) {
                    console.log(`~[LOG] ${line}`);
                }
                this.lastLogAt = new Date;
                if (this.options.file) {
                    return require("fs").promises.appendFile(this.options.file, line + "\n", "utf8").catch(console.error);
                }
            }
            setOption(id, value) {
                this.options[id] = value;
                return this;
            }
            getMomentToString() {
                const d = new Date;
                const pad = n => String(n).padStart(2, "0");
                const pad3 = n => String(n).padStart(3, "0");
                return `${d.getFullYear()}-` + `${pad(d.getMonth() + 1)}-` + `${pad(d.getDate())} ` + `${pad(d.getHours())}:` + `${pad(d.getMinutes())}:` + `${pad(d.getSeconds())}.` + `${pad3(d.getMilliseconds())}`;
            }
            stringifySafe(value) {
                const seen = new WeakSet;
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
        static Moduler=ModulerV6;
        static CompilationProcess=class CompilationProcess {
            static assert(condition, message) {
                if (!condition) throw new Error(message);
            }
            static get _defaultProcessData() {
                return {};
            }
            constructor(compilationFile, compilationProcess, compiler) {
                this.constructor.assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationProcess.constructor»");
                this.constructor.assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationProcess.constructor»");
                this.compiler = compiler;
                this.compiler._traceIn("CompilationProcess.constructor", arguments);
                if (compilationProcess instanceof this.constructor) {
                    this.compiler._traceOut("CompilationProcess.constructor", arguments);
                    return Object.assign(this, compilationProcess);
                }
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
            }
            static from(...args) {
                if (args[0] instanceof this.constructor) {
                    return args[0];
                }
                return new this(...args);
            }
        };
        static CompilationFile=class CompilationFile {
            static assert(condition, message) {
                if (!condition) throw new Error(message);
            }
            static get _defaultFileData() {
                return {
                    compilation: {
                        js: "",
                        css: "",
                        md: ""
                    },
                    report: {
                        tree: {}
                    }
                };
            }
            constructor(compilationFile, compilationProcess, compiler) {
                this.constructor.assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationFile.constructor»");
                this.constructor.assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationFile.constructor»");
                this.compiler = compiler;
                this.compiler._traceIn("CompilationFile.constructor", arguments);
                this.compiler.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationFile.constructor»");
                this.compiler.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationFile.constructor»");
                Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultFileData)), compilationFile);
                this.compiler.assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.CompilationFile.constructor»");
                this.compiler.assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «CompilerV6.CompilationFile.constructor»");
                this.compiler._traceOut("CompilationFile.constructor", arguments);
            }
            static from(...args) {
                return new this(...args);
            }
        };
        static CompilationResult=class {
            constructor(output = {}, compiler = null) {
                Object.assign(this, output);
                this.compiler = compiler;
            }
            toFile(file, options = {}) {
                this.compiler.assert(require("path").basename(file).includes(".dist."), `Method «toFile» only accepts files containing «.dist.» pattern and file «${file}» does not incur the case`);
                const fileExtension = require("path").extname(file);
                const fileNormalization = this.compiler.normalizationOf(file);
                const fileJs = this.compiler.constructor._changeFileExtension(fileNormalization, ".js");
                const fileCss = this.compiler.constructor._changeFileExtension(fileNormalization, ".css");
                const fileMd = this.compiler.constructor._changeFileExtension(fileNormalization, ".md");
                const promises = [];
                if (this.js) {
                    const outputJs = options.mode === "beautified" && this.beautifiedJs ? this.beautifiedJs.code : options.mode === "minified" && this.minifiedJs ? this.minifiedJs.code : this.js;
                    promises.push(require("fs").promises.writeFile(fileJs, outputJs, "utf8"));
                } else if (this.css) {
                    promises.push(require("fs").promises.writeFile(fileCss, this.css, "utf8"));
                } else if (this.md) {
                    promises.push(require("fs").promises.writeFile(fileMd, this.md, "utf8"));
                }
                return Promise.all(promises);
            }
            toJsonable() {
                return Object.assign({}, this, {
                    compiler: undefined,
                    moduler: undefined
                });
            }
        };
        static _nativeGrammars=ModulerV6.nativeGrammars;
        static _defaultGrammars=ModulerV6.defaultGrammars;
        static _changeFileExtension(file, nuevaExt) {
            const path = require("path");
            if (!nuevaExt.startsWith(".")) {
                nuevaExt = "." + nuevaExt;
            }
            const dir = path.dirname(file);
            const nombre = path.basename(file, path.extname(file));
            return path.join(dir, nombre + nuevaExt);
        }
        static beautifyJs(code) {
            return require("prettier").format(code, {
                parser: "babel"
            });
        }
        static softMinifyJs(code) {
            return require("terser").minify(code, {
                compress: {
                    sequences: true
                },
                mangle: false,
                toplevel: true,
                format: {
                    comments: false,
                    beautify: true,
                    indent_level: 2,
                    max_line_len: true
                }
            });
        }
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
                }
            });
        }
        static getStringSize(text) {
            let bytes = undefined;
            if (this.isBrowser) {
                bytes = (new TextEncoder).encode(text).length;
            } else {
                bytes = Buffer.byteLength(text, "utf8");
            }
            if (bytes < 1024 * 1024) {
                return `${(bytes / 1024).toFixed(2)}KB`;
            } else {
                return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
            }
        }
        static create(...args) {
            return new this(...args);
        }
        static fromDirectory(dir) {
            return new this(dir);
        }
        static async fromRootOf(file) {
            const root = await this.findRootOf(file);
            return new this(root);
        }
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
        static ansi={
            colors: Object.assign({
                available: {
                    bold: [ 1, 22 ],
                    italic: [ 3, 23 ],
                    underline: [ 4, 24 ],
                    blink: [ 5, 25 ],
                    inverse: [ 7, 27 ],
                    strike: [ 9, 29 ],
                    black: [ 30, 39 ],
                    red: [ 31, 39 ],
                    green: [ 32, 39 ],
                    yellow: [ 33, 39 ],
                    blue: [ 34, 39 ],
                    magenta: [ 35, 39 ],
                    cyan: [ 36, 39 ],
                    white: [ 37, 39 ],
                    bgBlack: [ 40, 49 ],
                    bgRed: [ 41, 49 ],
                    bgGreen: [ 42, 49 ],
                    bgYellow: [ 43, 49 ],
                    bgBlue: [ 44, 49 ],
                    bgMagenta: [ 45, 49 ],
                    bgCyan: [ 46, 49 ],
                    bgWhite: [ 47, 49 ],
                    blackBright: [ 90, 39 ],
                    redBright: [ 91, 39 ],
                    greenBright: [ 92, 39 ],
                    yellowBright: [ 93, 39 ],
                    blueBright: [ 94, 39 ],
                    magentaBright: [ 95, 39 ],
                    cyanBright: [ 96, 39 ],
                    whiteBright: [ 97, 39 ],
                    bgBlackBright: [ 100, 49 ],
                    bgRedBright: [ 101, 49 ],
                    bgGreenBright: [ 102, 49 ],
                    bgYellowBright: [ 103, 49 ],
                    bgBlueBright: [ 104, 49 ],
                    bgMagentaBright: [ 105, 49 ],
                    bgCyanBright: [ 106, 49 ],
                    bgWhiteBright: [ 107, 49 ]
                },
                endToken: "[0m",
                squad: {
                    tl: "┌",
                    tr: "┐",
                    bl: "└",
                    br: "┘"
                },
                line: {
                    h: "─",
                    v: "│"
                },
                style: function(config = "red,bold,underline") {
                    const styles = config.split(",");
                    return {
                        text: text => {
                            const begin = styles.reduce((out, it) => {
                                if (!(it in this.available)) {
                                    return out;
                                }
                                const code = this.available[it];
                                out += `[${code[0]}m`;
                                return out;
                            }, "");
                            const end = this.endToken;
                            return `${begin}${text}${end}`;
                        },
                        print(text) {
                            console.log(this.text(text));
                        }
                    };
                },
                stripAnsi: function(str) {
                    return str.replace(/\x1b\[[0-9;]*m/g, "");
                },
                wrapAnsi: function(str, maxWidth) {
                    return require("wrap-ansi").default(str, maxWidth, {
                        hard: true
                    });
                },
                box: function(text, maxWidth = 110) {
                    const lines = this.wrapAnsi(text, maxWidth).split("\n");
                    const cleanLines = lines.map(l => this.stripAnsi(l));
                    const width = Math.max(...cleanLines.map(l => l.length));
                    const top = "┌" + "─".repeat(width + 2) + "┐";
                    const bottom = "└" + "─".repeat(width + 2) + "┘";
                    const body = lines.map(line => {
                        const clean = this.stripAnsi(line);
                        const pad = width - clean.length;
                        return "│ " + line + " ".repeat(pad) + " │";
                    }).join("\n");
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
                    return require("strip-ansi").default(str).length;
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
                }
            })
        };
        constructor(basedirInput, parent = null, grammars = this.constructor._defaultGrammars) {
            if (!(typeof basedirInput === "string")) {
                throw new this.constructor.AssertionError(`Parameter «basedir» must be string not «${typeof basedirInput}» on «CompilerV6.constructor»`);
            }
            if (!(typeof parent === "object")) {
                throw new this.constructor.AssertionError(`Parameter «parent» must be object not «${typeof parent}» on «CompilerV6.constructor»`);
            }
            if (!(typeof grammars === "object")) {
                throw new this.constructor.AssertionError(`Parameter «grammars» must be object not «${typeof grammars}» on «CompilerV6.constructor»`);
            }
            if (parent) {
                this._tracer = parent._tracer;
            }
            this._trace("constructor", arguments);
            const basedir = this.normalizationOf(basedirInput);
            this.basedir = basedir;
            this.isBrowser = typeof window !== "undefined";
            this.previousdir = parent ? parent.basedir : basedir;
            this.rootdir = parent ? parent.rootdir : basedir;
            this._grammars = {
                forJs: this.constructor._defaultGrammars.forJs,
                forCss: this.constructor._defaultGrammars.forCss,
                forMd: this.constructor._defaultGrammars.forMd
            };
            this._parser = {
                forJs: this.constructor.Parser.create(this._grammars.forJs),
                forCss: this.constructor.Parser.create(this._grammars.forCss),
                forMd: this.constructor.Parser.create(this._grammars.forMd)
            };
            this.moduler = parent ? parent.moduler : new ModulerV6(this.basedir);
        }
        _readPath(url) {
            this._trace("_readPath", arguments);
            return this._isBrowser ? this._readUrl(url) : this._readFile(url);
        }
        _readUrl(url) {
            this._trace("_readUrl", arguments);
            return fetch(this.normalizationOf(url), {
                method: "GET"
            }).then(response => response.text());
        }
        _readFile(file) {
            this._trace("_readFile", arguments);
            return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
        }
        assert(condition, message) {
            this._trace("assert", arguments);
            if (!condition) {
                throw new this.constructor.AssertionError(message);
            } else if (this._tracer.isTracing) {
                this._notifyAssertion(message);
            }
        }
        async assertThrows(callback, message, checker = () => true) {
            const localError = new Error("Should have thrown: " + message);
            try {
                await callback();
                throw localError;
            } catch (err) {
                if (err === localError) {
                    throw new this.constructor.AssertionError(`Should have thrown: ${err.name}: ${err.message} | ${err.stack}`);
                }
                if (!checker(err)) {
                    throw new this.constructor.AssertionError(`Should have thrown but not specific error: ${err.name}: ${err.message} | ${err.stack}`);
                }
                this._notifyAssertion(message);
            }
        }
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
        _notifyAssertion(message) {
            const text = `[ok] ${message}`;
            if (this._tracer.isTracing && !this._tracer.matchesIgnorer(text)) {
                console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
            }
        }
        _logger=null;
        _tracer=new this.constructor.Tracer(this);
        _trace(method, args = []) {
            return this._tracer.trace(method, args);
        }
        _traceIn(method, args = []) {
            return this._tracer.traceIn(method, args);
        }
        _traceOut(method, args = []) {
            return this._tracer.traceOut(method, args);
        }
        _debug(...list) {
            for (let index = 0; index < list.length; index++) {
                const item = list[index];
                let output = item;
                try {
                    output = JSON.stringify(item, null, 2);
                } catch (error) {
                    console.warn(error);
                }
                console.log(this.constructor.ansi.colors.style("yellow,bold,underline").text(`[debug] parameter ${index}:`), output);
            }
        }
        _die(...args) {
            this._trace("die", arguments);
            console.log("[DIE]", ...args);
            process.exit(0);
        }
        _tokenizeText(compilationFile, compilationProcess) {
            this._traceIn("_tokenizeText", arguments);
            this.assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.prototype._tokenizeText»");
            this.assert(typeof compilationProcess.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.prototype._tokenizeText»");
            this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._tokenizeText»");
            this.assert(typeof compilationFile.source === "string", "Parameter «compilationFile.source» must be string on «CompilerV6.prototype._tokenizeText»");
            this.assert(typeof compilationFile.extension === "string", "Parameter «compilationFile.extension» must be string on «CompilerV6.prototype._tokenizeText»");
            let out = undefined;
            if (compilationFile.extension === "js") {
                out = this._parser.forJs.parse(compilationFile.source);
            } else if (compilationFile.extension === "css") {
                out = this._parser.forCss.parse(compilationFile.source);
            } else if (compilationFile.extension === "md") {
                out = this._parser.forMd.parse(compilationFile.source);
            } else {
                throw new Error(`File extension cannot be tokenized: «${compilationFile.resource}»`);
            }
            delete out.text;
            compilationFile.tokenization = out;
            this._traceOut("_tokenizeText", arguments);
            return out;
        }
        _replaceTextRange(text, start, end, replacement) {
            this._trace("_replaceTextRange", arguments);
            if (text.length < start) {
                this._tracer.printStack();
                throw new Error("Text replacement out of text boundaries (1)");
            }
            if (text.length < end) {
                this._tracer.printStack();
                throw new Error("Text replacement out of text boundaries (2)");
            }
            const output = text.slice(0, start) + replacement + text.slice(end + 1);
            return output;
        }
        async _compileTokens(compilationFile, compilationProcess) {
            this._traceIn("_compileTokens", arguments);
            const {resource: resource, source: source, tokenization: {formatted: tokens}} = compilationFile;
            const _tokenCompilationSwitcher = {
                "Inject Source": this._compileAsInjectSource,
                "Inject String": this._compileAsInjectString,
                "Multiline Comment Code Injection": this._compileAsMultilineCommentCodeInjection,
                "Multiline Comment Value Injection": this._compileAsMultilineCommentValueInjection,
                "Moduler Import": this._compileAsModulerImport,
                "Moduler Export": this._compileAsModulerExport,
                "@Requires": this._compileAsRequires,
                "@Injects": this._compileAsInjects,
                "Javadoc Comment": this._compileAsJavadocComment
            };
            Iterating_tokens: for (let tokenIndex = tokens.length - 1; tokenIndex >= 0; tokenIndex--) {
                const token = tokens[tokenIndex];
                Extraer_las_rutas_dependencia: {
                    this.assert(token.syntax in _tokenCompilationSwitcher, `Syntax not identified «${token.syntax}»`);
                    const methodCallback = _tokenCompilationSwitcher[token.syntax];
                    await methodCallback.call(this, compilationFile, compilationProcess, {
                        token: token,
                        tokenIndex: tokenIndex
                    });
                }
            }
            this._traceOut("_compileTokens", arguments);
            return compilationFile.compilation;
        }
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
            Add_entry_in_tree: {
                const id = this.rootpathOf(compilationFile.resource);
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
                if (fileParameters.isRoot && (processParameters.beautify || processParameters.minify) && !this.isBrowser && typeof output.js === "string") {
                    const originalSize = this.constructor.getStringSize(output.js);
                    if (processParameters.beautify) {
                        const startedAt = new Date;
                        const beautifiedCode = await this.constructor.beautifyJs(output.js);
                        output.beautifiedJs = {
                            code: beautifiedCode,
                            chars: beautifiedCode.length,
                            originalSize: originalSize,
                            size: this.constructor.getStringSize(beautifiedCode),
                            sizeRelationOf: (beautifiedCode.length / output.js.length * 100).toFixed(2) + "%",
                            time: ((new Date - startedAt) / 1e3).toFixed(3) + "s"
                        };
                    }
                    if (processParameters.minify) {
                        const startedAt = new Date;
                        const minifiedCode = (await this.constructor.hardMinifyJs(output.js)).code;
                        output.minifiedJs = {
                            code: minifiedCode,
                            chars: minifiedCode.length,
                            originalSize: originalSize,
                            size: this.constructor.getStringSize(minifiedCode),
                            sizeRelationOf: (minifiedCode.length / output.js.length * 100).toFixed(2) + "%",
                            time: ((new Date - startedAt) / 1e3).toFixed(3) + "s"
                        };
                    }
                }
            }
            Bundle_as_CompilationResult_if_file_is_root: if (fileParameters.isRoot) {
                output = new this.constructor.CompilationResult(output, this);
            }
            this._traceOut("_compileRecursively", arguments);
            return output;
        }
        _fetchCompilable(compilationFile, compilationProcess) {
            this.assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._fetchCompilable»");
            this.assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.prototype._fetchCompilable»");
            this.assert(/\.(js|css|md)$/g.test(compilationFile.resource), `Parameter «compilationFile.resource» now «${compilationFile.resource}» must match with valid extension on «CompilerV6.prototype._fetchCompilable»`);
            Sacar_la_extension_del_fichero: {
                compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
            }
            Propagar_la_extension_al_proceso_si_es_la_primera: {
                if (typeof compilationProcess.extension === "undefined") {
                    compilationProcess.extension = compilationFile.extension;
                }
            }
            Bloquear_imports_segun_extension_de_compilable_original: {
                if (compilationProcess.extension === "js") {} else if (compilationProcess.extension === "css") {
                    this.assert(compilationFile.extension !== "js", `From a «css» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
                } else if (compilationProcess.extension === "md") {
                    this.assert(compilationFile.extension !== "js", `From an «md» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
                    this.assert(compilationFile.extension !== "css", `From an «md» file «${compilationProcess.resource}» cannot inject «css» file «${compilationFile.resource}»`);
                }
            }
            return this._readPath(compilationFile.resource).then(source => {
                compilationFile.source = source;
                return compilationFile.compilation[compilationFile.extension] = source;
            });
        }
        async _compileAsInjectSource(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            this._traceIn("_compileAsInjectSource", arguments);
            let parameters, targetPath, targetCompilation;
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                });
            }
            Extend_token: {
                this._extendToken(token, [ "referenceOf" ]);
            }
            Extract_target_path: {
                this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectSource»");
                targetPath = token.referenceOf.fullpath;
            }
            Compile_target: {
                targetCompilation = await this._compileRecursively({
                    resource: targetPath,
                    isRoot: false
                }, compilationProcess);
            }
            Inject_in_compilation_text: {
                if (compilationFile.extension === "js") {
                    let replacement = "";
                    if (targetPath.endsWith(".js")) {
                        replacement = targetCompilation.js;
                    } else if (targetPath.endsWith(".css")) {
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «css» files. Use commented @injects syntax instead.`);
                        compilationFile.compilation.css += "\n" + targetCompilation.css;
                    } else if (targetPath.endsWith(".md")) {
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «md» files. Use commented @injects syntax instead.`);
                        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
                    } else {
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» is trying to import foraneous extension`);
                    }
                    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
                } else if (compilationFile.extension === "css") {
                    throw new Error("Syntax of «$compiler.inject.source» should not be available on «css» files");
                } else if (compilationFile.extension === "md") {
                    throw new Error("Syntax of «$compiler.inject.source» should not be available on «md» files");
                } else {
                    throw new Error(`Syntax of «$compiler.inject.source» should only be available on «js» files and not on «${compilationFile.extension}»`);
                }
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
        async _compileAsInjectString(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            this._traceIn("_compileAsInjectString", arguments);
            let parameters, targetPath, fileContent;
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                });
            }
            Extend_token: {
                this._extendToken(token, [ "referenceOf" ]);
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
        _compileAsMultilineCommentCodeInjection() {
            this._trace("_compileAsMultilineCommentCodeInjection", arguments);
        }
        _compileAsMultilineCommentValueInjection() {
            this._trace("_compileAsMultilineCommentValueInjection", arguments);
        }
        async _compileAsModulerImport(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            if (compilationProcess.to !== "data") {
                this._trace("_compileAsModulerImport", arguments);
                return false;
            }
            this._traceIn("_compileAsModulerImport", arguments);
            let parameters, namedParameters = {}, targetPaths = [];
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot, subcompiler: subcompiler} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                }, {
                    onError(error) {
                        return error;
                    }
                });
            }
            if (parameters instanceof Error) {
                Handle_errors_evaluating_parameters: {
                    console.error(`The load of inner parameters of token type «$moduler.import» on file «${compilationFile.resource}» could not be retrieved maybe because of runtime code that cannot be solved on compilation-time on «ModulerV6.prototype._compileAsModulerImport»`);
                    console.error(parameters);
                }
            } else {
                Extract_targets_path: {
                    namedParameters = this._getParametersFromModulerImportSignature(parameters, compilationFile.resource);
                    targetPaths = namedParameters.dependencies;
                }
                Extend_token: {
                    token.dependenciesOf = targetPaths;
                }
                Compile_all_targets: {
                    for (let indexTarget = 0; indexTarget < targetPaths.length; indexTarget++) {
                        const targetPath = targetPaths[indexTarget];
                        const targetCompilation = await subcompiler._compileRecursively({
                            resource: subcompiler.fullpathOf(targetPath),
                            isRoot: false
                        }, compilationProcess);
                        Inject_in_compilation_text: {}
                        Inject_in_report_object: {
                            this._reportFileToken(compilationFile, targetPath, token);
                            Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
                        }
                    }
                }
            }
            this._traceOut("_compileAsModulerImport", arguments);
        }
        async _compileAsModulerExport(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            if (compilationProcess.to !== "data") {
                this._trace("_compileAsModulerExport", arguments);
                return false;
            }
            this._traceIn("_compileAsModulerExport", arguments);
            let parameters, namedParameters = {}, targetPaths = [];
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot, subcompiler: subcompiler} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                }, {
                    onError(error) {
                        return error;
                    }
                });
            }
            if (parameters instanceof Error) {
                Handle_errors_evaluating_parameters: {
                    console.error(`The load of inner parameters of token type «$moduler.export» on file «${compilationFile.resource}» could not be retrieved maybe because of runtime code that cannot be solved on compilation-time on «ModulerV6.prototype._compileAsModulerExport»`);
                    console.error(parameters);
                }
            } else {
                Extract_targets_path: {
                    namedParameters = this._getParametersFromModulerExportSignature(parameters, compilationFile.resource);
                    targetPaths = namedParameters.dependencies;
                }
                Extend_token: {
                    token.dependenciesOf = targetPaths;
                }
                Compile_all_targets: {
                    for (let indexTarget = 0; indexTarget < targetPaths.length; indexTarget++) {
                        const targetPath = targetPaths[indexTarget];
                        const targetCompilation = await subcompiler._compileRecursively({
                            resource: subcompiler.fullpathOf(targetPath),
                            isRoot: false
                        }, compilationProcess);
                        Inject_in_compilation_text: {}
                        Inject_in_report_object: {
                            this._reportFileToken(compilationFile, targetPath, token);
                            Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
                        }
                    }
                }
            }
            this._traceOut("_compileAsModulerExport", arguments);
        }
        async _compileAsRequires(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            if (compilationProcess.to !== "data") {
                this._trace("_compileAsRequires", arguments);
                return false;
            }
            this._traceIn("_compileAsRequires", arguments);
            let parameters, targetPath, targetCompilation;
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                });
            }
            Extend_token: {
                this._extendToken(token, [ "referenceOf" ]);
            }
            Extract_target_path: {
                this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsRequires»");
                targetPath = token.referenceOf.fullpath;
            }
            Compile_target: {
                targetCompilation = await this._compileRecursively({
                    resource: targetPath,
                    isRoot: false
                }, compilationProcess);
            }
            Inject_in_compilation_text: {}
            Inject_in_report_object: {
                if (compilationProcess.to !== "data") {
                    break Inject_in_report_object;
                }
                this._reportFileToken(compilationFile, targetPath, token);
                Object.assign(compilationFile.report.tree, targetCompilation.report.tree);
            }
            this._traceOut("_compileAsRequires", arguments);
        }
        async _compileAsInjects(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
            this._traceIn("_compileAsInjects", arguments);
            let parameters, targetPath, targetCompilation;
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot} = compilationFile;
            Evaluate_parameters: {
                parameters = await this._getDataForTokenCompilation({
                    compilationFile: compilationFile,
                    compilationProcess: compilationProcess,
                    token: token,
                    tokenIndex: tokenIndex
                });
            }
            Extend_token: {
                this._extendToken(token, [ "referenceOf" ]);
            }
            Extract_target_path: {
                this.assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjects»");
                targetPath = token.referenceOf.fullpath;
            }
            Compile_target: {
                targetCompilation = await this._compileRecursively({
                    resource: targetPath,
                    isRoot: false
                }, compilationProcess);
            }
            Inject_in_compilation_text: {
                if (compilationFile.resource.endsWith(".js")) {
                    let replacement = "";
                    if (targetPath.endsWith("js")) {
                        throw new Error("Syntax of «@injects» should not be used to import «js» files from «js» files. Use another syntax instead, like «$v6.injects.source» or «commented template injection» on «CompilerV6.prototype._compileAsInjects»");
                        replacement = targetCompilation.js;
                    } else if (targetPath.endsWith("css")) {
                        compilationFile.compilation.css += "\n" + targetCompilation.css;
                    } else if (targetPath.endsWith("md")) {
                        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
                    } else {
                        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`);
                    }
                    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
                } else if (compilationFile.resource.endsWith(".css")) {
                    let replacement = "";
                    if (targetPath.endsWith("js")) {
                        throw new Error("Syntax of «@injects» can't be used to import «js» files from «css» files. Use another syntax instead.");
                        replacement = targetCompilation.js;
                    } else if (targetPath.endsWith("css")) {
                        compilationFile.compilation.css += "\n" + targetCompilation.css;
                    } else if (targetPath.endsWith("md")) {
                        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
                    } else {
                        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`);
                    }
                    compilationFile.compilation.css = this._replaceTextRange(compilationFile.compilation.css, token.location[0], token.location[1], replacement);
                } else if (compilationFile.resource.endsWith(".md")) {
                    let replacement = "";
                    if (targetPath.endsWith("js")) {
                        throw new Error("Syntax of «@injects» can't be used to import «js» files from «md» files. Use another syntax instead.");
                        replacement = targetCompilation.js;
                    } else if (targetPath.endsWith("css")) {
                        throw new Error("Syntax of «@injects» can't be used to import «css» files from «md» files. Use another syntax instead.");
                        compilationFile.compilation.css += "\n" + targetCompilation.css;
                    } else if (targetPath.endsWith("md")) {
                        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
                    } else {
                        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`);
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
        _compileAsJavadocComment() {
            this._trace("_compileAsJavadocComment", arguments);
        }
        _initializeLogger(directory) {
            this._trace("_initializeLogger", arguments);
            return this._logger = this.constructor.Logger.Manager.fromDirectory(directory, this);
        }
        _reportFileToken(compilationFile, targetBrute, token) {
            this._traceIn("_reportFileToken", arguments);
            const owner = this.rootpathOf(compilationFile.resource);
            const target = this.rootpathOf(targetBrute);
            if (!(owner in compilationFile.report.tree)) {
                compilationFile.report.tree[owner] = {};
            }
            const reportedToken = this._cloneStructureAsJson(token);
            delete reportedToken.location;
            compilationFile.report.tree[owner][token.location.join("-")] = reportedToken;
            this._traceOut("_reportFileToken", arguments);
        }
        _getPreferredOutput(compilationFile, compilationProcess) {
            this._trace("_getPreferredOutput", arguments);
            return {
                file: compilationFile.resource,
                report: compilationProcess.to === "data" ? compilationFile.report : false,
                ...compilationFile.compilation
            };
        }
        _hydrateParameters(parametersSource) {
            this._trace("_hydrateParameters", arguments);
            return new Function(`return [${parametersSource}]`).call();
        }
        _cloneForFile(resource, compiler = false) {
            this._traceIn("_cloneForFile", arguments);
            this.assert(typeof resource === "string", "Parameter «resource» must be string on «CompilerV6.prototype._cloneForFile»");
            this.assert(typeof this.basedir === "string", "Property «this.basedir» must be string on «CompilerV6.prototype._cloneForFile»");
            const dirpath = require("path").dirname(this.fullpathOf(resource));
            const clone = new this.constructor(dirpath, compiler || this);
            this._traceOut("_cloneForFile", arguments);
            return clone;
        }
        _cloneStructureAsJson(data) {
            return JSON.parse(JSON.stringify(data));
        }
        _extendToken(token, fields = [], submoduler = false) {
            this._trace("_extendToken", arguments);
            return Object.assign(token, !fields.includes("referenceOf") ? {} : {
                referenceOf: (() => {
                    const entry = this._hydrateParameters(token.inner)[0];
                    const fullpath = this.fullpathOf(entry);
                    const rootpath = this.rootpathOf(fullpath);
                    return {
                        type: "file",
                        entry: entry,
                        fullpath: fullpath,
                        rootpath: rootpath
                    };
                })()
            });
        }
        async _getDataForTokenCompilation(input, options = {}) {
            this._traceIn("_getDataForTokenCompilation", arguments);
            this.assert(typeof input === "object", "Parameter «input» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
            this.assert(typeof input.token === "object", "Parameter «input.token» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
            this.assert(typeof input.token.inner === "string", "Parameter «input.token.inner» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
            let output, parameters = undefined;
            if (typeof options.onError === "function") {
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
        _getParametersFromModulerExportSignature(parameters, resource = null) {
            this._trace("_getParametersFromModulerExportSignature", arguments);
            this.assert(Array.isArray(parameters), "Parameter «parameters» must be array on «CompilerV6.prototype._getParametersFromModulerExportSignature»");
            const formatted = {};
            if (parameters.length === 1) {
                throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (1)`);
            } else if (parameters.length === 2) {
                if (typeof parameters[0] === "string" && typeof parameters[1] === "string") {
                    Object.assign(formatted, {
                        id: parameters[0],
                        dependencies: [ parameters[1] ],
                        factory: null
                    });
                } else if (typeof parameters[0] === "string" && typeof parameters[1] === "function") {
                    Object.assign(formatted, {
                        id: parameters[0],
                        dependencies: [],
                        factory: parameters[1]
                    });
                } else if (typeof parameters[0] === "string" && typeof parameters[1] === "object") {
                    Object.assign(formatted, {
                        id: parameters[0],
                        dependencies: parameters[1],
                        factory: null
                    });
                } else {
                    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (2)`);
                }
            } else if (parameters.length === 3) {
                if (typeof parameters[0] === "string" && typeof parameters[1] === "object" && typeof parameters[2] === "function") {
                    Object.assign(formatted, {
                        id: parameters[0],
                        dependencies: parameters[1],
                        factory: parameters[2]
                    });
                } else {
                    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (3)`);
                }
            } else {
                throw new Error(`Signature with «${parameters.length}» parameters is not valid for method «$moduler.import» on «CompilerV6.prototype._getParametersFromModulerExportSignature» (5)`);
            }
            return formatted;
        }
        _getParametersFromModulerImportSignature(parameters, resource = null) {
            this._trace("_getParametersFromModulerImportSignature", arguments);
            this.assert(Array.isArray(parameters), `Parameter «parameters» must be array on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature»`);
            const formatted = {};
            if (parameters.length === 1) {
                if (typeof parameters[0] === "string") {
                    if (parameters[0].endsWith(".js")) {
                        Object.assign(formatted, {
                            id: null,
                            dependencies: [ parameters[0] ],
                            factory: null
                        });
                    } else if (parameters[0].endsWith(".css")) {
                        Object.assign(formatted, {
                            id: null,
                            dependencies: [ parameters[0] ],
                            factory: null
                        });
                    } else if (parameters[0].endsWith(".md")) {
                        Object.assign(formatted, {
                            id: null,
                            dependencies: [ parameters[0] ],
                            factory: null
                        });
                    } else {
                        Object.assign(formatted, {
                            id: parameters[0],
                            dependencies: [],
                            factory: null
                        });
                    }
                } else if (Array.isArray(parameters[0])) {
                    Object.assign(formatted, {
                        id: null,
                        dependencies: [],
                        factory: parameters[0]
                    });
                } else if (typeof parameters[0] === "function") {
                    Object.assign(formatted, {
                        id: null,
                        dependencies: [],
                        factory: parameters[0]
                    });
                } else {
                    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (1)`);
                }
            } else if (parameters.length === 2) {
                if (Array.isArray(parameters[0]) && typeof parameters[1] === "function") {
                    Object.assign(formatted, {
                        id: null,
                        dependencies: parameters[0],
                        factory: parameters[1]
                    });
                } else {
                    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (2)`);
                }
            } else if (parameters.length === 3) {
                if (typeof parameters[0] === "string" && Array.isArray(parameters[1]) && typeof parameters[2] === "function") {
                    Object.assign(formatted, {
                        id: parameters[0],
                        dependencies: parameters[1],
                        factory: parameters[2]
                    });
                } else {
                    throw new Error(`Signature «${parameters.map(p => typeof p).join(",")}» not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (3)`);
                }
            } else {
                throw new Error(`Signature with «${parameters.length}» parameters is not valid for method «$moduler.import» on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature» (5)`);
            }
            return formatted;
        }
        _getStringForDevelopment(text, tab = 0) {
            this._trace("_getStringForDevelopment", arguments);
            return text.split("\n").map(line => JSON.stringify(line)).join("\n + ");
        }
        normalizationOf(nodepath, origin = false) {
            this._trace("normalizationOf", arguments);
            const output = require("path").resolve(this.basedir, nodepath);
            if (origin) {
                this._debug("called normalizationOf from: " + origin + " (" + output + ")");
            }
            return output;
        }
        rootpathOf(fullpath) {
            this._trace("rootpathOf", arguments);
            const normalization = this.normalizationOf(fullpath);
            return normalization.startsWith(this.rootdir + "/") ? normalization.replace(this.rootdir + "/", "@/") : normalization;
        }
        fullpathOf(nodepath) {
            this._trace("fullpathOf", arguments);
            return require("path").resolve(this.basedir, nodepath);
        }
        async compile(resource, options = {}) {
            return this._compileRecursively({
                resource: this.normalizationOf(resource),
                isRoot: true
            }, {
                ...options
            });
        }
        log(...args) {
            if (!this._logger) {
                this._logger = new this.constructor.Logger({
                    file: false
                }, this);
            }
            this._logger.log(...args);
        }
    };
    return CompilerV6;
}.call());