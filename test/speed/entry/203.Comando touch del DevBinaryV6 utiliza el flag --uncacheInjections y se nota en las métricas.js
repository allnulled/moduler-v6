module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction();

  const NIVELES = 300;
  const VECES_COMANDO = 6;
  const REPETICIONES = 1;

  const fs = require("fs");
  const path = require("path");

  try {
    await fs.promises.rm(`${__dirname}/../../assets/unit/203`, { recursive: true });
  } catch (error) {
    // @OK puede que no exista
  }
  await fs.promises.mkdir(`${__dirname}/../../assets/unit/203`);
  assert(!fs.existsSync(`${__dirname}/../../assets/unit/203/package.json`), "No package.json should be here now");
  await devBinaryV6.command(["new", "project", "--from", `${__dirname}/../../assets/unit/203`]);
  assert(fs.existsSync(`${__dirname}/../../assets/unit/203/package.json`), "Command «devbin new project» should have created a package.json file here now");


  const insertInjectionsSourcesFrom = async function (dir, levels = 4, isRoot = false) {
    const isLast = levels === 0;
    if (!isLast) {
      let content = `noop(${levels});\n$compiler.inject.source("./inner/item.entry.js")`;
      content = !isRoot ? content : `const noop = () => {};\n${content}`;
      await fs.promises.writeFile(`${dir}/item.entry.js`, content, "utf8");
      await fs.promises.mkdir(`${dir}/inner`);
      return await insertInjectionsSourcesFrom(`${dir}/inner`, levels - 1);
    } else {
      await fs.promises.writeFile(`${dir}/item.entry.js`, 'console.log("OK!")', "utf8");
    }
    return `${dir}/item.entry.js`;
  };

  await fs.promises.mkdir(`${__dirname}/../../assets/unit/203/src/main`);
  const lastFile = await insertInjectionsSourcesFrom(`${__dirname}/../../assets/unit/203/src/main`, NIVELES, true);

  const devbin1 = devBinaryV6.cloneForFile(`${__dirname}/../../assets/unit/203/package.json`);

  const speedTest1 = async function (extraArgs = [], extraMsg = "") {
    const variosTests = [];
    devbin1.cronometer.reset();
    for (let index = 0; index < VECES_COMANDO; index++) {
      const crono1 = devbin1.cronometer(`touch de profundidad ${NIVELES} niveles`).open("ok inicio");
      await devbin1.command(["touch", "--file", lastFile, "--trace", "touch command speed test", ...extraArgs]);
      crono1.stop("ok");
      const tiempo = devbin1.cronometer.export()[1].fromStart;
      variosTests.push(tiempo);
      // console.log(tiempo);
      devbin1.cronometer.reset();
    }
    const mediaAritmetica = variosTests.reduce((a, b) => a + b, 0) / variosTests.length;
    console.log(`Tomó ${(mediaAritmetica * variosTests.length/1000).toFixed(3)} sec un total de ${variosTests.length} pruebas una media de ${mediaAritmetica} milisec ${extraMsg}`);
    return mediaAritmetica;
  };

  
  Test_de_tiempo_con_y_sin_cacheo: {
    for(let index=0; index<REPETICIONES; index++) {
      let con = 0;
      let sin = 0;
      sin = await speedTest1(["--uncacheInjections"], "SIN CACHÉ");
      con = await speedTest1([], "CON CACHÉ");
      console.log(con.toFixed(4), sin.toFixed(4));
      assert(con < sin, `Este assert es probabilista pero con ${NIVELES} niveles de directorios, la caché debería sacarle una diferencia importante al uncache (repetición ${index+1} de ${REPETICIONES.length})`);
    }
  }

  await fs.promises.rm(`${__dirname}/../../assets/unit/203`, { recursive: true });

  compilerV6._logger.log("Test 203 ok");

};