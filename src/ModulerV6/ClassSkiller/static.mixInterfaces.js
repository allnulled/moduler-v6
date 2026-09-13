/**
 * @name ModulerV6.ClassSkiller.static.mixInterfaces
 * @type 
 * @description 
 */
static mixInterfaces(subinterfazes = [], options = {}) {
  const {
    overridables = [],
    errorClue = false,
    base: _base = false,
  } = options;
  const base = _base || { static: {}, prototype: {} };
  this.isInterface(base, `${errorClue || ""} using «ClassSkiller.mixInterfaces» on parameter «options.base»`);
  // @CAUTION: Sutilmente, hacemos garrafaladas.
  // Este bucle es más caro de lo que debería.
  // Pero se mantiene para no complicar ni suprimir la «chained compatibility validation»
  for (let index = 0; index < subinterfazes.length; index++) {
    const subinterfaze = subinterfazes[index];
    this.isInterface(subinterfaze, `${errorClue || ""} using «ClassSkiller.mixInterfaces» on parameter «subinterfazes» at index «${index}»`);
    this.mixInterface(base, subinterfaze, {
      overridables,
      errorClue: `${errorClue || ""} using «ClassSkiller.mixInterfaces» at index «${index}»`,
    });
  }
  return base;
}