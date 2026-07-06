module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  Resolucion_en_bug_noticiado: {
    assert(typeof DevBinaryV6 === "function", "Can find DevBinary class");
    assert(typeof devBinaryV6 === "object", "Can find devBinary instance");
    const innerDir = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const innerDir2 = devBinaryV6.compiler.moduler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing/src/vendor/artifact");
    const root1 = devBinaryV6.compiler.normalizationOf("@/test/assets/unit/008/find-first-parent-directory-containing");
    assert(innerDir === innerDir2, "condicion temporal 1");
    const innerRoot = await DevBinaryV6.Utils.findFirstParentDirectoryContaining(innerDir);
    const innerRoot2 = await DevBinaryV6.Utils.findFirstParentDirectoryContaining(root1 + "/..");
    assert(innerRoot === root1, "Can find first parent directory containing certain file (1)");
    assert(innerRoot2 !== root1, "Can find first parent directory containing certain file (2)");
  }

  Sincronia_entre_compiler_y_moduler: {
    From_compiler_to_moduler_basedir: {
      const compiler1 = new CompilerV6(process.cwd());
      compiler1.setBasedir(`${__dirname}/../assets/008`);
      assert(compiler1.basedir === compiler1.moduler.basedir, "Can .setBasedir and change compiler and moduler basedir (1)");
      assert(compiler1.normalizationOf("./whatever.js") === compiler1.moduler.normalizationOf("./whatever.js"), "Can change basedir of compiler and be reflected on moduler (2)");
    }
    From_moduler_to_compiler_basedir: {
      const compiler2 = new CompilerV6(process.cwd());
      compiler2.moduler.setBasedir(`${__dirname}/../assets/008`);
      assert(compiler2.basedir === compiler2.moduler.basedir, "Can .setBasedir and change compiler and moduler basedir (3)");
      assert(compiler2.normalizationOf("./whatever.js") === compiler2.moduler.normalizationOf("./whatever.js"), "Can change basedir of compiler and be reflected on moduler (4)");
    }
    From_compiler_to_moduler_rootdir: {
      const compiler1 = new CompilerV6(process.cwd());
      compiler1.setRootdir(`${__dirname}/../assets/008`);
      assert(compiler1.rootdir === compiler1.moduler.rootdir, "Can .setRootdir and change compiler and moduler rootdir (5)");
      assert(compiler1.normalizationOf("./whatever.js") === compiler1.moduler.normalizationOf("./whatever.js"), "Can change rootdir of compiler and be reflected on moduler (6)");
    }
    From_moduler_to_compiler_rootdir: {
      const compiler2 = new CompilerV6(process.cwd());
      compiler2.moduler.setRootdir(`${__dirname}/../assets/008`);
      assert(compiler2.rootdir === compiler2.moduler.rootdir, "Can .setRootdir and change compiler and moduler rootdir (7)");
      assert(compiler2.normalizationOf("./whatever.js") === compiler2.moduler.normalizationOf("./whatever.js"), "Can change rootdir of compiler and be reflected on moduler (8)");
    }
  }

  compilerV6._logger.log("Test 008 ok");

};