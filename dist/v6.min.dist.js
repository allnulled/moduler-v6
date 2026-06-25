(function(mod) {
    if (typeof window !== "undefined") window["ModulerV6"] = mod;
    if (typeof global !== "undefined") global["ModulerV6"] = mod;
    if (typeof module !== "undefined") module.exports = mod;
})(function() {
    (function(mod) {
        if (typeof window !== "undefined") window["TextParserV1"] = mod;
        if (typeof global !== "undefined") global["TextParserV1"] = mod;
        return mod;
    })(function() {
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
                Iterating_tokens: for (let indexToken = 0; indexToken < tokens.length; indexToken++) {
                    const token = tokens[indexToken];
                    Iterating_grammars: for (let indexGrammar = 0; indexGrammar < this.grammars.length; indexGrammar++) {
                        const grammar = this.grammars[indexGrammar];
                        const [starter, ender, formatter, options] = grammar;
                        if (starter === token.starter) {
                            const formattedToken = formatter.call(this, token, formattedOutput, indexToken, grammar, indexGrammar, text);
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
    const ModulerV6 = class ModulerV6 {
        static _nativeGrammars={
            InjectSource: [ "$v6.inject.source(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject Source",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            InjectString: [ "$v6.inject.string(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Inject String",
                    inner: token.inner,
                    location: token.location
                };
            } ],
            ImportJs: [ "$v6.import.js(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Import Js",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            ImportCss: [ "$v6.import.css(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Import Css",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            ExportJs: [ "$v6.export.js(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Export Js",
                    ...token
                };
            }, {
                allowInside: true
            } ],
            ExportCss: [ "$v6.export.css(", TextParserV1.symbols.PARENTHESYS_BALANCE, function(token) {
                return {
                    syntax: "Export Css",
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
                    syntax: "Requires",
                    ...token
                };
            } ],
            AtInjection: [ "/*@injects:", "*/", function(token) {
                return {
                    syntax: "Injects",
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
        static _defaultGrammars={
            forJs: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ImportCss, this._nativeGrammars.ExportJs, this._nativeGrammars.ExportCss, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjection, this._nativeGrammars.JavadocComment ],
            forCss: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ImportCss, this._nativeGrammars.ExportJs, this._nativeGrammars.ExportCss, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjection, this._nativeGrammars.JavadocComment ],
            forMd: [ this._nativeGrammars.InjectSource, this._nativeGrammars.InjectString, this._nativeGrammars.ImportJs, this._nativeGrammars.ImportCss, this._nativeGrammars.ExportJs, this._nativeGrammars.ExportCss, this._nativeGrammars.MultilineCommentValueInjection, this._nativeGrammars.AtRequires, this._nativeGrammars.AtInjection, this._nativeGrammars.JavadocComment ]
        };
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        };
        static Tracer=class Tracer {
            constructor(moduler) {
                this.moduler = moduler;
                this.isBrowser = moduler.isBrowser;
                this.isTracing = true;
                this.stack = [];
                this.highlightedPatterns = [ [ "_assert", "blackBright" ], [ "_compileRecursively", "cyan,underline" ], [ "_tokenizeText", "cyan,underline" ], [ "_compileTokens", "cyan,underline" ], [ ".constructor", "red" ], [ "_replaceTextRange", "yellow,bold" ] ];
                this.ignoredPatterns = [ "_assert", "[ok]" ];
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
                return this.moduler.constructor.ansi.colors.style(styling).text(output);
            }
            trace(message, args, spaceDiff = 0) {
                if (this.isTracing) {
                    let output = ``;
                    output += `[${this.stack.length}${spaceDiff === 1 ? "++" : spaceDiff === -1 ? "--" : ""}] `;
                    output += this.moduler.name ? `[${this.moduler.name}] ` : `[mv6] `;
                    output += `[${message}] `;
                    output += `arguments: ${args.length}`;
                    output = this.highlightIfMatched(output);
                    output = this.indentByLevel(output);
                    if (!this.matchesIgnorer(output)) {
                        console.log(output);
                    }
                }
            }
            traceIn(msg, args) {
                this.trace(msg, args, 1);
                this.stack.push(msg);
            }
            traceOut(msg, args) {
                const lastInStack = this.stack[this.stack.length - 1];
                this.moduler._assert(lastInStack === msg, `Method «Tracer.prototype.traceOut» closing different method from stack: it should close «${lastInStack}» but it is trying to close «${msg}» `);
                this.stack.pop();
                this.trace(msg, args, -1);
            }
            printStack() {
                console.log(`Tracer «${this.moduler.name || "mv6"}» with:`, this.stack);
            }
        };
        static CompilationProcess=class CompilationProcess {
            static _assert(condition, message) {
                if (!condition) throw new Error(message);
            }
            static get _defaultProcessData() {
                return {
                    injectedFiles: []
                };
            }
            constructor(compilationFile, compilationProcess, moduler) {
                this.constructor._assert(typeof moduler === "object", "Parameter «moduler» must be object on «ModulerV6.CompilationProcess.constructor»");
                this.constructor._assert(moduler instanceof ModulerV6, "Parameter «moduler» must be instance of «ModulerV6» on «ModulerV6.CompilationProcess.constructor»");
                this.moduler = moduler;
                this.moduler._traceIn("CompilationProcess.constructor", arguments);
                if (compilationProcess instanceof this.constructor) {
                    this.moduler._traceOut("CompilationProcess.constructor", arguments);
                    return Object.assign(this, compilationProcess);
                }
                this.moduler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.CompilationProcess.constructor»");
                this.moduler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.CompilationProcess.constructor»");
                Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultProcessData)), compilationProcess);
                if (typeof this.resource === "undefined") {
                    this.moduler._assert(typeof compilationFile.resource === "string", "Parameter «compilationProcess.resource» or «compilationFile.resource» must be string on «ModulerV6.CompilationProcess.constructor»");
                    this.resource = compilationFile.resource;
                }
                if (typeof this.isRoot === "undefined") {
                    this.isRoot = compilationFile.isRoot;
                }
                this.moduler._assert(typeof this.resource === "string", "Parameter «compilationProcess.resource» must be string on «ModulerV6.CompilationProcess.constructor»");
                this.moduler._assert(typeof this.isRoot === "boolean", "Parameter «compilationProcess.isRoot» must be boolean on «ModulerV6.CompilationProcess.constructor»");
                this.moduler._traceOut("CompilationProcess.constructor", arguments);
            }
            static from(...args) {
                if (args[0] instanceof this.constructor) {
                    return args[0];
                }
                return new this(...args);
            }
        };
        static CompilationFile=class CompilationFile {
            static _assert(condition, message) {
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
                        js: {},
                        css: {},
                        md: {}
                    }
                };
            }
            constructor(compilationFile, compilationProcess, moduler) {
                this.constructor._assert(typeof moduler === "object", "Parameter «moduler» must be object on «ModulerV6.CompilationFile.constructor»");
                this.constructor._assert(moduler instanceof ModulerV6, "Parameter «moduler» must be instance of «ModulerV6» on «ModulerV6.CompilationFile.constructor»");
                this.moduler = moduler;
                this.moduler._traceIn("CompilationFile.constructor", arguments);
                this.moduler._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.CompilationFile.constructor»");
                this.moduler._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.CompilationFile.constructor»");
                Object.assign(this, JSON.parse(JSON.stringify(this.constructor._defaultFileData)), compilationFile);
                this.moduler._assert(typeof this.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.CompilationFile.constructor»");
                this.moduler._assert(typeof this.isRoot === "boolean", "Parameter «compilationFile.isRoot» must be boolean on «ModulerV6.CompilationFile.constructor»");
                this.moduler._traceOut("CompilationFile.constructor", arguments);
            }
            static from(...args) {
                return new this(...args);
            }
        };
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
                throw new this.constructor.AssertionError("Parameter «basedir» must be string on «ModulerV6.constructor»");
            }
            if (!(typeof parent === "object")) {
                throw new this.constructor.AssertionError("Parameter «parent» must be object on «ModulerV6.constructor»");
            }
            if (!(typeof grammars === "object")) {
                throw new this.constructor.AssertionError("Parameter «grammars» must be object on «ModulerV6.constructor»");
            }
            if (parent) {
                this._tracer = parent._tracer;
            }
            this._trace("constructor", arguments);
            const basedir = this.normalizationOf(basedirInput);
            this.basedir = basedir;
            this.isBrowser = typeof window !== "undefined";
            this.parentdir = parent ? parent.basedir : basedir;
            this.rootdir = parent ? parent.rootdir : basedir;
            this._grammars = {
                forJs: this.constructor._defaultGrammars.forJs,
                forCss: this.constructor._defaultGrammars.forCss,
                forMd: this.constructor._defaultGrammars.forMd
            };
            this._parser = {
                forJs: TextParserV1.create(this._grammars.forJs),
                forCss: TextParserV1.create(this._grammars.forCss),
                forMd: TextParserV1.create(this._grammars.forMd)
            };
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
        _assert(condition, message) {
            this._trace("_assert", arguments);
            if (!condition) {
                throw new this.constructor.AssertionError(message);
            } else if (this._tracer.isTracing) {
                const text = `[ok] ${message}`;
                if (!this._tracer.matchesIgnorer(text)) {
                    console.log(this._tracer.indentByLevel(this.constructor.ansi.colors.style("blackBright").text(text)));
                }
            }
        }
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
                console.log(this.constructor.ansi.colors.style("yellow,bold,underline").text(`[debug] parameter ${index}:`), item);
            }
        }
        _die(...args) {
            console.log("[DIE]", ...args);
            process.exit(0);
        }
        _tokenizeText(compilationFile, compilationProcess) {
            this._traceIn("_tokenizeText", arguments);
            this._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.prototype._tokenizeText»");
            this._assert(typeof compilationProcess.resource === "string", "Parameter «compilationProcess.resource» must be string on «ModulerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile.source === "string", "Parameter «compilationFile.source» must be string on «ModulerV6.prototype._tokenizeText»");
            this._assert(typeof compilationFile.extension === "string", "Parameter «compilationFile.extension» must be string on «ModulerV6.prototype._tokenizeText»");
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
            Iterating_tokens: for (let indexToken = tokens.length - 1; indexToken >= 0; indexToken--) {
                const token = tokens[indexToken];
                Extraer_las_rutas_dependencia: {
                    if (false) {} else if (token.syntax === "Inject Source") {
                        await this._compileAsInjectSource(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Inject String") {
                        await this._compileAsInjectString(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Multiline Comment Code Injection") {
                        await this._compileAsMultilineCommentCodeInjection(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Multiline Comment Value Injection") {
                        await this._compileAsMultilineCommentValueInjection(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Import Js") {
                        await this._compileAsImportJs(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Export Js") {
                        await this._compileAsExportJs(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Requires") {
                        await this._compileAsRequires(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else if (token.syntax === "Javadoc Comment") {
                        await this._compileAsJavadocComment(compilationFile, compilationProcess, {
                            token: token,
                            indexToken: indexToken
                        });
                    } else {
                        throw new Error(`Syntax not identified «${token.syntax}»`);
                    }
                }
            }
            this._traceOut("_compileTokens", arguments);
            return compilationFile.output = compilationFile.compilation;
        }
        async _compileRecursively(compilationFile = {}, compilationProcess = {}) {
            this._traceIn("_compileRecursively", arguments);
            this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._compileRecursively»");
            this._assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.prototype._compileRecursively»");
            this._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.prototype._compileRecursively»");
            const metadataForFile = this.constructor.CompilationFile.from(compilationFile, compilationProcess, this);
            const metadataForProcess = this.constructor.CompilationProcess.from(compilationFile, compilationProcess, this);
            const submoduler = this._cloneForFile(metadataForFile.resource, this);
            await submoduler._fetchCompilable(metadataForFile, metadataForProcess);
            submoduler._tokenizeText(metadataForFile, metadataForProcess);
            await submoduler._compileTokens(metadataForFile, metadataForProcess);
            const output = this._getPreferredOutput(metadataForFile, metadataForProcess);
            this._traceOut("_compileRecursively", arguments);
            return output;
        }
        _fetchCompilable(compilationFile, compilationProcess) {
            this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._fetchCompilable»");
            this._assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.prototype._fetchCompilable»");
            this._assert(/\.(js|css|md)$/g.test(compilationFile.resource), `Parameter «compilationFile.resource» must match with valid extension on «ModulerV6.prototype._fetchCompilable»`);
            compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
            return this._readPath(compilationFile.resource).then(source => {
                compilationFile.source = source;
                return compilationFile.compilation.js = source;
            });
        }
        async _compileAsInjectSource(compilationFile, compilationProcess, {token: token, indexToken: indexToken}) {
            this._traceIn("_compileAsInjectSource", arguments);
            const {tokenization: tokenization, source: source, resource: resource, isRoot: isRoot} = compilationFile;
            const parameters = this._hydrateParameters(token.inner);
            this._assert(Array.isArray(parameters), `Parameters of injection must be an array in «${token.inner}» on «ModulerV6.prototype._compileAsInjectSource»`);
            this._assert(typeof parameters[0] === "string", `First parameter of injection must be string but «${typeof parameters[0]}» was found instead on «ModulerV6.prototype._compileAsInjectSource»`);
            const subpath = this.fullpathOf(parameters[0]);
            const compilation = await this._compileRecursively({
                resource: subpath,
                isRoot: false
            }, compilationProcess);
            compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], compilation.js);
            this._traceOut("_compileAsInjectSource", arguments);
        }
        _compileAsInjectString() {
            this._trace("_compileAsInjectString", arguments);
        }
        _compileAsMultilineCommentCodeInjection() {
            this._trace("_compileAsMultilineCommentCodeInjection", arguments);
        }
        _compileAsMultilineCommentValueInjection() {
            this._trace("_compileAsMultilineCommentValueInjection", arguments);
        }
        _compileAsImportJs() {
            this._trace("_compileAsImportJs", arguments);
        }
        _compileAsExportJs(input, token, indexToken) {
            this._trace("_compileAsExportJs", arguments);
        }
        _compileAsRequires() {
            this._trace("_compileAsRequires", arguments);
        }
        _compileAsJavadocComment() {
            this._trace("_compileAsJavadocComment", arguments);
        }
        _getPreferredOutput(compilationFile, compilationProcess) {
            this._trace("_getPreferredOutput", arguments);
            let output = undefined;
            if (compilationFile.to === "data") {
                output = compilationFile.report;
            } else {
                output = compilationFile.compilation;
            }
            Object.assign(output, {
                file: compilationFile.resource
            });
            return output;
        }
        _hydrateParameters(parametersSource) {
            this._trace("_hydrateParameters", arguments);
            return new Function(`return [${parametersSource}]`).call();
        }
        _cloneForFile(resource, moduler = false) {
            this._traceIn("_cloneForFile", arguments);
            this._assert(typeof resource === "string", "Parameter «resource» must be string on «ModulerV6.prototype._cloneForFile»");
            this._assert(typeof this.basedir === "string", "Property «this.basedir» must be string on «ModulerV6.prototype._cloneForFile»");
            const dirpath = require("path").dirname(this.fullpathOf(resource));
            const clone = new this.constructor(dirpath, moduler || this);
            this._traceOut("_cloneForFile", arguments);
            return clone;
        }
        normalizationOf(nodepath, origin = false) {
            this._trace("normalizationOf", arguments);
            const output = require("path").resolve(nodepath);
            if (origin) {
                this._debug("called normalizationOf from: " + origin + " (" + output + ")");
            }
            return output;
        }
        fullpathOf(nodepath) {
            this._trace("fullpathOf", arguments);
            return require("path").resolve(this.basedir, nodepath);
        }
        async compile(resource, options = {}) {
            return this._compileRecursively({
                resource: resource,
                ...options,
                isRoot: true
            });
        }
    };
    return ModulerV6;
}.call());