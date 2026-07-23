/**
 * @name DevBinaryV6.Utils.prototype.instrumentCode
 * @type 
 * @description 
 */
instrumentCode(code, filename) {
  const { createInstrumenter } = require("istanbul-lib-instrument");
  const instrumenter = createInstrumenter({ produceSourceMap: true, esModules: true, });
  const instrumented = instrumenter.instrumentSync(code, filename);
  return instrumented;
}