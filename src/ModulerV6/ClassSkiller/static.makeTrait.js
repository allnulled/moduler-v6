/**
 * @name ModulerV6.ClassSkiller.static.makeTrait
 * @type 
 * @description 
 */
static makeTrait(subtraits = [], options = {}) {
  const base = options?.base || {};
  // @CAUTION: Sutilmente, hacemos garrafaladas.
  // Este bucle es más caro de lo que debería.
  // Pero se mantiene para no complicar ni suprimir la «chained compatibility validation»
  for(let index=0; index<subtraits.length; index++) {
    const subtrait = subtraits[index];
    this.mixTraits(base, subtrait, {
      errorClue: " using «ClassSkiller.makeTrait»",
    });
  }
  return base;
}