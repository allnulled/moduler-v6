/**
 * @name DevBinaryV6.static.Refrescador
 * @type 
 * @description 
 */
static Refrescador = (function() {
  // @REFRESCADOR: Primero intenta la ruta relativa inmediata, y si no, busca la del src/external/refrescador, y ahí sí, y si no, peta.
  try {
    return require(require("path").resolve(`${__dirname}/refrescador/refrescador.api.dist.js`));
  } catch (error) {
    return require(require("path").resolve(`${__dirname}/../../../src/external/refrescador/refrescador.api.dist.js`));
  }
})();