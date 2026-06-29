/**
 * @name compiler-v6
 * @type library entrypoint
 * @description ...
 */
(function(mod) {
    if (typeof CompilerV6 !== "undefined") return CompilerV6;
    if (typeof window !== "undefined") window["CompilerV6"] = mod;
    if (typeof global !== "undefined") global["CompilerV6"] = mod;
    if (typeof module !== "undefined") module.exports = mod;
})(function() {
    (function(mod) {
        if (typeof window !== "undefined") window["TextParserV1"] = mod;
        if (typeof global !== "undefined") global["TextParserV1"] = mod;
        // if (typeof module !== 'undefined') module.exports = mod;
                return mod;
    })(function() {
        // @source: https://github.com/allnulled/text-parser-v1/blob/main/text-parser-v1.js
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
                                        // text: text.substring(state.position, currentPosition + ender.length),
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
                                // @TODO: meterse dentro de los strings y escapar paréntesis internos
                                                                if (text[currentPosition] === "(") {
                                    openedParenthesys++;
                                } else if (text[currentPosition] === ")") {
                                    openedParenthesys--;
                                    if (openedParenthesys === 0) {
                                        wasEnded = true;
                                        state.output.push({
                                            starter: starter,
                                            location: [ state.position, currentPosition ],
                                            // text: text.substring(state.position, currentPosition + 1),
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
    const ModulerV6 = class ModulerV6 {
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
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        }
        /**
 * @name ModulerV6.assert
 * @type 
 * @description 
 */;
        static assert(condition, message) {
            if (!condition) throw new this.AssertionError(message);
        }
        /**
 * @name ModulerV6.constructor
 * @type 
 * @description 
 */        constructor(basedir) {
            /**
 * @name ModulerV6.prototype.basedir
 * @type 
 * @description 
 */
            this.basedir = basedir;
            /**
 * @name ModulerV6.prototype.modules
 * @type 
 * @description 
 */            this.modules = {};
        }
        /**
 * @name ModulerV6.prototype.assert
 * @type 
 * @description 
 */        assert(condition, message) {
            if (!condition) throw new this.constructor.AssertionError(message);
        }
        /**
 * @name ModulerV6.prototype.import
 * @type 
 * @description 
 */        import(...signature) {
            const parameters = this._formatImportParameters(signature);
            // @TODO: algoritmo del import
                }
        /**
 * @name ModulerV6.prototype.export
 * @type 
 * @description 
 */        export(...signature) {
            const parameters = this._formatExportParameters(signature);
            // @TODO: algoritmo del export
                }
        /**
 * @name ModulerV6.prototype._formatImportParameters
 * @type 
 * @description 
 */        _formatImportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must have  on «ModulerV6.prototype._formatImportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.import cannot have 0 arguments");
            if (signature.length === 1) {
                if (typeof signature[0] === "string") {
                    // By file or id
                } else if (typeof signature[0] === "object") {
                    // By dependencies
                } else if (typeof signature[0] === "function") {
                    // By pure factory
                } else {
                    this.assert(false, `ModulerV6.prototype.import used with 1 argument does not support the signature: ${typeof signature[0]}`);
                }
            } else if (signature.length === 2) {
                if (typeof signature[0] === "object" && typeof signature[1] === "function") {
                    // By factory with module injection
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
 */        _formatExportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must have  on «ModulerV6.prototype._formatExportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.export cannot have 0 arguments");
            this.assert(signature.length !== 1, "ModulerV6.prototype.export cannot have 1 argument only");
            if (signature.length === 2) {
                if (typeof signature[0] === "string" && typeof signature[1] === "function") {
                    // Factory module to name
                } else if (typeof signature[0] === "string" && typeof signature[1] === "string") {
                    // Dependency to name
                } else if (typeof signature[0] === "string" && typeof signature[1] === "object") {
                    // Dependencies collection to name
                } else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
                }
            } else if (signature.length === 3) {
                if (typeof signature[0] === "string" && typeof signature[1] === "object" && typeof signature[2] === "function") {
                    // Factory module with dependencies to name
                } else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}, ${typeof signature[2]}`);
                }
            } else {
                this.assert(false, `ModulerV6.prototype.export cannot have ${signature.length} arguments`);
            }
        }
    };
    const CompilerV6 = class CompilerV6 {
        /**
   * @name CompilerV6.CompilerV6.class
   * @type 
   * @description 
   */
        /**
 * @name CompilerV6._nativeGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
        static _nativeGrammars={
            InjectSource: [ "$compiler.inject.source(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject Source",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            InjectString: [ "$compiler.inject.string(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject String",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            ImportJs: [ "$compiler.import(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Compiler Import",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            ExportJs: [ "$compiler.export(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Compiler Export",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            // ["/*%", "%*/", function (token) {
            //   return { syntax: "Multiline Comment Code Injection", ...token, };
            // }],
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
        /**
 * @name CompilerV6._defaultGrammars
 * @type ?
 * @description ?
 * @parameter ?
 * @return ?
 */
        static _defaultGrammars={
            forJs: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ExportJs, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjects, this._nativeGrammars.JavadocComment ],
            forCss: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ExportJs, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjects, this._nativeGrammars.JavadocComment ],
            forMd: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ExportJs, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjects, this._nativeGrammars.JavadocComment ]
        };
        /**
 * @name CompilerV6.AssertionError
 * @type 
 * @description 
 */
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        }
        /**
 * @name CompilerV6.Tracer
 * @type 
 * @description 
 */;
        static Tracer=
        /**
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
 */                this.isBrowser = compiler.isBrowser;
                /**
 * @name CompilerV6.Tracer.prototype.isTracing
 * @type 
 * @description 
 */                this.isTracing = true;
                /**
 * @name CompilerV6.Tracer.prototype.isLogging
 * @type 
 * @description 
 */                this.isLogging = true;
                /**
 * @name CompilerV6.Tracer.prototype.stack
 * @type 
 * @description 
 */                this.stack = [];
                /**
 * @name CompilerV6.Tracer.prototype.highlightedPatterns
 * @type 
 * @description 
 */                this.highlightedPatterns = [ 
                // Set patterns to highlight:
                [ "_assert", "blackBright" ], [ "_compileRecursively", "cyan,underline" ], [ "_tokenizeText", "cyan,underline" ], [ "_compileTokens", "cyan,underline" ], [ ".constructor", "blue" ], [ "_replaceTextRange", "yellow,bold" ] ];
                /**
 * @name CompilerV6.Tracer.prototype.ignoredPatterns
 * @type 
 * @description 
 */                this.ignoredPatterns = [ "_assert" ];
            }
            /**
 * @name CompilerV6.Tracer.prototype.activate
 * @type 
 * @description 
 */            activate(really = true) {
                this.isTracing = !!really;
                return this;
            }
            /**
 * @name CompilerV6.Tracer.prototype.deactivate
 * @type 
 * @description 
 */            deactivate(really = true) {
                this.isTracing = !!!really;
                return this;
            }
            /**
 * @name CompilerV6.Tracer.prototype.addHighlighter
 * @type 
 * @description 
 */            addHighlighter(text) {
                if (highlightedPatterns.indexOf(text) === -1) {
                    highlightedPatterns.push(text);
                }
            }
            /**
 * @name CompilerV6.Tracer.prototype.removeHighlighter
 * @type 
 * @description 
 */            removeHighlighter(text) {
                const pos = highlightedPatterns.indexOf(text);
                if (pos !== -1) {
                    highlightedPatterns.splice(pos, 1);
                }
            }
            /**
 * @name CompilerV6.Tracer.prototype.indentByLevel
 * @type 
 * @description 
 */            indentByLevel(input) {
                return " ".repeat(this.stack.length) + input;
            }
            /**
 * @name CompilerV6.Tracer.prototype.matchesIgnorer
 * @type 
 * @description 
 */            matchesIgnorer(text) {
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
 */            highlightIfMatched(output) {
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
            /**
 * @name CompilerV6.Tracer.prototype.trace
 * @type 
 * @description 
 */            trace(message, args, spaceDiff = 0) {
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
            /**
 * @name CompilerV6.Tracer.prototype.traceIn
 * @type 
 * @description 
 */            traceIn(msg, args) {
                this.trace(msg, args, 1);
                this.stack.push(msg);
            }
            /**
 * @name CompilerV6.Tracer.prototype.traceOut
 * @type 
 * @description 
 */            traceOut(msg, args) {
                const lastInStack = this.stack[this.stack.length - 1];
                // this.compiler._assert(lastInStack === msg, `Method «Tracer.prototype.traceOut» closing different method from stack: it should close «${lastInStack}» but it is trying to close «${msg}» `);
                                this.stack.pop();
                this.trace(msg, args, -1);
            }
            /**
 * @name CompilerV6.Tracer.prototype.printStack
 * @type 
 * @description 
 */            printStack() {
                console.log(`Tracer «${this.compiler.name || "mv6"}» with:`, this.stack);
            }
        };
        /**
 * @name CompilerV6.Logger
 * @type 
 * @description 
 */
        static Logger=class Logger {
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
                return new this({
                    file: file
                });
            }
            /**
 * @name CompilerV6.Logger.Manager
 * @type 
 * @description 
 */            static Manager=
            /**
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
 */                constructor(basedir) {
                    this.basedir = basedir;
                    this.selected = "default";
                    this.subloggers = {
                        default: new Logger({
                            file: require("path").resolve(basedir, "default.txt")
                        })
                    };
                }
                /**
 * @name CompilerV6.Logger.Manager.get.current
 * @type 
 * @description 
 */                get current() {
                    return this.subloggers[this.selected];
                }
                /**
 * @name CompilerV6.Logger.Manager.prototype.addLogger
 * @type 
 * @description 
 */                addLogger(id) {
                    this.subloggers[id] = new Logger({
                        file: require("path").resolve(this.basedir, id + ".txt")
                    });
                }
                /**
 * @name CompilerV6.Logger.Manager.prototype.has
 * @type 
 * @description 
 */                has(id) {
                    return id in this.subloggers;
                }
                /**
 * @name CompilerV6.Logger.Manager.prototype.into
 * @type 
 * @description 
 */                into(id) {
                    if (!this.has(id)) {
                        this.addLogger(id);
                    }
                    return this.subloggers[id];
                }
                /**
 * @name CompilerV6.Logger.Manager.prototype.select
 * @type 
 * @description 
 */                select(id = false) {
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
 */                resetFile(...args) {
                    if (!this.has(this.selected)) {
                        this.addLogger(this.selected);
                    }
                    return this.subloggers[this.selected].resetFile(...args);
                }
                /**
 * @name CompilerV6.Logger.Manager.prototype.log
 * @type 
 * @description 
 */                log(...args) {
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
 */            static defaultOptions={
                console: true
            };
            /**
 * @name CompilerV6.Logger.constructor
 * @type 
 * @description 
 */
            constructor(options, compiler) {
                this.options = Object.assign({}, this.constructor.defaultOptions, options);
                this.compiler = compiler;
                this.startedAt = new Date;
                this.lastLogAt = new Date;
            }
            /**
 * @name CompilerV6.Logger.prototype.resetFile
 * @type 
 * @description 
 */            resetFile(...args) {
                return require("fs").promises.writeFile(this.options.file, "", "utf8").then(() => {
                    this.startedAt = new Date;
                    this.lastLogAt = new Date;
                    return this.log(...args);
                });
            }
            /**
 * @name CompilerV6.Logger.prototype.getTimeOffset
 * @type 
 * @description 
 */            getTimeOffset() {
                return "+" + ((new Date).getTime() - this.startedAt.getTime());
            }
            /**
 * @name CompilerV6.Logger.prototype.getLastLogOffset
 * @type 
 * @description 
 */            getLastLogOffset() {
                return "+" + ((new Date).getTime() - this.lastLogAt.getTime());
            }
            /**
 * @name CompilerV6.Logger.prototype.log
 * @type 
 * @description 
 */            log(...args) {
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
            /**
 * @name CompilerV6.Logger.prototype.setOption
 * @type 
 * @description 
 */            setOption(id, value) {
                this.options[id] = value;
                return this;
            }
            /**
 * @name CompilerV6.Logger.prototype.getMomentToString
 * @type 
 * @description 
 */            getMomentToString() {
                const d = new Date;
                const pad = n => String(n).padStart(2, "0");
                const pad3 = n => String(n).padStart(3, "0");
                return `${d.getFullYear()}-` + `${pad(d.getMonth() + 1)}-` + `${pad(d.getDate())} ` + `${pad(d.getHours())}:` + `${pad(d.getMinutes())}:` + `${pad(d.getSeconds())}.` + `${pad3(d.getMilliseconds())}`;
            }
            /**
 * @name CompilerV6.Logger.prototype.stringifySafe
 * @type 
 * @description 
 */            stringifySafe(value) {
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
        /**
 * @name CompilerV6.CompilationProcess
 * @type 
 * @description 
 */
        static CompilationProcess=class CompilationProcess {
            /**
 * @name CompilerV6.CompilationProcess._assert
 * @type 
 * @description 
 */
            static _assert(condition, message) {
                if (!condition) throw new Error(message);
            }
            /**
 * @name CompilerV6.CompilationProcess._defaultProcessData
 * @type 
 * @description 
 */            static get _defaultProcessData() {
                return {};
            }
            /**
 * @name CompilerV6.CompilationProcess.constructor
 * @type 
 * @description 
 */
            constructor(compilationFile, compilationProcess, compiler) {
                this.constructor._assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationProcess.constructor»");
                this.constructor._assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationProcess.constructor»");
                this.compiler = compiler;
                this.compiler._traceIn("CompilationProcess.constructor", arguments);
                if (compilationProcess instanceof this.constructor) {
                    this.compiler._traceOut("CompilationProcess.constructor", arguments);
                    return Object.assign(this, compilationProcess);
                }
                this.compiler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationProcess.constructor»");
                this.compiler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationProcess.constructor»");
                Object.assign(this, this.constructor._defaultProcessData, compilationProcess);
                if (typeof this.resource === "undefined") {
                    this.compiler._assert(typeof compilationFile.resource === "string", "Parameter «compilationProcess.resource» or «compilationFile.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
                    this.resource = compilationFile.resource;
                }
                if (typeof this.isRoot === "undefined") {
                    this.isRoot = compilationFile.isRoot;
                }
                this.compiler._assert(typeof this.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.CompilationProcess.constructor»");
                this.compiler._assert(typeof this.isRoot === "boolean", "Parameter «compilationProcess.isRoot» must be boolean on «CompilerV6.CompilationProcess.constructor»");
                this.compiler._traceOut("CompilationProcess.constructor", arguments);
            }
            /**
 * @name CompilerV6.CompilationProcess.from
 * @type 
 * @description 
 */            static from(...args) {
                if (args[0] instanceof this.constructor) {
                    return args[0];
                }
                return new this(...args);
            }
        }
        /**
 * @name CompilerV6.CompilationFile
 * @type 
 * @description 
 */;
        static CompilationFile=class CompilationFile {
            /**
 * @name CompilerV6.CompilationFile._assert
 * @type 
 * @description 
 */
            static _assert(condition, message) {
                if (!condition) throw new Error(message);
            }
            /**
 * @name CompilerV6.CompilationFile._defaultFileData
 * @type 
 * @description 
 */            static get _defaultFileData() {
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
            /**
 * @name CompilerV6.CompilationFile.constructor
 * @type 
 * @description 
 */
            constructor(compilationFile, compilationProcess, compiler) {
                this.constructor._assert(typeof compiler === "object", "Parameter «compiler» must be object on «CompilerV6.CompilationFile.constructor»");
                this.constructor._assert(compiler instanceof CompilerV6, "Parameter «compiler» must be instance of «CompilerV6» on «CompilerV6.CompilationFile.constructor»");
                this.compiler = compiler;
                this.compiler._traceIn("CompilationFile.constructor", arguments);
                this.compiler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.CompilationFile.constructor»");
                this.compiler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.CompilationFile.constructor»");
                Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultFileData)), compilationFile);
                this.compiler._assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.CompilationFile.constructor»");
                this.compiler._assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «CompilerV6.CompilationFile.constructor»");
                this.compiler._traceOut("CompilationFile.constructor", arguments);
            }
            /**
 * @name CompilerV6.CompilationFile.from
 * @type 
 * @description 
 */            static from(...args) {
                return new this(...args);
            }
        }
        /**
 * @name CompilerV6.create
 * @type 
 * @description 
 */;
        static create(...args) {
            return new this(...args);
        }
        /**
 * @name CompilerV6.fromDirectory
 * @type 
 * @description 
 */        static fromDirectory(dir) {
            return new this(dir);
        }
        /**
 * @name CompilerV6.fromRootOf
 * @type 
 * @description 
 */        static async fromRootOf(file) {
            const root = await this.findRootOf(file);
            return new this(root);
        }
        /**
 * @name CompilerV6.findRootOf
 * @type 
 * @description 
 */        static async findRootOf(file, whenContains = "package.json") {
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
 */        static ansi={
            colors: 
            /**
 * @name CompilerV6.colors
 * @type 
 * @description 
 */
            Object.assign({
                available: {
                    // estilos
                    bold: [ 1, 22 ],
                    italic: [ 3, 23 ],
                    underline: [ 4, 24 ],
                    blink: [ 5, 25 ],
                    inverse: [ 7, 27 ],
                    strike: [ 9, 29 ],
                    // colores
                    black: [ 30, 39 ],
                    red: [ 31, 39 ],
                    green: [ 32, 39 ],
                    yellow: [ 33, 39 ],
                    blue: [ 34, 39 ],
                    magenta: [ 35, 39 ],
                    cyan: [ 36, 39 ],
                    white: [ 37, 39 ],
                    // fondo
                    bgBlack: [ 40, 49 ],
                    bgRed: [ 41, 49 ],
                    bgGreen: [ 42, 49 ],
                    bgYellow: [ 43, 49 ],
                    bgBlue: [ 44, 49 ],
                    bgMagenta: [ 45, 49 ],
                    bgCyan: [ 46, 49 ],
                    bgWhite: [ 47, 49 ],
                    // brillantes
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
        }
        /**
 * @name CompilerV6.constructor  
 * @type 
 * @description 
 */;
        constructor(basedirInput, parent = null, grammars = this.constructor._defaultGrammars) {
            if (!(typeof basedirInput === "string")) {
                throw new this.constructor.AssertionError("Parameter «basedir» must be string on «CompilerV6.constructor»");
            }
            if (!(typeof parent === "object")) {
                throw new this.constructor.AssertionError("Parameter «parent» must be object on «CompilerV6.constructor»");
            }
            if (!(typeof grammars === "object")) {
                throw new this.constructor.AssertionError("Parameter «grammars» must be object on «CompilerV6.constructor»");
            }
            if (parent) {
                this._tracer = parent._tracer;
            }
            this._trace("constructor", arguments);
            const basedir = this.normalizationOf(basedirInput);
            /**
 * @name CompilerV6.prototype.basedir
 * @type 
 * @description 
 */            this.basedir = basedir;
            /**
 * @name CompilerV6.prototype.isBrowser
 * @type 
 * @description 
 */            this.isBrowser = typeof window !== "undefined";
            /**
 * @name CompilerV6.prototype.previousdir
 * @type 
 * @description 
 */            this.previousdir = parent ? parent.basedir : basedir;
            /**
 * @name CompilerV6.prototype.rootdir
 * @type 
 * @description 
 */            this.rootdir = parent ? parent.rootdir : basedir;
            /**
 * @name CompilerV6.prototype._grammars
 * @type 
 * @description 
 */            this._grammars = {
                forJs: this.constructor._defaultGrammars.forJs,
                forCss: this.constructor._defaultGrammars.forCss,
                forMd: this.constructor._defaultGrammars.forMd
            };
            /**
 * @name CompilerV6.prototype._parser
 * @type 
 * @description 
 */            this._parser = {
                forJs: TextParserV1.create(this._grammars.forJs),
                forCss: TextParserV1.create(this._grammars.forCss),
                forMd: TextParserV1.create(this._grammars.forMd)
            };
            /**
 * @name CompilerV6.prototype.moduler
 * @type 
 * @description 
 */            this.moduler = parent ? parent.moduler : new ModulerV6(this.basedir);
        }
        /**
 * @name CompilerV6.prototype._readPath
 * @type 
 * @description 
 */        _readPath(url) {
            this._trace("_readPath", arguments);
            return this._isBrowser ? this._readUrl(url) : this._readFile(url);
        }
        /**
 * @name CompilerV6.prototype._readUrl
 * @type 
 * @description 
 */        _readUrl(url) {
            this._trace("_readUrl", arguments);
            return fetch(this.normalizationOf(url), {
                method: "GET"
            }).then(response => response.text());
        }
        /**
 * @name CompilerV6.prototype._readFile
 * @type 
 * @description 
 */        _readFile(file) {
            this._trace("_readFile", arguments);
            return require("fs").promises.readFile(this.normalizationOf(file), "utf8");
        }
        /**
 * @name CompilerV6.prototype._assert
 * @type 
 * @description 
 */        _assert(condition, message) {
            this._trace("_assert", arguments);
            if (!condition) {
                throw new this.constructor.AssertionError(message);
            } else if (this._tracer.isTracing) {
                this._notifyAssertion(message);
            }
        }
        /**
 * @name CompilerV6.prototype._assertThrows
 * @type 
 * @description 
 */        async _assertThrows(callback, message, checker = () => true) {
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
        /**
 * @name CompilerV6.prototype._assertDoesNotThrow
 * @type 
 * @description 
 */        async _assertDoesNotThrow(callback, message, checker = () => true) {
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
 * @name CompilerV6.prototype._notifyAssertion
 * @type 
 * @description 
 */        _notifyAssertion(message) {
            const text = `[ok] ${message}`;
            if (this._tracer.isTracing && !this._tracer.matchesIgnorer(text)) {
                console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
            }
        }
        /**
 * @name CompilerV6.prototype._logger
 * @type 
 * @description 
 */        _logger=null;
        /**
 * @name CompilerV6.prototype._tracer
 * @type 
 * @description 
 */
        _tracer=new this.constructor.Tracer(this);
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
 */        _traceIn(method, args = []) {
            return this._tracer.traceIn(method, args);
        }
        /**
 * @name CompilerV6.prototype._traceOut
 * @type 
 * @description 
 */        _traceOut(method, args = []) {
            return this._tracer.traceOut(method, args);
        }
        /**
 * @name CompilerV6.prototype._debug
 * @type 
 * @description 
 */        _debug(...list) {
            for (let index = 0; index < list.length; index++) {
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
        }
        /**
 * @name CompilerV6.prototype._die
 * @type 
 * @description 
 */        _die(...args) {
            this._trace("die", arguments);
            console.log("[DIE]", ...args);
            process.exit(0);
        }
        /**
 * @name CompilerV6.prototype._tokenizeText
 * @type 
 * @description 
 */        _tokenizeText(compilationFile, compilationProcess) {
            this._traceIn("_tokenizeText", arguments);
            this._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «CompilerV6.prototype._tokenizeText»");
            this._assert(typeof compilationProcess.resource === "string", "Parameter «compilationProcess.resource» must be string on «CompilerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile.source === "string", "Parameter «compilationFile.source» must be string on «CompilerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile.extension === "string", "Parameter «compilationFile.extension» must be string on «CompilerV6.prototype._tokenizeText»");
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
        /**
 * @name CompilerV6.prototype._replaceTextRange
 * @type 
 * @description 
 */        _replaceTextRange(text, start, end, replacement) {
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
        /**
 * @name CompilerV6.prototype._compileTokens
 * @type 
 * @description 
 */        async _compileTokens(compilationFile, compilationProcess) {
            this._traceIn("_compileTokens", arguments);
            const {resource: resource, source: source, tokenization: {formatted: tokens}} = compilationFile;
            const _tokenCompilationSwitcher = {
                "Inject Source": this._compileAsInjectSource,
                "Inject String": this._compileAsInjectString,
                "Multiline Comment Code Injection": this._compileAsMultilineCommentCodeInjection,
                "Multiline Comment Value Injection": this._compileAsMultilineCommentValueInjection,
                "Compiler Import": this._compileAsModulerImport,
                "Compiler Export": this._compileAsModulerExport,
                "@Requires": this._compileAsRequires,
                "@Injects": this._compileAsInjects,
                "Javadoc Comment": this._compileAsJavadocComment
            };
            Iterating_tokens: for (let tokenIndex = tokens.length - 1; tokenIndex >= 0; tokenIndex--) {
                const token = tokens[tokenIndex];
                Extraer_las_rutas_dependencia: {
                    this._assert(token.syntax in _tokenCompilationSwitcher, `Syntax not identified «${token.syntax}»`);
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
        /**
 * @name CompilerV6.prototype._compileRecursively
 * @type private class method
 * @description 
 */        async _compileRecursively(fileParameters = {}, processParameters = {}) {
            this._traceIn("_compileRecursively", arguments);
            this._assert(typeof fileParameters === "object", "Parameter «fileParameters» must be object on «CompilerV6.prototype._compileRecursively»");
            this._assert(typeof fileParameters.resource === "string", "Parameter «fileParameters.resource» must be string on «CompilerV6.prototype._compileRecursively»");
            this._assert(typeof processParameters === "object", "Parameter «processParameters» must be object on «CompilerV6.prototype._compileRecursively»");
            const compilationFile = this.constructor.CompilationFile.from(fileParameters, processParameters, this);
            const compilationProcess = this.constructor.CompilationProcess.from(fileParameters, processParameters, this);
            Entry_in_tree: {
                const id = this.rootpathOf(compilationFile.resource);
                compilationFile.report.tree[id] = compilationFile.report.tree[id] || {};
            }
            const subcompiler = this._cloneForFile(compilationFile.resource, this);
            compilationFile.subcompiler = subcompiler;
            await subcompiler._fetchCompilable(compilationFile, compilationProcess);
            subcompiler._tokenizeText(compilationFile, compilationProcess);
            await subcompiler._compileTokens(compilationFile, compilationProcess);
            const output = subcompiler._getPreferredOutput(compilationFile, compilationProcess);
            this._traceOut("_compileRecursively", arguments);
            return output;
        }
        /**
 * @name CompilerV6.prototype._fetchCompilable
 * @type 
 * @description 
 */        _fetchCompilable(compilationFile, compilationProcess) {
            this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «CompilerV6.prototype._fetchCompilable»");
            this._assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «CompilerV6.prototype._fetchCompilable»");
            // console.log(compilationFile.resource);
                        this._assert(/\.(js|css|md)$/g.test(compilationFile.resource), `Parameter «compilationFile.resource» now «${compilationFile.resource}» must match with valid extension on «CompilerV6.prototype._fetchCompilable»`);
            Sacar_la_extension_del_fichero: {
                compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
            }
            Propagar_la_extension_al_proceso_si_es_la_primera: {
                if (typeof compilationProcess.extension === "undefined") {
                    compilationProcess.extension = compilationFile.extension;
                }
            }
            Bloquear_imports_segun_extension_de_compilable_original: {
                if (compilationProcess.extension === "js") {
                    // @OK, con js todo.
                } else if (compilationProcess.extension === "css") {
                    this._assert(compilationFile.extension !== "js", `From a «css» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
                } else if (compilationProcess.extension === "md") {
                    this._assert(compilationFile.extension !== "js", `From an «md» file «${compilationProcess.resource}» cannot inject «js» file «${compilationFile.resource}»`);
                    this._assert(compilationFile.extension !== "css", `From an «md» file «${compilationProcess.resource}» cannot inject «css» file «${compilationFile.resource}»`);
                }
            }
            return this._readPath(compilationFile.resource).then(source => {
                compilationFile.source = source;
                return compilationFile.compilation[compilationFile.extension] = source;
            });
        }
        /**
 * @name CompilerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */        async _compileAsInjectSource(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectSource»");
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
                    // Cuando desde un JS se hace $compiler.injects...
                    let replacement = "";
                    if (targetPath.endsWith(".js")) {
                        // ...a un JS
                        replacement = targetCompilation.js;
                    } else if (targetPath.endsWith(".css")) {
                        // ...a un CSS
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «css» files. Use commented @injects syntax instead.`);
                        compilationFile.compilation.css += "\n" + targetCompilation.css;
                    } else if (targetPath.endsWith(".md")) {
                        // ...a un MD
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» should not be used to import «md» files. Use commented @injects syntax instead.`);
                        compilationFile.compilation.md += "\n\n" + targetCompilation.md;
                    } else {
                        throw new Error(`Syntax of «$compiler.inject.source» on file «${targetPath}» is trying to import foraneous extension`);
                    }
                    compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], replacement);
                } else if (compilationFile.extension === "css") {
                    // Cuando desde un CSS se hace $compiler.injects...
                    throw new Error("Syntax of «$compiler.inject.source» should not be available on «css» files");
                } else if (compilationFile.extension === "md") {
                    // Cuando desde un MD se hace $compiler.injects...
                    throw new Error("Syntax of «$compiler.inject.source» should not be available on «md» files");
                } else {
                    // Cuando desde otro formato se hace $compiler.injects...
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
        /**
 * @name CompilerV6.prototype._compileAsInjectString
 * @type 
 * @description 
 */        async _compileAsInjectString(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjectString»");
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
 */        _compileAsMultilineCommentCodeInjection() {
            this._trace("_compileAsMultilineCommentCodeInjection", arguments);
        }
        /**
 * @name CompilerV6.prototype._compileAsMultilineCommentValueInjection
 * @type 
 * @description 
 */        _compileAsMultilineCommentValueInjection() {
            this._trace("_compileAsMultilineCommentValueInjection", arguments);
        }
        /**
 * @name CompilerV6.prototype._compileAsModulerImport
 * @type 
 * @description 
 */        async _compileAsModulerImport(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                    // @OK: no compilation or path guessing if parameters can not be evaluated
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
 */        async _compileAsModulerExport(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                    // @OK: no compilation or path guessing if parameters can not be evaluated
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
 */        async _compileAsRequires(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsRequires»");
                targetPath = token.referenceOf.fullpath;
            }
            Compile_target: {
                targetCompilation = await this._compileRecursively({
                    resource: targetPath,
                    isRoot: false
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
 */        async _compileAsInjects(compilationFile, compilationProcess, {token: token, tokenIndex: tokenIndex}) {
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
                this._assert(token.referenceOf.fullpath === this.fullpathOf(parameters[0]), "DesignError: The first parameter and the token.referenceOf.fullpath should be the same on «CompilerV6.prototype._compileAsInjects»");
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
                        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`);
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
                        throw new Error(`Syntax of «@injects» on «${targetPath}» is trying to import foraneous file extension.`);
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
        /**
 * @name CompilerV6.prototype._compileAsJavadocComment
 * @type 
 * @description 
 */        _compileAsJavadocComment() {
            this._trace("_compileAsJavadocComment", arguments);
        }
        /**
 * @name CompilerV6.prototype._initializeLogger
 * @type 
 * @description 
 */        _initializeLogger(directory) {
            this._trace("_initializeLogger", arguments);
            return this._logger = this.constructor.Logger.Manager.fromDirectory(directory, this);
        }
        /**
 * @name CompilerV6.prototype._reportFileToken
 * @type 
 * @description 
 */        _reportFileToken(compilationFile, targetBrute, token) {
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
        /**
 * @name CompilerV6.prototype._getPreferredOutput
 * @type 
 * @description 
 */        _getPreferredOutput(compilationFile, compilationProcess) {
            this._trace("_getPreferredOutput", arguments);
            return {
                file: compilationFile.resource,
                report: compilationProcess.to === "data" ? compilationFile.report : false,
                ...compilationFile.compilation
            };
        }
        /**
 * @name CompilerV6.prototype._hydrateParameters
 * @type 
 * @description 
 */        _hydrateParameters(parametersSource) {
            this._trace("_hydrateParameters", arguments);
            return new Function(`return [${parametersSource}]`).call();
        }
        /**
 * @name CompilerV6.prototype._cloneForFile
 * @type 
 * @description 
 */        _cloneForFile(resource, compiler = false) {
            this._traceIn("_cloneForFile", arguments);
            this._assert(typeof resource === "string", "Parameter «resource» must be string on «CompilerV6.prototype._cloneForFile»");
            this._assert(typeof this.basedir === "string", "Property «this.basedir» must be string on «CompilerV6.prototype._cloneForFile»");
            const dirpath = require("path").dirname(this.fullpathOf(resource));
            const clone = new this.constructor(dirpath, compiler || this);
            this._traceOut("_cloneForFile", arguments);
            return clone;
        }
        /**
 * @name CompilerV6.prototype._cloneStructureAsJson
 * @type 
 * @description 
 */        _cloneStructureAsJson(data) {
            return JSON.parse(JSON.stringify(data));
        }
        /**
 * @name CompilerV6.prototype._extendToken
 * @type 
 * @description 
 */        _extendToken(token, fields = [], submoduler = false) {
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
        /**
 * @name CompilerV6.prototype._getDataForTokenCompilation
 * @type 
 * @description 
 */        async _getDataForTokenCompilation(input, options = {}) {
            this._traceIn("_getDataForTokenCompilation", arguments);
            this._assert(typeof input === "object", "Parameter «input» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
            // this._assert(typeof input.compilationFile === "object", "Parameter «input.compilationFile» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
            // this._assert(typeof input.compilationFile.resource === "string", "Parameter «input.compilationFile.resource» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
            // this._assert(typeof input.compilationProcess === "object", "Parameter «input.compilationProcess» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
                        this._assert(typeof input.token === "object", "Parameter «input.token» must be object on «CompilerV6.prototype._getDataForTokenCompilation»");
            this._assert(typeof input.token.inner === "string", "Parameter «input.token.inner» must be string on «CompilerV6.prototype._getDataForTokenCompilation»");
            // this._assert(typeof input.tokenIndex === "number", "Parameter «input.tokenIndex» must be number on «CompilerV6.prototype._getDataForTokenCompilation»");
                        let output, parameters = undefined;
            if (typeof options.onError === "function") {
                try {
                    parameters = this._hydrateParameters(input.token.inner);
                    Checks: {
                        this._assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» extracting parameters from resource «${input.resource}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
                    }
                    output = parameters;
                } catch (error) {
                    output = options.onError(error, parameters);
                }
            } else {
                parameters = this._hydrateParameters(input.token.inner);
                Checks: {
                    this._assert(Array.isArray(parameters), `Parameters of injection must be an array in «${input.token.inner}» on «CompilerV6.prototype._getDataForTokenCompilation»`);
                }
                output = parameters;
            }
            this._traceOut("_getDataForTokenCompilation", arguments);
            return output;
        }
        /**
 * @name CompilerV6.prototype._getParametersFromModulerExportSignature
 * @type 
 * @description 
 */        _getParametersFromModulerExportSignature(parameters, resource = null) {
            this._trace("_getParametersFromModulerExportSignature", arguments);
            this._assert(Array.isArray(parameters), "Parameter «parameters» must be array on «CompilerV6.prototype._getParametersFromModulerExportSignature»");
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
        /**
 * @name CompilerV6.prototype._getParametersFromModulerImportSignature
 * @type 
 * @description 
 *  - `file:String` if endsWith(".js")
 *  - `id:String` otherwise
 *  - `files:Array<String>`
 *  - `factory:Function`
 *  - `files:Array<String>,factory:Function`
 */        _getParametersFromModulerImportSignature(parameters, resource = null) {
            this._trace("_getParametersFromModulerImportSignature", arguments);
            this._assert(Array.isArray(parameters), `Parameter «parameters» must be array on file «${resource}» on «CompilerV6.prototype._getParametersFromModulerImportSignature»`);
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
        /**
 * @name CompilerV6.prototype._getStringForDevelopment
 * @type 
 * @description 
 */        _getStringForDevelopment(text, tab = 0) {
            this._trace("_getStringForDevelopment", arguments);
            return text.split("\n").map(line => JSON.stringify(line)).join("\n + ");
        }
        /**
 * @name CompilerV6.prototype.normalizationOf
 * @type 
 * @description 
 */        normalizationOf(nodepath, origin = false) {
            this._trace("normalizationOf", arguments);
            const output = require("path").resolve(nodepath);
            if (origin) {
                this._debug("called normalizationOf from: " + origin + " (" + output + ")");
            }
            return output;
        }
        /**
 * @name CompilerV6.prototype.rootpathOf
 * @type 
 * @description 
 */        rootpathOf(fullpath) {
            this._trace("rootpathOf", arguments);
            const normalization = this.normalizationOf(fullpath);
            return normalization.startsWith(this.rootdir + "/") ? normalization.replace(this.rootdir + "/", "@/") : normalization;
        }
        /**
 * @name CompilerV6.prototype.fullpathOf
 * @type 
 * @description 
 */        fullpathOf(nodepath) {
            this._trace("fullpathOf", arguments);
            return require("path").resolve(this.basedir, nodepath);
        }
        /**
 * @name CompilerV6.prototype.compile
 * @type 
 * @description 
 */        async compile(resource, options = {}) {
            return this._compileRecursively({
                resource: resource,
                isRoot: true
            }, {
                ...options
            });
        }
        /**
 * @name CompilerV6.prototype.log
 * @type 
 * @description 
 */        log(...args) {
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