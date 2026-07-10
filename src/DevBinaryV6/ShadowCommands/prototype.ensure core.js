/**
 * @name DevBinaryV6.ShadowCommands.prototype.ensure core
 * @type 
 * @description 
 */
async "ensure core"(args, devbin) {

  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Any directory from which to ensure the core os a devbin project"
    },
    reset: {
      onFormat: devbin.constructor.Formatters.asBoolean,
      default: false,
      alias: ["-r"],
      description: "Overwrites all core files if used"
    }
  }, args);
  
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['ensure core']»`);
  this.assert(typeof parameters.reset === "boolean", `Parameter «--reset» is required as boolean on «DevBinaryV6.ShadowCommands.prototype['ensure core']»`);

  return devbin.utils.ensureCoreFrom(parameters.from, {
    ignoreErrors: 1,
    allowDirtyDirectory: 1,
    dontOverride: !parameters.reset,
  });

}