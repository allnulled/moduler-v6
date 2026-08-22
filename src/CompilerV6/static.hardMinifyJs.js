/**
 * @name CompilerV6.hardMinifyJs
 * @type 
 * @description 
 */
static async hardMinifyJs(code) {
  try {
    return await require("terser").minify(code, {
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
  } catch (error) {
    console.log(`[!] ERROR EN EL HARD-MINIFIER:`, error);
    return { code };
  }
}