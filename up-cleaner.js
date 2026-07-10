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
  }
}

module.exports = (async function upCleaner() {
  await utils.vaciarDirectorio(`${__dirname}/test/assets/unit/202`);
  await utils.vaciarDirectorio(`${__dirname}/test/assets/unit/204`);
})();