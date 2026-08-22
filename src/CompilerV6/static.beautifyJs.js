/**
 * @name CompilerV6.beautifyJs
 * @type 
 * @description 
 */
static beautifyJs(code) {
  try {
    return require("prettier").format(code, {
      parser: "babel"
    });
  } catch (error) {
    console.error(`[!] ERROR DESDE EL BEAUTIFIER:`, error);
    return code;
  }
}