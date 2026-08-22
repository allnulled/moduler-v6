/**
 * @name CompilerV6.softMinifyJs
 * @type 
 * @description 
 */
static async softMinifyJs(code) {
  try {
    return await require("terser").minify(code, {
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
  } catch (error) {
    console.log(`[!] ERROR EN EL SOFT-MINIFIER:`, error);
    return {code};
  }
}