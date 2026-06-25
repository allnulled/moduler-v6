console.log("Cosas antes");
console.log("Cosas antes");
console.log("Cosas antes");
console.log("Cosas antes");

$v6.export.js(["./mod1.js","./mod2.js","./mod3.css"], async ([js1, js2, css3], module) => {
  const inj1 = $v6.inject.source("./inj1.js");
  const inj2 = $v6.inject.source("./inj2.js");
  module.exports = this.expandParametersWith({
    inj1,
    inj2,
    js1,
    js2,
    css3,
  });
});

console.log("Cosas después");
console.log("Cosas después");
console.log("Cosas después");
console.log("Cosas después");