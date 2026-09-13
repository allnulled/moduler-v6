/**
 * @name ModulerV6.ClassSkiller.static.isInterface
 * @type 
 * @description 
 */
static isInterface(target, errorClue) {
  this.assert(typeof target === "object", `Target must be object but «${typeof target}» was found instead${errorClue || ""}`);
  const keys = Object.keys(target);
  this.assert(keys.length <= 4, `Target cannot have more than 4 properties but «${keys.length}» keys were found instead${errorClue || ""}`);
  const validKeys = ["static", "prototype", "signatures"];
  const invalidKeys = keys.filter(key => !validKeys.includes(key));
  this.assert(invalidKeys.length === 0, `Target can only have keys «${validKeys.join(",")}» but «${invalidKeys.join(",")}» ${invalidKeys.length === 1 ? "is" : "are"} not among them${errorClue || ""}`);
}