module.exports = async function({ assert, utils, injection }) {
  injection.CompilerV6 = require(`${__dirname}/../../dist/v6.dist.js`);
  injection.compilerV6 = CompilerV6.create(`${__dirname}/../..`);
  const settingsProfile = "clean";
  const profiles = {
    debugging: () => {
      // Restart logger
      injection.compilerV6._initializeLogger(`${__dirname}/logs/`);
      // Logger by console off
      injection.compilerV6._logger.current.setOption("console", true);
      // Logger resets file
      injection.compilerV6._logger.resetFile("Test started");
      // Tracer off
      injection.compilerV6._tracer.activate(1);
      // Logger by tracing
      injection.compilerV6._tracer.isLogging = true;
    },
    clean: () => {
      // Restart logger
      injection.compilerV6._initializeLogger(`${__dirname}/logs/`);
      // Logger by console off
      injection.compilerV6._logger.current.setOption("console", false);
      // Logger resets file
      injection.compilerV6._logger.resetFile("Test started");
      // Tracer off
      injection.compilerV6._tracer.activate(0);
      // Logger by tracing
      injection.compilerV6._tracer.isLogging = false;
    }
  }
  Configuraciones_iniciales: {
    profiles[settingsProfile]();
  }
};