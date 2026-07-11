/**
 * @name CompilerV6.CompilationProcess._defaultProcessData
 * @type 
 * @description 
 */
static get _defaultProcessData() {
  return {
    processedEntries: {},
    // @ATENTION: Si se descomenta petan los tests:
    // uncacheInjections: false,
    dontCreateOnInjectSource: true,
  }
};