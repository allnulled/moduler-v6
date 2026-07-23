/**
 * @name DevBinaryV6.Utils.prototype.executeUnitTestFileOf
 * @type 
 * @description 
 */
executeUnitTestFileOf(filepath, event) {
  if(event.isWww) {
    console.log(`[*] No test for browser file: ${filepath}`);
  } else {
    console.log(`[*] Executing unit test file of: ${event.testFabrication.unitFile}`);
    delete require.cache[event.testFabrication.unitFile];
    return require(event.testFabrication.unitFile);
  }
}