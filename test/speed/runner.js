module.exports = async function main(injection) {

  const filenames = await require("fs").promises.readdir(`${__dirname}/entry`);
  console.log(` · Starting speed tests: ${filenames.length}`);
  Iterating_tests:
  for(let index=0; index<filenames.length; index++) {
    const filename = filenames[index];
    const filepath = `${__dirname}/entry/${filename}`;
    if(!filename.endsWith(".js")) {
      continue Iterating_tests;
    }
    console.log(`  · Starting speed test «${filename.replace(/\.js$/g,'')}»`);
    const callback = require(filepath);
    const output = await callback(injection);
    console.log(`  · Ended speed test «${filename.replace(/\.js$/g,'')}»`);
  }

};