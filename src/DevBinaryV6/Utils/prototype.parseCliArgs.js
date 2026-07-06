/**
 * @name DevBinaryV6.Utils.prototype.parseCliArgs
 * @type 
 * @description 
 */
parseCliArgs(args) {
  this.assert(typeof args === "object", `Parameter «args» must be object on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  this.assert(Array.isArray(args), `Parameter «args» must be array on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  this.assert(args.length !== 0, `Parameter «args» must have at least 1 item on «DevBinaryV6.Utils.prototype.parseCliArgs»`);
  let params = { _: [] };
  let selected = "_"
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg.startsWith("-")) {
      selected = arg;
      params[selected] = params[selected] || [];
    } else {
      params[selected].push(arg);
    }
  }
  return params;
}