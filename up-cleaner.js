const fs = require("fs");
const path = require("path");

const utils = {
  vaciarDirectorio: async function (dir) {
    await fs.promises.rm(dir, {
      recursive: true,
      force: true,
    });
    await fs.promises.mkdir(dir, {
      recursive: true,
    });
  },
  eliminarFichero: function(file) {
    return fs.promises.unlink(file);
  },
  crearFichero: function(file, contents) {
    return fs.promises.writeFile(file, contents, "utf8");
  },
  eliminarDirectorio: function(dir) {
    return fs.promises.rm(dir, {
      recursive: true,
      force: true,
    });
  }
}

module.exports = (async function upCleaner() {
  await utils.vaciarDirectorio(`${__dirname}/test/assets/unit/202`);
  await utils.vaciarDirectorio(`${__dirname}/test/assets/unit/204`);
  await utils.vaciarDirectorio(`${__dirname}/src-tmp`);
  await utils.crearFichero(`${__dirname}/src-tmp/not-empty.txt`, "no esta vacio el dir");
})();