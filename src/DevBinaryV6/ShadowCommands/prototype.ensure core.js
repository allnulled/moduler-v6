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
    }
  }, args);
  
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['ensure core']»`);

  return devbin.utils.ensureCoreFrom(parameters.from, {
    ignoreErrors: 1,
    allowDirtyDirectory: 1,
    dontOverride: 1,
  });

}