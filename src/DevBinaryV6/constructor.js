/**
 * @name DevBinaryV6.constructor
 * @type 
 * @description 
 */
constructor(basedir) {
  this.compiler = new CompilerV6(basedir || process.cwd());
}