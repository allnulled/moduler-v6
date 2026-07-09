module.exports = async function ({ assert: assertLoudly, utils, compilerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly || compilerV6.createAssertFunction();

  await require("fs").promises.rm(`${__dirname}/../assets/unit/202`, { recursive: true });
  await require("fs").promises.mkdir(`${__dirname}/../assets/unit/202`);
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/202/package.json`), "No package.json should be here now");
  await devBinaryV6.command(["new", "project", "--from", `${__dirname}/../assets/unit/202`]);
  assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/package.json`), "Command «devbin new project» should have created a package.json file here now");
  const subdev = devBinaryV6.cloneForFile(`${__dirname}/../assets/unit/202/package.json`);
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/main.entry.js`, '$compiler.inject.source("./part-1.js")\n$compiler.inject.source("./part-2.js")');
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/part-1.js`, '$compiler.inject.source("./parts/part-1.entry.js")');
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/part-2.js`, '$compiler.inject.source("./parts/part-2.entry.js")');
  await require("fs").promises.mkdir(`${__dirname}/../assets/unit/202/src/parts`);
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/part-1.entry.js`, '$compiler.inject.source("./m1.js")');
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/part-2.entry.js`, '$compiler.inject.source("./m2.js")');
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/m1.js`, '"Part 1";');
  await require("fs").promises.writeFile(`${__dirname}/../assets/unit/202/src/parts/m2.js`, '"Part 2";');
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/202/dist/src/main.dist.js`), "File should not exist yet (054348-1)");
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/202/test/unit/src/main.test.js`), "File should not exist yet (054348-2)");
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/202/src/parts/part-1.dist.js`), "File should not exist yet (054348-3)");
  assert(!require("fs").existsSync(`${__dirname}/../assets/unit/202/src/parts/part-2.dist.js`), "File should not exist yet (054348-4)");
  // Sin el superior, para que se vea que los internos también lo triggean:
  // const event0 = await subdev.command(["touch", "--file", `./src/main.entry.js`]);
  const event1 = await subdev.command(["touch", "--file", `./src/parts/part-1.entry.js`]);
  const event2 = await subdev.command(["touch", "--file", `./src/parts/part-2.entry.js`]);
  Test_de_que_se_compila_y_crea_el_test_de_un_entry_superior: {
    assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/dist/src/main.dist.js`), "File should exist already (832195-1)");
    assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/test/unit/src/main.test.js`), "File should exist already (832195-2)");
  }
  Test_de_que_se_genera_el_fichero_dist_en_directorio_src: {
    // @FALSE: no tiene que generarse un dist en el src
    // La razón es que la estructura del src solo sirve para los dist y otros assets
    // Los src puros no deberían tener relevancia en el dist, esa es la gracia del dist.
    break Test_de_que_se_genera_el_fichero_dist_en_directorio_src;
    // assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/src/main.dist.js`), "File should exist already (832195-3)");
    // assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/src/parts/part-1.dist.js`), "File should exist already (832195-4)");
    // assert(require("fs").existsSync(`${__dirname}/../assets/unit/202/src/parts/part-2.dist.js`), "File should exist already (832195-5)");
  }
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

  compilerV6._logger.log("Test 202 ok");
};