(function(mod) {
    if (typeof ModulerV6 !== "undefined") return ModulerV6;
    if (typeof window !== "undefined") window["ModulerV6"] = mod;
    if (typeof global !== "undefined") global["ModulerV6"] = mod;
})(function() {
    return class ModulerV6 {
        static Util=class ModulerV6Util {
            static AssertionError=class AssertionError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "AssertionError";
                }
            };
            static symbols={
                REGEX_FOR_SLASH_AT_THE_END: /(\\|\/)$/g,
                REGEX_FOR_PROTOCOL_BASED_PATH: /^([A-Za-z0-9\-\_\$]*)\:\/\//g,
                REGEX_FOR_ABSOLUTE_WINDOWS_PATH: /^(([A-Za-z]:(\\|\/))|((\\|\/){2}))/g
            };
            constructor(moduler) {
                this.assert(moduler instanceof ModulerV6, "Parameter «moduler» must be instance of ModulerV6 on «ModulerV6.Util.constructor»");
                this.moduler = moduler;
            }
            formatImportParameters(signature) {
                this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.Util.prototype.formatImportParameters»");
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
            formatExportParameters(signature) {
                this.assert(Array.isArray(signature), "Parameter «signature» must be array on «ModulerV6.prototype.formatExportParameters»");
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
            assert(condition, message) {
                if (!condition) throw new this.constructor.AssertionError(message);
            }
            joinPaths(subpaths, origin = false) {
                this.assert(Array.isArray(subpaths), `Parameter «subpaths» must be array on «ModulerV6.prototype.joinPaths»`);
                this.assert(subpaths.length !== 0, `Parameter «subpaths.length» cannot be 0 on «ModulerV6.prototype.joinPaths»`);
                let out = "";
                Join_paths_overwritting_when_required: for (let index = 0; index < subpaths.length; index++) {
                    const subpath = subpaths[index];
                    this.assert(typeof subpath === "string", `Parameter «subpaths[${index}]» must be string too on «ModulerV6.prototype.joinPaths»`);
                    this.assert(typeof subpath !== "", `Parameter «subpaths[${index}]» cannot be empty string on «ModulerV6.prototype.joinPaths»`);
                    if (subpath.includes("://")) {
                        this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_PROTOCOL_BASED_PATH), `Paths can only have «://» at the begining, and preceded only by a protocol id, if any in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
                        out = subpath;
                    } else if (subpath.includes(":\\") || subpath.includes(":/") || subpath.startsWith("\\\\") || subpath.startsWith("//")) {
                        this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_ABSOLUTE_WINDOWS_PATH), `Paths can only have «:\\|:/|\\\\|//» at the begining, and preceded only by a standard Windows disk unit identifier, if any in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
                        out = subpath;
                    } else if (subpath.startsWith("/")) {
                        out = subpath;
                    } else if (subpath.startsWith("./")) {
                        this.assert(typeof this.moduler.basedir === "string", `Cannot use «./» expression because «this.moduler.basedir» is «${typeof this.moduler.basedir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
                        out = this.appendPathSeparator(this.moduler.basedir) + subpath.substr(2);
                    } else if (subpath.startsWith("../")) {
                        this.assert(typeof this.moduler.basedir === "string", `Cannot use «../» expression because «this.moduler.basedir» is «${typeof this.moduler.basedir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
                        out = this.appendPathSeparator(this.moduler.basedir, "..") + subpath.substr(3);
                    } else if (subpath.startsWith("@/")) {
                        this.assert(typeof this.moduler.rootdir === "string", `Cannot use «@/» expression because «this.moduler.rootdir» is «${typeof this.moduler.rootdir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
                        out = this.appendPathSeparator(this.moduler.rootdir) + subpath.substr(2);
                    } else {
                        if (out.length) {
                            out = this.appendPathSeparator(out) + subpath;
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
                let i = 0;
                while (i < path.length) {
                    const c = path[i];
                    if (c === "/" || c === "\\") {
                        out.push("");
                    } else {
                        out[out.length - 1] += c;
                    }
                    i++;
                }
                return out;
            }
            appendPathSeparator(subpath) {
                return subpath.replace(this.constructor.symbols.REGEX_FOR_SLASH_AT_THE_END, "") + "/";
            }
        };
        static assert(condition, message) {
            if (!condition) throw new this.Util.AssertionError(message);
        }
        constructor(basedir, cloneOf = null) {
            this.assert(typeof basedir === "string", `Parameter «basedir» must be string on «Moduler.constructor»`);
            this.basedir = basedir;
            this.rootdir = cloneOf ? cloneOf.rootdir : basedir;
            this.modules = {};
        }
        util=new this.constructor.Util(this);
        assert(condition, message) {
            return this.util.assert(condition, message);
        }
        normalizationOf(subpath) {
            this.assert(typeof subpath === "string", `Parameter «subpath» must be string on «ModulerV6.prototype.normalizationOf»`);
            return this.util.joinPaths([ subpath ], "normalizationOf");
        }
        basedirOf(subpath) {
            const normalized = this.util.joinPaths([ subpath ], "basedirOf");
            const basedirSeparated = this.util.appendPathSeparator(this.basedir);
            if (normalized.startsWith(basedirSeparated)) {
                return normalized.replace(basedirSeparated, "./");
            }
            return normalized;
        }
        rootdirOf(subpath) {
            const normalized = this.util.joinPaths([ subpath ], "rootdirOf");
            const rootdirSeparated = this.util.appendPathSeparator(this.rootdir);
            if (normalized.startsWith(rootdirSeparated)) {
                return normalized.replace(rootdirSeparated, "@/");
            }
            return normalized;
        }
        import(...signature) {
            const parameters = this.util.formatImportParameters(signature);
        }
        export(...signature) {
            const parameters = this.util.formatExportParameters(signature);
        }
        cloneForFile(filepath) {
            const dirpath = this.util.joinPaths([ filepath, ".." ]);
            return new ModulerV6(dirpath, this);
        }
    };
}.call());