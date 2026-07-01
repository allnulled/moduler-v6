/**
 * @name CompilerV6.hardMinifyJs
 * @type 
 * @description 
 */
static hardMinifyJs(code) {
  return require("terser").minify(code, {
    compress: {
      defaults: true,
      passes: 5,
      unsafe: true,
      toplevel: true
    },
    mangle: {
      toplevel: true
    },
  });
}