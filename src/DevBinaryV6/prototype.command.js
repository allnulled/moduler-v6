/**
 * @name DevBinaryV6.prototype.command
 * @type 
 * @description 
 */
async command(args = []) {
  let commandParameters, commandSubpath, commandCallback, commandType, commandId, commandName;
  Extract_command_parameters: {
    if (Array.isArray(args)) {
      commandParameters = this.utils.parseCliArgs(args);
      break Extract_command_parameters;
    } else if (typeof args === "object") {
      commandParameters = args;
      break Extract_command_parameters;
    }
    throw new Error(`Parameter «args» must be array or object but «${typeof args}» was found instead on «DevBinary.prototype.command»`);
  }
  Extract_command_id: {
    commandId = commandParameters._.join("/");
    commandName = commandParameters._.join(" ");
  }
  Define_path_from_command: {
    commandSubpath = this.compiler.normalizationOf(`@/dev/bin/${commandId}/command.js`);
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
        if (commandName in this.shadowCommands) {
          commandCallback = this.shadowCommands[commandName];
          break Load_command_callback_from_file_or_shadowCommands;
        }
        const errorMessage = `Error of «devbin command not found» for parameters «${commandId}»`;
        throw new Error(errorMessage);
      }
    }
  }
  Execute_command_callback: {
    try {
      console.log(`[*] DevBinaryV6 executing command: ${commandName}`);
      return await commandCallback.call(this.shadowCommands, commandParameters, this, commandType, commandSubpath);
    } catch (error) {
      console.error(`[!] The «devbin ${commandName}» command threw an error:`, error);
      throw error;
    }
  }
}