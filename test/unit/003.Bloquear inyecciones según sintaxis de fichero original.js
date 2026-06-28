module.exports = async function ({ assert, utils, compilerV6 }) {

  Respeta_jerarquia_js_css_md_en_injection_syntax: {
    // break Respeta_jerarquia_js_css_md_en_injection_syntax;
    const a = "test/assets/unit/003/cant-use-injects-from-css-to-js.css";
    await compilerV6._assertThrows(() => compilerV6.compile(a, { to: "code" }), "Cannot inject js files from css files", error => {
      return error.message.includes("From a «css» file");
    });
    compilerV6._tracer.stack = [];

    const b = "test/assets/unit/003/cant-use-injects-from-md-to-css.md";
    await compilerV6._assertThrows(() => compilerV6.compile(b, { to: "code" }), "Cannot inject css files from md files");
    compilerV6._tracer.stack = [];

    const c = "test/assets/unit/003/cant-use-injects-from-md-to-js.md";
    await compilerV6._assertThrows(() => compilerV6.compile(c, { to: "code" }), "Cannot inject js files from md files");
    compilerV6._tracer.stack = [];
    compilerV6._assert(true, "Reset del tracer.stack porque se han triggeado fallos a drede");
  }
  
  compilerV6._logger.log("Test 003 ok");

}