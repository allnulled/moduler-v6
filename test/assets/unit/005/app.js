local$moduler.export("#app", [
  "./framework-1.js",
  "./framework-2.js",
  "./framework-3.js",
  "./framework-2.css",
  "./framework-3.css",
  "./framework-3.md",
], async function(fw1, fw2, fw3) {
  return { fw1, fw2, fw3, };
});
local$moduler.import("./payload.js");
local$moduler.import("#app");
local$moduler.import([
  "./imported-1.js",
  "./imported-1.css",
  "./imported-1.md",
], async function(fw1, fw2, fw3) {
  return { fw1, fw2, fw3, };
});
local$moduler.export("#app2", [
  "./exported-1.js",
  "./exported-2.js",
]);
local$moduler.export("#app3", "./exported-3.js");

