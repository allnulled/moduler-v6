module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const fs = require("fs");
  const path = require("path");
  const assert = compilerV6.createAssertFunction() || assertLoudly || compilerV6.createAssertFunction();

  await fs.promises.rm(`${__dirname}/../assets/unit/202`, { recursive: true });
  await fs.promises.mkdir(`${__dirname}/../assets/unit/202`);
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/package.json`), "No package.json should be here now");
  await devBinaryV6.command(["new", "project", "--from", `${__dirname}/../assets/unit/202`]);
  assert(fs.existsSync(`${__dirname}/../assets/unit/202/package.json`), "Command «devbin new project» should have created a package.json file here now");
  const subdev = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/202`);
  const subdevBasedir = require("path").resolve(`${__dirname}/../assets/unit/202`);
  assert(subdev.moduler.basedir === subdevBasedir, "DevBinaryV6 is not cloning itself correctly through «DevBinaryV6.prototype.cloneForFile»");
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/main.entry.js`, '$compiler.inject.source("./part-1.js")\n$compiler.inject.source("./part-2.js")');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/part-1.js`, '$compiler.inject.source("./parts/part-1.entry.js")');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/part-2.js`, '$compiler.inject.source("./parts/part-2.entry.js")');
  await fs.promises.mkdir(`${__dirname}/../assets/unit/202/src/parts`);
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/part-1.entry.js`, '$compiler.inject.source("./m1.js")');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/part-2.entry.js`, '$compiler.inject.source("./m2.js")');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/m1.js`, '"Part 1";');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/m2.js`, '"Part 2";');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/e.onTouch.js`, 'module.exports = () => require("fs").writeFileSync(`${__dirname}/ontouch-fired.txt`, "yes", "utf8");');
  await fs.promises.writeFile(`${__dirname}/../assets/unit/202/src/e.onDistribute.js`, 'module.exports = ({file}) => require("fs").appendFileSync(`${__dirname}/ondistribute-fired.txt`, file + "\\n", "utf8");');
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/dist/src/main.dist.js`), "File should not exist yet (054348-1)");
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/test/unit/src/main.test.js`), "File should not exist yet (054348-2)");
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/src/parts/part-1.dist.js`), "File should not exist yet (054348-3)");
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/src/parts/part-2.dist.js`), "File should not exist yet (054348-4)");
  assert(!fs.existsSync(`${__dirname}/../assets/unit/202/src/ontouch-fired.txt`), "File should not exist yet (054348-5)");
  
  // @chatgpt: estoy aquí
  console.log(202, subdev.moduler.basedir); // Aquí me lo pinta bien: /home/carlos/Escritorio/Programas/moduler-v6/test/assets/unit/202
  console.log(202, subdev.moduler.rootdir); // Y aquí también: 
  let event1, event2;
  try {
    //event1 = await subdev.command(["touch", "--file", `./src/main.entry.js`]);
    event1 = await subdev.command(["touch", "--file", `./src/parts/part-1.entry.js`]);
    event2 = await subdev.command(["touch", "--file", `./src/parts/part-2.entry.js`]);
  } catch (error) {
    console.log(subdev.moduler.normalizationOf("./src/parts/part-1.entry.js")); // Incluso aquí lo está pintando bien, pero el command no lo resuelve conforme el nuevo basedir
    console.log(error);
    // subdev.compiler._die("OKKK");
  }

  Test_de_que_se_compila_y_crea_el_test_de_un_entry_superior: {
    assert(fs.existsSync(`${__dirname}/../assets/unit/202/dist/src/main.dist.js`), "File should exist already (832195-1)");
    assert(fs.existsSync(`${__dirname}/../assets/unit/202/test/unit/src/main.test.js`), "File should exist already (832195-2)");
  }
  Test_de_que_el_onTouch_es_llamado: {
    assert(fs.existsSync(`${__dirname}/../assets/unit/202/src/ontouch-fired.txt`), "File should exist already (4561238-1)");
  }
  Test_de_que_el_onDistribute_es_llamado: {
    assert(fs.existsSync(`${__dirname}/../assets/unit/202/src/ondistribute-fired.txt`), "File should exist already (574891-1)");
  }
  Test_de_que_se_genera_el_fichero_dist_en_directorio_src: {
    // @FALSE: no tiene que generarse un dist en el src
    // La razón es que la estructura del src solo sirve para los dist y otros assets
    // Los src puros no deberían tener relevancia en el dist, esa es la gracia del dist.
    break Test_de_que_se_genera_el_fichero_dist_en_directorio_src;
    // assert(fs.existsSync(`${__dirname}/../assets/unit/202/src/main.dist.js`), "File should exist already (832195-3)");
    // assert(fs.existsSync(`${__dirname}/../assets/unit/202/src/parts/part-1.dist.js`), "File should exist already (832195-4)");
    // assert(fs.existsSync(`${__dirname}/../assets/unit/202/src/parts/part-2.dist.js`), "File should exist already (832195-5)");
  }
  Changing_basedir: {
    const { rootdir: currentRootdir, basedir: currentBasedir } = devBinaryV6.compiler;
    try {
      devBinaryV6.compiler.setRootdir(`${__dirname}/../assets/unit/202`);
      devBinaryV6.compiler.setBasedir(`${__dirname}/../assets/unit/202`);
      Test_conflictivo_del_devbin_loop: {
        break Test_conflictivo_del_devbin_loop;
        const output = await devBinaryV6.command(["loop", "--port", "5006"]);
        await Promise.all([
          output.server.server.close(),
          output.server.watcher.close(),
        ]);
      }
    } finally {
      devBinaryV6.compiler.setRootdir(currentBasedir);
      devBinaryV6.compiler.setBasedir(currentRootdir);
    }
  }

  compilerV6._logger.log("Test 202 ok");
};