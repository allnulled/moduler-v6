/**
 * @name DevBinaryV6.prototype.command
 * @type 
 * @description 
 */
async command(args = []) {
  let params;
  Format_input: {
    if (Array.isArray(args)) {
      params = { _: [] };
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
    } else if (typeof args === "object") {
      params = args;
    } else {
      throw new Error(`Parameter «args» must be array or object but «${typeof args}» was found instead on «DevBinary.prototype.command»`);
    }
  }
  const commandSubpath = this.compiler.normalizationOf(`./dev/command/${params._.join("/")}/command.js`);
  try {
    await require("fs").promises.readFile(commandSubpath, "utf8");
  } catch (error) {
    throw new Error(`Could not find any command «${params._.join("/")}» at «${commandSubpath}» on «DevBinaryV6.prototype.command»`);
  }
  const callback = require(commandSubpath);
  return await callback(params);
}