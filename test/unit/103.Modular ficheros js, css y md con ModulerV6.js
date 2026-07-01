module.exports = async function ({ assert, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/103/main.js`);
  const compilation = await compilerV6.compile("test/assets/unit/103/main.js", { beautify: true, minify: true });

  console.log(compilation);
  
  const main = await submoduler.import("main.js")

  console.log(main);

};