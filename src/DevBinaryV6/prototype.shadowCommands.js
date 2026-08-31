/**
 * @name DevBinaryV6.prototype.shadowCommands
 * @type 
 * @description 
 */
this.shadowCommands = parent ? parent.shadowCommands : new this.constructor.ShadowCommands(this);
// this.shadowCommands = new this.constructor.ShadowCommands(this);