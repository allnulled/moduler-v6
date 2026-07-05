module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  Resolucion_en_bug_noticiado: {
    assert(typeof DevBinaryV6 === "function", "Can find DevBinary class");
    assert(typeof devBinaryV6 === "object", "Can find devBinary instance");
    const innerDir = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const innerDir2 = devBinaryV6.compiler.moduler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const root1 = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing");
    assert(innerDir === innerDir2, "condicion temporal 1");
    const innerRoot = await DevBinaryV6._findFirstParentDirectoryContaining(innerDir);
    const innerRoot2 = await DevBinaryV6._findFirstParentDirectoryContaining(root1 + "/..");
    assert(innerRoot === root1, "Can find first parent directory containing certain file (1)");
    assert(innerRoot2 !== root1, "Can find first parent directory containing certain file (2)");
  }

  Sincronia_entre_compiler_y_moduler: {
    From_compiler_to_moduler: {
      const compiler1 = new CompilerV6(process.cwd());
      compiler1.setBasedir(`${__dirname}/../assets/008`);
      assert(compiler1.basedir === compiler1.moduler.basedir, "Can .setBasedir and change compiler and moduler basedir (1)");
      assert(compiler1.normalizationOf("./whatever.js") === compiler1.moduler.normalizationOf("./whatever.js"), "Can change basedir of compiler and be reflected on moduler (2)");
    }
    From_moduler_to_compiler: {
      const compiler2 = new CompilerV6(process.cwd());
      compiler2.moduler.setBasedir(`${__dirname}/../assets/008`);
      assert(compiler2.basedir === compiler2.moduler.basedir, "Can .setBasedir and change compiler and moduler basedir (3)");
      assert(compiler2.normalizationOf("./whatever.js") === compiler2.moduler.normalizationOf("./whatever.js"), "Can change basedir of compiler and be reflected on moduler (4)");
    }
  }

  compilerV6._logger.log("Test 008 ok");

};