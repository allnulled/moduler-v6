/**
 * @name DevBinaryV6.Utils.prototype.executeUnitTestFileOf
 * @type 
 * @description 
 */
executeUnitTestFileOf(filepath, event) {
  if(event.isSrcWww) {
    console.log(`[*] DevBinaryV6 ignored test for browser file: ${filepath}`);
  } else {
    // console.log(`[*] Executing unit test file of: ${event.testFabrication.unitFile}`);
    delete require.cache[event.testFabrication.unitFile];
    if(!event.testFabrication.unitFile) return -2;
    return require(event.testFabrication.unitFile);
  }
}