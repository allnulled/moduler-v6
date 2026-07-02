module.exports = async function ({ assert, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/103/main.js`);
  const subcompiler = compilerV6._cloneForFile(`${__dirname}/../assets/unit/103/main.js`);
  console.log(subcompiler.basedir);
  const compilation = await subcompiler.compile("./main.js", { beautify: true, minify: true });
  const persistence = await compilation.toFile("./main.dist.js");
  
  console.log(compilation);
  console.log(persistence);
  
  const main = await submoduler.import("main.js")

  console.log(main);

};