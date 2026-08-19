async runDirectory(dirInput, options = {}) {
  /**
   * @name DevBinaryV6.Tester.prototype.runDirectory
   * @type 
   * @description 
  */
  const {
    filter = false,
    ignore = ["runner.js"],
    injection = {},
    title = false,
    filename = false
  } = options;
  Validate_properties_because_it_is_faulty: {
    const validOptions = ["filter","ignore","injection","title","filename"];
    for(let prop in options) {
      this.devbin.assert(validOptions.includes(prop), `Parameter «options» does not accept property «${prop}» on «DevBinaryV6.Tester.prototype.runDirectory»`);
    }
  }
  const fs = require("fs");
  const path = require("path");
  const ERROR_SEPARATOR = `\n - `;
  const dir = this.devbin.compiler.normalizationOf(dirInput);
  const testsType = title || path.basename(dir);
  const testFiles = (await fs.promises.readdir(dir)).filter(file => {
    // const endsWithJs = file.endsWith(".js");
    const isNotIgnored = !ignore.includes(file);
    const passesFilter = filter ? filter(file) : true;
    return isNotIgnored && passesFilter;
  });
  const ansiTool = this.devbin.compiler.constructor.ansi.colors;
  console.log(`[*] DevBinaryV6 found ${testFiles.length} tests` + (title ? ` for «${title}»` : ""));
  const errors = [];
  const crono = this.devbin.constructor.Cronometer();
  for (let index = 0; index < testFiles.length; index++) {
    const testName = testFiles[index];
    const testFile = `${dir}/${testName}` + (filename ? `/${filename}` : "");
    console.log(ansiTool.style("cyanBright,italic").text(`🟢 Starting «${testName}» [${testsType}:${index + 1}/${testFiles.length}]`));
    let testCallback;
    try {
      const _testCallback = require(testFile);
      this.devbin.compiler.assert(typeof _testCallback === "function", `Test type «${testsType}» with name «${testName}» must export a callback`);
      testCallback = _testCallback;
    } catch (error) {
      const expression = `🟣 Bad exportation on «${testsType}:${index}» named «${testName}»${ERROR_SEPARATOR}${error.name}: ${error.message}${ERROR_SEPARATOR}${error.stack}`;
      console.log(ansiTool.style("red,italic").text(ansiTool.box(expression)));
      errors.push({ test: testName, error, expression, });
    }
    if (testCallback) {
      const testId = `${testsType}@${index}:${testName}`;
      const testCronometer = crono(testId).open("Started");
      try {
        await testCallback({
          // clases:
          DevBinaryV6: this.devbin.constructor,
          CompilerV6: this.devbin.compiler.constructor,
          ModulerV6: this.devbin.moduler.constructor,
          // instancias:
          devBinaryV6: this.devbin,
          compilerV6: this.devbin.compiler,
          modulerV6: this.devbin.moduler,
          // custom:
          ...injection
        });
        testCronometer.stop("Success");
        const expression = `🟢 Done: «${testName}» [${testsType}:${index + 1}/${testFiles.length}] [⏳=${testCronometer.milliseconds()}]`;
        console.log(ansiTool.style("green,italic").text(expression));
      } catch (error) {
        testCronometer.stop("Failure");
        const expression = `🔴 Failed «${testName}» [${testsType}:${index + 1}/${testFiles.length}]${ERROR_SEPARATOR}${error.name}: ${error.message}${ERROR_SEPARATOR}${error.stack}`;
        console.log(ansiTool.style("red,italic").text(expression));
        errors.push({ test: testName, error, expression, });
      }
    }
  }
  if (testFiles.length) {
    if (errors.length) {
      console.log(ansiTool.style("cyan").text(`⚠️  Errors report of «${testsType}» tests:`));
      for (let index = 0; index < errors.length; index++) {
        const { test, error, expression } = errors[index];
        console.log(ansiTool.style("magenta").text(ansiTool.box(`  - Error nº${index + 1}/${errors.length}: ${ERROR_SEPARATOR}` + expression)));
      }
    } else {
      console.log(ansiTool.style("greenBright,bold").text(ansiTool.box(`💎 No errors reported on «${testsType}» tests`)));
    }
  }
}