/**
 * @name ModulerV6.ClassSkiller.static.makeClass
 * @type 
 * @description 
 */
static makeClass(allInterfaces, base = class {}) {
  return this.addInterfaces(base, allInterfaces, {
    errorClue: " using «ClassSkiller.makeClass»",
  });
}