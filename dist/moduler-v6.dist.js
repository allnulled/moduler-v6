(function(mod) {
    if (typeof ModulerV6 !== "undefined") return ModulerV6;
    if (typeof window !== "undefined") window["ModulerV6"] = mod;
    if (typeof global !== "undefined") global["ModulerV6"] = mod;
})(function() {
    return class ModulerV6 {
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
        static CssManager=class CssManager {
            constructor() {
                this.sheets = [];
            }
            addSheet(id, cssContent) {}
            removeSheet(id) {}
        };
        static assert(condition, message) {
            if (!condition) throw new this.AssertionError(message);
        }
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
        constructor(basedir, cloneOf = null) {
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
                    return {
                        id: signature[0],
                        file: signature[0],
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
        readFile(file) {
            return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
        }
        readUrl(url) {
            return fetch(this.normalizationOf(url), {
                method: "GET"
            }).then(response => response.text());
        }
        readPath(url) {
            return this._isBrowser ? this._readUrl(url) : this._readFile(url);
        }
        assert(condition, message) {
            return this.constructor.assert(condition, message);
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
        import(...signature) {
            const parameters = this._formatImportParameters(signature);
        }
        export(...signature) {
            const parameters = this._formatExportParameters(signature);
        }
    };
}.call());