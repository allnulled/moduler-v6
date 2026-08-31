module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  let callback, compromise;

  devBinaryV6.console.setProfile("blackBright").print("Hooooooooooola en negro brillante");
  devBinaryV6.console.setProfile("greenBright").print("Hooooooooooola en verde brillante");
  devBinaryV6.console.setProfile("cyanBright").print("Hooooooooooola en cian brillante");
  devBinaryV6.console.setProfile("magentaBright").print("Hooooooooooola en magenta brillante");
  devBinaryV6.console.setProfile("yellowBright").print("Hooooooooooola en amarillo brillante");
  devBinaryV6.console.setProfile("blueBright").print("Hooooooooooola en azul brillante");

  compilerV6._logger.log("Test 414 ok");
};