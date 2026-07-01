/**
 * @name CompilerV6.beautifyJs
 * @type 
 * @description 
 */
static beautifyJs(code) {
  return require("prettier").format(code, {
    parser: "babel"
  });
}