module.exports = async function({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {
  
  const assert = compilerV6.createAssertFunction() || assertLoudly;
  return;

  const { rootdir: currentRootdir, basedir: currentBasedir } = modulerV6;
  try {
    modulerV6.setRootdir(`${__dirname}/../assets/unit/304`);
    // Test omitido por funcionalidad no incorporada todavía.
    const output1 = await modulerV6.plugin.forms.run(`${__dirname}/../assets/unit/304/main.js`, {
      name: "Notior Bisnes",
    });
    // console.log(output1);
  } finally {
    modulerV6.setRootdir(currentRootdir);
    modulerV6.setBasedir(currentBasedir);
  }

  compilerV6._logger.log("Test 304 ok");
};