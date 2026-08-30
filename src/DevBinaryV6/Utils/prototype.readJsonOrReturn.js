/**
 * @name DevBinaryV6.Utils.prototype.readJsonOrReturn
 * @type 
 * @description 
 */
async readJsonOrReturn(file, fallbackValue = undefined) {
  try {
    const content = await require("fs").promises.readFile(file, "utf8");
    return JSON.parse(content);
  } catch (error) {
    return fallbackValue;
  }
}