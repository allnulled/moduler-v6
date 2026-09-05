module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  const code1 = `$moduler.import("./file.js", ["./more/files.js", "./and/more/files.js"], Some.function())`;
  const pos1 = "$moduler.import(".length;
  const out1 = compilerV6.moduler._findStringOrArrayEnd(code1, pos1);
  const validFragment = code1.slice(pos1, out1);
  const value = (new Function(`return [${validFragment}]`)).call();
  assert(Array.isArray(value), "Can find strings/arrays valid list fragment from code and position (1)");
  assert(value.length === 2, "Can find strings/arrays valid list fragment from code and position (2)");
  assert(value[0] === "./file.js", "Can find strings/arrays valid list fragment from code and position (3)");
  assert(value[1][0] === "./more/files.js", "Can find strings/arrays valid list fragment from code and position (4)");
  assert(value[1][1] === "./and/more/files.js", "Can find strings/arrays valid list fragment from code and position (5)");

  compilerV6._logger.log("Test 416 ok");
};