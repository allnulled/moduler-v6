module.exports = Promise.fromObject({
  a: $compiler.inject.module("./node-module2a.js"),
  b: $compiler.inject.module("./node-module2b.js"),
  c: $compiler.inject.module("./node-module2c.js"),
});