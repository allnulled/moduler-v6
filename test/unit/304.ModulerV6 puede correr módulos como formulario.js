module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;

  modulerV6.setRootdir(`${__dirname}/../assets/unit/304`);

  const output1 = await modulerV6.plugin.forms.run(`${__dirname}/../assets/unit/304/main.js`, {
    name: "Notior Bisnes",
  });
  
  console.log(output1);

  compilerV6._logger.log("Test 304 ok");
};