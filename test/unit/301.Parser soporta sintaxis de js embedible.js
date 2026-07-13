module.exports = async function({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;
  assert(true, "ok");

  const basecode = 'aaa/*%=500 + 300*/() {}aaa';
  const output1 = compilerV6._parser.forTemplateComments.parse(basecode);
  assert(output1.tokens.length === 1, "can parse comments with adequate parser (1)");
  assert(output1.tokens[0].inner === "500 + 300", "can parse comments with adequate parser (2)");
  assert(output1.tokens[0].outer.endsWith("*/() {}"), "can parse comments with adequate parser (3)");

};