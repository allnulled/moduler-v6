/**
 * @name DevBinaryV6.ShadowCommands.prototype.new project
 * @type 
 * @description 
 */
"new project"(args, devbin) {
  
  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Empty directory from which to start the new project"
    }
  }, args);
  
  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['new project']»`);

  return devbin.utils.ensureCoreFrom(parameters.from, {
    ignoreErrors: 0,
    allowDirtyDirectory: 0,
  });

}