/**
 * @name CompilerV6.prototype._die
 * @type 
 * @description 
 */
_die(...args) {
  this._trace("die", arguments);
  console.log("[DIE]", ...args);
  process.exit(0);
}