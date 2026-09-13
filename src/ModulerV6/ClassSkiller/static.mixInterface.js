/**
 * @name ModulerV6.ClassSkiller.static.mixInterface
 * @type 
 * @description 
 */
static mixInterface(baseInterface, addedInterface, options = {}) {
  this.assert(typeof baseInterface === "object", `Parameter «baseInterface» must be object but «${typeof baseInterface}» was found instead on «ClassSkiller.mixInterface»`);
  this.assert(typeof addedInterface === "object", `Parameter «addedInterface» must be object but «${typeof addedInterface}» was found instead on «ClassSkiller.mixInterface»`);
  this.assert(typeof options === "object", `Parameter «options» must be object but «${typeof options}» was found instead on «ClassSkiller.mixInterface»`);
  this.isInterface(baseInterface, ` using «ClassSkiller.mixInterface» on parameter «baseInterface»`);
  this.isInterface(addedInterface, ` using «ClassSkiller.mixInterface» on parameter «addedInterface»`);
  const { overridables = [], errorClue = false } = options;
  const interfaceables = ["static", "prototype"];
  for (let indexInterfaceable = 0; indexInterfaceable < interfaceables.length; indexInterfaceable++) {
    const interfaceableProperty = interfaceables[indexInterfaceable];
    const origin = baseInterface[interfaceableProperty] || {};
    const mixable = addedInterface[interfaceableProperty] || {};
    this.mixTraits(origin, mixable, { overridables });
  }
  return baseInterface;
}