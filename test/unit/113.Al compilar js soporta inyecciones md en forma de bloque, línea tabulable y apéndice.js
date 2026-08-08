module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = compilerV6.createAssertFunction();
  const localCompiler = compilerV6.constructor.create(`${__dirname}/../assets/unit/113`);
  
  const compilation = await localCompiler.compile("@/main.js");

  assert(compilation.md.includes("Esto es un bloque de markdown."), "Can compile js file and extract all markdown comments (1)");
  assert(compilation.md.includes("Esto es un nuevo párrafo"), "Can compile js file and extract all markdown comments (2)");
  assert(compilation.md.includes("Esto es otro nuevo párrafo"), "Can compile js file and extract all markdown comments (3)");
  assert(compilation.md.includes("Esto es una nueva línea"), "Can compile js file and extract all markdown comments (4)");
  assert(compilation.md.includes("Puedes empezar listas así"), "Can compile js file and extract all markdown comments (5)");
  assert(compilation.md.includes("tabulación 0"), "Can compile js file and extract all markdown comments (6)");
  assert(compilation.md.includes("tabulación 1"), "Can compile js file and extract all markdown comments (7)");
  assert(compilation.md.includes("tabulación 2"), "Can compile js file and extract all markdown comments (8)");
  assert(compilation.md.includes("tabulación 3"), "Can compile js file and extract all markdown comments (9)");
  assert(compilation.md.includes("Inicio"), "Can compile js file and extract all markdown comments (10)");
  assert(compilation.md.includes("con +1 de"), "Can compile js file and extract all markdown comments (11)");
  assert(compilation.md.includes("con +2 de"), "Can compile js file and extract all markdown comments (12)");
  assert(compilation.md.includes("con +3 de"), "Can compile js file and extract all markdown comments (13)");
  assert(compilation.md.includes("5 a mano"), "Can compile js file and extract all markdown comments (14)");
  assert(compilation.md.includes("6 a mano"), "Can compile js file and extract all markdown comments (15)");
  assert(compilation.md.includes("con -1 de"), "Can compile js file and extract all markdown comments (16)");
  assert(compilation.md.includes("con -2 de"), "Can compile js file and extract all markdown comments (17)");
  assert(compilation.md.includes("con -3 de"), "Can compile js file and extract all markdown comments (18)");
  assert(compilation.md.includes("con 1 espacio"), "Can compile js file and extract all markdown comments (19)");
  assert(compilation.md.includes("sin espacios"), "Can compile js file and extract all markdown comments (20)");
  assert(compilation.md.includes("contenido interno"), "Can compile js file recursively and extract all markdown comments (21)");
  const pos1 = compilation.md.indexOf("bloque de markdown");
  const pos2 = compilation.md.indexOf("contenido interno");
  const pos3 = compilation.md.indexOf("sin espacios");
  assert((pos1 < pos2) && (pos2 < pos3), "Can compile js file recursively and extract all markdown comments and append them in the correct order (22)");

  compilerV6._logger.log("Test 113 ok");

};