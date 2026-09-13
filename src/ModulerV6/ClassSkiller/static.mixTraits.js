/**
 * @name ModulerV6.ClassSkiller.static.mixTraits
 * @type 
 * @description 
 */
static mixTraits(origin, mixable, options = {}) {
  this.assert(typeof options === "object", `Parameter «options» must be object but «${typeof options}» was found instead on «ClassSkiller.mixTraits»`);
  const { overridables = [], errorClue } = options;
  this.assert(typeof origin === "object", `Parameter «origin» must be object but «${typeof origin}» was found instead ${errorClue||""} on «ClassSkiller.mixTraits»`);
  this.assert(origin !== null, `Parameter «origin» cannot be null but «${typeof origin}» was found instead${errorClue||""} on «ClassSkiller.mixTraits»`);
  this.assert(!Array.isArray(origin), `Parameter «origin» cannot be array but «${typeof origin}» was found instead${errorClue||""} on «ClassSkiller.mixTraits»`);
  this.assert(typeof mixable === "object", `Parameter «mixable» must be object but «${typeof mixable}» was found instead${errorClue||""} on «ClassSkiller.mixTraits»`);
  this.assert(mixable !== null, `Parameter «mixable» cannot be null but «${typeof mixable}» was found instead${errorClue||""} on «ClassSkiller.mixTraits»`);
  this.assert(!Array.isArray(mixable), `Parameter «mixable» cannot be array but «${typeof mixable}» was found instead${errorClue||""} on «ClassSkiller.mixTraits»`);
  const originDescriptors = Object.getOwnPropertyDescriptors(origin);
  const mixableDescriptors = Object.getOwnPropertyDescriptors(mixable);
  const originKeys = Object.keys(originDescriptors);
  const mixableKeys = Object.keys(mixableDescriptors);
  const conflictiveNames = originKeys.filter(bkey => mixableKeys.includes(bkey) && !overridables.includes(bkey));
  if (conflictiveNames.length) throw new Error(`Cannot mix conflictive properties «${conflictiveNames.join(",")}»${errorClue || ""} on «ClassSkiller.mixTraits»`);
  Object.defineProperties(origin, mixableDescriptors);
}