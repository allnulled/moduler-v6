/**
 * @name ModulerV6.constructor
 * @type 
 * @description 
 */
constructor(basedirArg = null, cloneOf = null) {
  const basedir = (basedirArg === null) ? this.constructor.getEnvironmentDirectory() : basedirArg;
  this.assert(typeof basedir === "string", `Parameter «basedir» must be string and not «${typeof basedir}» on «ModulerV6.constructor»`);
  this.assert(typeof cloneOf === "object", `Parameter «cloneOf» must be object or null not «${typeof cloneOf}» on «ModulerV6.constructor»`);
  /*="./prototype.basedir.js"*/
  /*="./prototype.rootdir.js"*/
  /*="./prototype.modules.js"*/
  /*="./prototype.grammars.js"*/
  /*="./prototype.parser.js"*/
  /*="./prototype.css.js"*/
}