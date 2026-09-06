/**
 * @name DevBinaryV6.Utils.prototype.executeUnitTestFileOf
 * @type 
 * @description 
 */
async executeUnitTestFileOf(filepath, event) {
  const $ = this.devbin.compiler.constructor.ansi.colors;
  if(event.isSrcWww) {
    console.log($.style("blackBright").text(`[*] DevBinaryV6 ignored test for browser file: ${filepath}`));
  } else if(!event.testFabrication.unitFile) {
    console.log($.style("blackBright").text(`[*] DevBinaryV6 missed test for file: ${filepath}`));
  } else {
    const unitRootpath = this.devbin.moduler.rootdirOf(event.testFabrication.unitFile);
    console.log($.style("cyan").text(`[*] Started unit test on:`) + " " + $.style("").text(unitRootpath));
    let testUnitFile = undefined;
    Get_unit_test_filepath: {
      if(event.testFabrication.unitFile) {
        testUnitFile = event.testFabrication.unitFile;
      } else if(filepath.endsWith(".test.js")) {
        testUnitFile = filepath;
      } else {
        return -2;
      }
    }
    delete require.cache[testUnitFile];
    try {
      const testCallback = await require(testUnitFile);
      if(typeof testCallback === "function") {
        await testCallback.call({ devbin: this.devbin, filepath, event });
      }
      console.log($.style("bgGreen,black,underline").text(`[*] Passed unit test on:`) + " " + $.style("").text(unitRootpath));
    } catch (error) {
      console.log($.style("bgRed,black,underline").text(`[!] Failed unit test on:`) + " " + $.style("underline").text(unitRootpath));
      console.log(error);
    }
  }
}