module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  
  console.log(modulerV6.runtime);
  
  await modulerV6.runtime.constructor.onLoaded.promise;

  assert(modulerV6.runtime.isBrowser === false, "modulerV6 debe tener acceso a las propiedades del runtime (1)");
  assert(modulerV6.runtime.isNodejs === true, "modulerV6 debe tener acceso a las propiedades del runtime (2)");
  assert(modulerV6.runtime.isDev === true, "modulerV6 debe tener acceso a las propiedades del runtime (3)");
  assert(modulerV6.runtime.isTest === false, "modulerV6 debe tener acceso a las propiedades del runtime (4)");
  assert(modulerV6.runtime.isProd === false, "modulerV6 debe tener acceso a las propiedades del runtime (5)");

  compilerV6._logger.log("Test 110 ok");

};