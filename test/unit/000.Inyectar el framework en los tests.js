module.exports = async function({ assert, utils, injection }) {
  injection.ModulerV6 = require(`${__dirname}/../../dist/v6.dist.js`);
  injection.modulerV6 = ModulerV6.create(`${__dirname}/../..`);
};