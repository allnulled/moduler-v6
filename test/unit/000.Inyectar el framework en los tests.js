module.exports = async function({ assert, utils, injection }) {
  injection.ModulerV6 = require(`${__dirname}/../../dist/v6.dist.js`);
  injection.modulerV6 = ModulerV6.create(`${__dirname}/../..`);
  Configuraciones_iniciales: {
    // Tracer off
    injection.modulerV6._tracer.turnOff();
    // Restart logger
    injection.modulerV6._initializeLogger(`${__dirname}/logs/`);
    // Logger by console off
    injection.modulerV6._logger.current.setOption("console", false);
    // Logger resets file
    injection.modulerV6._logger.resetFile("Test started");
  }
};