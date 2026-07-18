module.exports = async function({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const basecode = `
    function(
      /*=¿{type:"basic/boolean"}*/varid_000 = true,/*?*/
      /*=¿{type:"basic/integer"}*/varid_001 = 100,/*?*/
      /*=¿{type:"basic/string"}*/varid_002 = "hello",/*?*/
      /*=¿{type:"basic/object"}*/varid_003 = {msg:"ok"},/*?*/
      /*=¿{type:"basic/array"}*/varid_004 = [1,2,3],/*?*/
    ) {}
  `;
  const output1 = compilerV6._parser.forEmbeddedForms.parse(basecode);
  
  assert(output1.tokens.length === 10, "Can parse embedded form tokens (1)");

  compilerV6._logger.log("Test 303 ok");
};