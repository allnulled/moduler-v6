module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  let callback, compromise;

  Es_un_test_muy_llamativo: {
    // Pero en principio funciona bien, así que:
    // break Es_un_test_muy_llamativo;
    devBinaryV6.console.setProfile("blackBright").print("    · Perfil de devbin.console en negro brillante");
    devBinaryV6.console.setProfile("yellowBright").print("    · Perfil de devbin.console en amarillo brillante");
    devBinaryV6.console.setProfile("greenBright").print("    · Perfil de devbin.console en verde brillante");
    devBinaryV6.console.setProfile("cyanBright").print("    · Perfil de devbin.console en cian brillante");
    devBinaryV6.console.setProfile("blueBright").print("    · Perfil de devbin.console en azul brillante");
    devBinaryV6.console.setProfile("magentaBright").print("    · Perfil de devbin.console en magenta brillante");
    devBinaryV6.console.setProfile("redBright").print("    · Perfil de devbin.console en rojo brillante");
  }

  compilerV6._logger.log("Test 414 ok");
};