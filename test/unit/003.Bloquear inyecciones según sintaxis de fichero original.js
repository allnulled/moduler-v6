module.exports = async function ({ assert, utils, modulerV6 }) {

  Respeta_jerarquia_js_css_md_en_injection_syntax: {
    const a = "test/assets/unit/003/cant-use-injects-from-css-to-js.css";
    await modulerV6._assertThrows(() => modulerV6.compile(a, { to: "code" }), "Cannot inject js files from css files", error => {
      return error.message.includes("From a «css» file");
    });
    modulerV6._tracer.stack = [];

    const b = "test/assets/unit/003/cant-use-injects-from-md-to-css.md";
    await modulerV6._assertThrows(() => modulerV6.compile(b, { to: "code" }), "Cannot inject css files from md files");
    modulerV6._tracer.stack = [];

    const c = "test/assets/unit/003/cant-use-injects-from-md-to-js.md";
    await modulerV6._assertThrows(() => modulerV6.compile(c, { to: "code" }), "Cannot inject js files from md files");
    modulerV6._tracer.stack = [];
    modulerV6._assert(true, "Reset del tracer.stack porque se han triggeado fallos a drede");
  }
  
  modulerV6._logger.log("Test 003 ok");

}