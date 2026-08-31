module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  let callback, compromise;

  callback = function() {};
  DevBinaryV6.System.Process.on("exit");
  assert(!DevBinaryV6.System.Process.listeners["exit"].includes(callback), "Can append callbacks on process exit and cancel them (1)");
  compromise = DevBinaryV6.System.Process.on("exit").add(callback);
  assert(DevBinaryV6.System.Process.listeners["exit"].includes(callback), "Can append callbacks on process exit and cancel them (2)");
  compromise.cancel();
  assert(!DevBinaryV6.System.Process.listeners["exit"].includes(callback), "Can append callbacks on process exit and cancel them (3)");

  Borrar_luego: {
    [
      // Caso 1: el fundamental
      [
        devBinaryV6.moduler.normalizationOf("@/ok/something"),
        devBinaryV6.compiler.files.getDirectoryOf("@/ok/something/file.txt"),
      ]
    ].forEach((it, index) => {
      assert(it[0] === it[1], `Can use getDirectoryOf as expected (${index}) (1:${it[0]}) (2:${it[1]})`);
    });
  }

  compilerV6._logger.log("Test 413 ok");
};