/**
 * @name DevBinaryV6.ShadowCommands.prototype.touch
 * @type 
 * @description 
 */
touch(args) {
  const parameters = this.devbin.utils.formatCliArgs({
    file: {
      onFormat: this.devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Target file. Must be js, css or md."
    }
  }, args);
  this.assert(typeof parameters.file === "string", `Parameter «--file» is required as string on «DevBinaryV6.ShadowCommands.prototype.touch»`);
  return this.devbin.utils.touchFile(parameters.file);
}