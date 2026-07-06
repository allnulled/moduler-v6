/**
 * @name DevBinaryV6.prototype.command
 * @type 
 * @description 
 */
async command(args = []) {
  let commandParameters, commandSubpath, commandCallback, commandType;
  Format_input: {
    if (Array.isArray(args)) {
      commandParameters = this.utils.parseCliArgs(args);
      break Format_input;
    } else if (typeof args === "object") {
      commandParameters = args;
      break Format_input;
    }
    throw new Error(`Parameter «args» must be array or object but «${typeof args}» was found instead on «DevBinary.prototype.command»`);
  }
  Define_path_from_command: {
    commandSubpath = this.compiler.normalizationOf(`./dev/command/${commandParameters._.join("/")}/command.js`);
  }
  Load_command_callback_from_file_or_shadowCommands: {
    let isReadable = undefined;
    First_file: {
      try {
        // Check if its readable:
        await require("fs").promises.readFile(commandSubpath, "utf8");
        isReadable = true;
      } catch (error) {
        isReadable = false;
      }
    }
    Second_hook: {
      if (isReadable) {
        commandType = "file";
        commandCallback = require(commandSubpath);
      } else {
        commandType = "hook";
        const possibleHookId = commandParameters._.join(" ");
        if (possibleHookId in this.shadowCommands) {
          commandCallback = this.shadowCommands[possibleHookId];
          break Load_command_callback_from_file_or_shadowCommands;
        }
        throw new Error(`Could not find any command «${commandParameters._.join("/")}/command.js» at «${commandSubpath}» or any hook «${commandParameters._.join(" ")}» on «DevBinaryV6.prototype.command»`);
      }
    }
  }
  Execute_command_callback: {
    return await commandCallback(commandParameters, this, commandType, commandSubpath);
  }
}