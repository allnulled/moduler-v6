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
    },
    trace: {
      onFormat: this.devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-t"],
      description: "Message to use as traceable property."
    },
    uncacheInjections: {
      onFormat: this.devbin.constructor.Formatters.asBoolean,
      default: false,
      alias: ["-ui"],
      description: "To not use cache for files type «.entry.js». Defaults to false, so, it is used by default."
    }
  }, args);
  this.assert(typeof parameters.file === "string", `Parameter «--file» is required as string on «DevBinaryV6.ShadowCommands.prototype.touch»`);
  return this.devbin.utils.touchFile(parameters.file, {
    uncacheInjections: parameters.uncacheInjections,
  });
}