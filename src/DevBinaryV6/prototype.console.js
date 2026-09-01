/**
 * @name DevBinaryV6.prototype.console
 * @type 
 * @description 
 */
this.console = parent ? parent.console : this.constructor.Console.create({ devbin: this });