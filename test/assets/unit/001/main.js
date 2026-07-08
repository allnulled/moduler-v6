const noop = () => {};
noop("Cosas antes");
noop("Cosas antes");
noop("Cosas antes");
noop("Cosas antes");

$moduler.export("#Nombre de módulo", ["./mod1.js","./mod2.js","./mod3.css"], async ([js1, js2, css3]) => {
  const inj1 = $compiler.inject.source("./inj1.js");
  const inj2 = $compiler.inject.source("./inj2.js");
  return this.expandParametersWith({
    inj1,
    inj2,
    js1,
    js2,
    css3,
  });
});

noop("Cosas después");
noop("Cosas después");
noop("Cosas después");
noop("Cosas después");