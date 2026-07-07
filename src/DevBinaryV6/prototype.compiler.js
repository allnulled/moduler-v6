/**
 * @name DevBinaryV6.prototype.compiler
 * @type 
 * @description 
 */
this.compiler = new CompilerV6(basedir || process.cwd(), ...(parent ? [parent.compiler] : []));