$compiler.inject.source("./header.js");
module.exports = {
  AmbivalentModule0: "ok",
  AmbivalentModule1: $compiler.inject.module("./ambivalent-module-1.js"),
};