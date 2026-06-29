(function(mod) {
    if (typeof ModulerV6 !== "undefined") return ModulerV6;
    if (typeof window !== "undefined") window["ModulerV6"] = mod;
    if (typeof global !== "undefined") global["ModulerV6"] = mod;
    // if (typeof module !== 'undefined') module.exports = mod;
})(function() {
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
}.call());