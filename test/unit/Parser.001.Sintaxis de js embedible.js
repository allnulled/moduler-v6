module.exports = async function({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {
  
  assertLoudly(true, "ok");
  
  const output = await compilerV6.compile(`${__dirname}/../assets/unit/Parser.001/main.js`);

  console.log(output);

};