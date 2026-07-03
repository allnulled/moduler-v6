/**
 * @name ModulerV6.CssManager.constructor
 * @type 
 * @description 
 */
constructor(moduler, cloneOfCssManager = null) {
  this.trace("constructor", arguments);
  this.assert(typeof moduler === "object", `Parameter «moduler» must be object on «CssManager.constructor»`);
  this.assert(moduler instanceof ModulerV6, `Parameter «moduler» must be instance of ModulerV6 on «CssManager.constructor»`);
  /*="./prototype.moduler.js"*/
  /*="./prototype.sheets.js"*/
  /*="./prototype.parser.js"*/
  /*="./prototype._isTracing.js"*/
}