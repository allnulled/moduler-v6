/**
 * @name CompilerV6.softMinifyJs
 * @type 
 * @description 
 */
static softMinifyJs(code) {
  return require("terser").minify(code, {
    compress: {
      sequences: true,
    },
    mangle: false,
    toplevel: true,
    format: {
      comments: false, // Esta es la única cambiada
      beautify: true,
      indent_level: 2,
      max_line_len: true,
    }
  });
}