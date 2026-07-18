module.exports = async function({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction();
  
  Test_basico: {
    const compilation1 = await compilerV6.compile(`${__dirname}/../assets/unit/302/main.js`, { beautify: false, minify: false });
    assert(compilation1.js === "750 === 550 + 200", "Can compile template syntax on devtime by compiler-v6 (basic test)");
  }

  Test_avanzado: {
    const compilation2 = await compilerV6.compile(`${__dirname}/../assets/unit/302/main2.js`, { beautify: false, minify: false });
    assert(compilation2.js === "ok".repeat(4), "Can compile template syntax on devtime by compiler-v6 (advanced test)");
  }

  compilerV6._logger.log("Test 302 ok");
};