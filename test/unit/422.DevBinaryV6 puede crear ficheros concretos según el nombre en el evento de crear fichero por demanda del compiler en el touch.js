module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/422`);

  Extraer_atributos_de_fichero: {
    const attrs1 = devbinOne.compiler._extractFilenameAttributes("interface.class.Someone.entry.js");
    assert(attrs1.list.includes("interface"), "can extract filename attributes correctly (1)");
    assert(attrs1.list.includes("class"), "can extract filename attributes correctly (2)");
    assert(attrs1.list.includes("entry"), "can extract filename attributes correctly (3)");
  }

  

  compilerV6._logger.log("Test 422 ok");
};