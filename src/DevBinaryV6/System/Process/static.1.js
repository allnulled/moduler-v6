/**
 * @name DevBinaryV6.System.Process.static.1
 * @type 
 * @description 
 */
static {
  Global_initialization: {
    global.process.on("exit", () => {
      let out = undefined;
      (this.listeners["exit"] || []).forEach(listener => out = listener());
      return out;
    });
  }
}