/**
 * @name DevBinaryV6.System.Process.static.on
 * @type 
 * @description 
 */
static on(event) {
  this.listeners[event] ??= [];
  return {
    add: (callback) => {
      if (typeof callback !== "function") throw new Error(`«Process.on(event:String).add» only accepts function but «${typeof callback}» was found instead`);
      this.listeners[event].push(callback);
      return {
        cancel: () => {
          const pos = this.listeners[event].indexOf(callback);
          if (pos === -1) return false;
          return this.listeners[event].splice(pos, 1);
        },
      };
    },
  };
}