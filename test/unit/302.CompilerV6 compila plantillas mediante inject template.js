module.exports = async function({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {
  
  const assert = assertLoudly || compilerV6.createAssertFunction();
  
  assertLoudly(true, "ok");

  const compilation = await compilerV6.compile(`${__dirname}/../assets/unit/302/main.js`);
  
  console.log(compilation);

};