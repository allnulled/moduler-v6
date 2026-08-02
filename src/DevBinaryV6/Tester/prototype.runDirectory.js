async runDirectory(dirInput, filterCallback = false, _ignoreFiles = ["runner.js"], injection = {}, _testsType = false) {
  /**
   * @name DevBinaryV6.Tester.prototype.runDirectory
   * @type 
   * @description 
   */
  const fs = require("fs");
  const path = require("path");
  const ERROR_SEPARATOR = `\n - `;
  const dir = this.devbin.compiler.normalizationOf(dirInput);
  const testsType = _testsType || path.basename(dir);
  const testFiles = (await fs.promises.readdir(dir)).filter(file => {
    const endsWithJs = file.endsWith(".js");
    const isNotIgnored = !_ignoreFiles.includes(file);
    const passesFilter = filterCallback ? filterCallback(file) : true;
    return endsWithJs && isNotIgnored && passesFilter;
  });
  const $ = this.devbin.compiler.constructor.ansi.colors;
  const errors = [];
  const crono = this.devbin.constructor.Cronometer();
  for (let index = 0; index < testFiles.length; index++) {
    const testName = testFiles[index];
    const testFile = `${dir}/${testName}`;
    console.log($.style("cyanBright,italic").text(`🟢 Starting «${testName}» [${testsType}:${index + 1}/${testFiles.length}]`));
    let testCallback;
    try {
      const _testCallback = require(testFile);
      this.devbin.compiler.assert(typeof _testCallback === "function", `Test type «${testsType}» with name «${testName}» must export a callback`);
      testCallback = _testCallback;
    } catch (error) {
      const expression = `🟣 Bad exportation on «${testsType}:${index}» named «${testName}»${ERROR_SEPARATOR}${error.name}: ${error.message}${ERROR_SEPARATOR}${error.stack}`;
      console.log($.style("red,italic").text($.box(expression)));
      errors.push({ test: testName, error, expression, });
    }
    if (testCallback) {
      const testId = `${testsType}@${index}:${testName}`;
      const testCronometer = crono(testId).open("Started");
      try {
        await testCallback({
          DevBinaryV6: this.devbin.constructor,
          devBinaryV6: this.devbin,
          ...injection
        });
        testCronometer.stop("Success");
        const expression = `🟢 Done: «${testName}» [${testsType}:${index + 1}/${testFiles.length}] [⏳=${testCronometer.milliseconds()}]`;
        console.log($.style("green,italic").text(expression));
      } catch (error) {
        testCronometer.stop("Failure");
        const expression = `🔴 Failed «${testName}» [${testsType}:${index + 1}/${testFiles.length}]${ERROR_SEPARATOR}${error.name}: ${error.message}${ERROR_SEPARATOR}${error.stack}`;
        console.log($.style("red,italic").text(expression));
        errors.push({ test: testName, error, expression, });
      }
    }
  }
  if (testFiles.length) {
    if (errors.length) {
      console.log($.style("cyan").text(`⚠️  Errors report of «${testsType}» tests:`));
      for (let index = 0; index < errors.length; index++) {
        const { test, error, expression } = errors[index];
        console.log($.style("magenta").text($.box(`  - Error nº${index + 1}/${errors.length}: ${ERROR_SEPARATOR}` + expression)));
      }
    } else {
      console.log($.style("greenBright,bold").text($.box(`💎 No errors reported on «${testsType}» tests`)));
    }
  }
}