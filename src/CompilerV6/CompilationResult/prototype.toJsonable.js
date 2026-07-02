/**
 * @name CompilerV6.CompilationResult.prototype.toJsonable
 * @type 
 * @description 
 */
toJsonable() {
  return Object.assign({}, this, {
    // @CUSTOMIZABLE: override non-jsonable properties here:
    compiler: undefined,
    moduler: undefined,
  });
}