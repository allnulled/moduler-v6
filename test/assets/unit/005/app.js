LocalModuler.export("app", [
  "./framework-1.js",
  "./framework-2.js",
  "./framework-3.js",
], async function(fw1, fw2, fw3) {
  return { fw1, fw2, fw3, };
});