/**
 * @name DevBinaryV6.Utils.prototype.executeUnitTestFileOf
 * @type 
 * @description 
 */
async executeUnitTestFileOf(filepath, event) {
  if(event.isSrcWww) {
    console.log(`[*] DevBinaryV6 ignored test for browser file: ${filepath}`);
  } else {
    console.log(`[*] Executing unit test file of: ${event.testFabrication.unitFile}`);
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
    const $ = this.devbin.compiler.constructor.ansi.colors;
    try {
      const testCallback = await require(testUnitFile);
      if(typeof testCallback === "function") {
        await testCallback.call({ devbin: this.devbin, filepath, event });
      }
    } catch (error) {
      console.log($.style("red,bold").text(`[!] Unit test error on file «${testUnitFile}»:`));
      console.log(error);
    }
  }
}