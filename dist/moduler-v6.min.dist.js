(function(mod) {
    if (typeof ModulerV6 !== "undefined") return ModulerV6;
    if (typeof window !== "undefined") window["ModulerV6"] = mod;
    if (typeof global !== "undefined") global["ModulerV6"] = mod;
})(function() {
    return class ModulerV6 {
        static AssertionError=class AssertionError extends Error {
            constructor(message) {
                super(message);
                this.name = "AssertionError";
            }
        };
        static assert(condition, message) {
            if (!condition) throw new this.AssertionError(message);
        }
        constructor(basedir) {
            this.basedir = basedir;
            this.modules = {};
        }
        assert(condition, message) {
            if (!condition) throw new this.constructor.AssertionError(message);
        }
        import(...signature) {
            const parameters = this._formatImportParameters(signature);
        }
        export(...signature) {
            const parameters = this._formatExportParameters(signature);
        }
        _formatImportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must have  on «ModulerV6.prototype._formatImportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.import cannot have 0 arguments");
            if (signature.length === 1) {
                if (typeof signature[0] === "string") {} else if (typeof signature[0] === "object") {} else if (typeof signature[0] === "function") {} else {
                    this.assert(false, `ModulerV6.prototype.import used with 1 argument does not support the signature: ${typeof signature[0]}`);
                }
            } else if (signature.length === 2) {
                if (typeof signature[0] === "object" && typeof signature[1] === "function") {} else {
                    this.assert(false, `ModulerV6.prototype.import used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
                }
            } else {
                this.assert(false, `ModulerV6.prototype.import cannot have ${signature.length} arguments`);
            }
        }
        _formatExportParameters(signature) {
            this.assert(Array.isArray(signature), "Parameter «signature» must have  on «ModulerV6.prototype._formatExportParameters»");
            this.assert(signature.length !== 0, "ModulerV6.prototype.export cannot have 0 arguments");
            this.assert(signature.length !== 1, "ModulerV6.prototype.export cannot have 1 argument only");
            if (signature.length === 2) {
                if (typeof signature[0] === "string" && typeof signature[1] === "function") {} else if (typeof signature[0] === "string" && typeof signature[1] === "string") {} else if (typeof signature[0] === "string" && typeof signature[1] === "object") {} else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}`);
                }
            } else if (signature.length === 3) {
                if (typeof signature[0] === "string" && typeof signature[1] === "object" && typeof signature[2] === "function") {} else {
                    this.assert(false, `ModulerV6.prototype.export used with 2 arguments does not support the signature: ${typeof signature[0]}, ${typeof signature[1]}, ${typeof signature[2]}`);
                }
            } else {
                this.assert(false, `ModulerV6.prototype.export cannot have ${signature.length} arguments`);
            }
        }
    };
}.call());