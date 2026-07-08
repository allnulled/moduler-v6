$moduler.export("#una/seccion/concreta", async function() {
  return {a:8};
});

$moduler.import("./example-1.js");

$moduler.import(["./example-2.js","./example-3.js"]);

console.log($moduler.section.get("una/seccion/concreta"));