module.exports = async function({ assert, utils, modulerV6 }) {
  const a = "test/assets/unit/003/cant-use-injects-from-css-to-js.css";
  const b = "test/assets/unit/003/cant-use-injects-from-md-to-css.md";
  const c = "test/assets/unit/003/cant-use-injects-from-md-to-js.md";
  await modulerV6._assertThrows(() => modulerV6.compile(a, { to: "code" }), "Cannot inject js files from css files");
  modulerV6._tracer.stack = [];
  await modulerV6._assertThrows(() => modulerV6.compile(b, { to: "code" }), "Cannot inject css files from md files");
  modulerV6._tracer.stack = [];
  await modulerV6._assertThrows(() => modulerV6.compile(c, { to: "code" }), "Cannot inject js files from md files");
  modulerV6._tracer.stack = [];
  modulerV6._assert(true, "Reset del tracer.stack porque se han triggeado fallos a drede");
}