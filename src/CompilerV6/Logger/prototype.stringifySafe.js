/**
 * @name CompilerV6.Logger.prototype.stringifySafe
 * @type 
 * @description 
 */
stringifySafe(value) {
  const seen = new WeakSet();
  return JSON.stringify(value, (key, val) => {
    if (typeof val === "bigint") {
      return `${val}n`;
    }
    if (typeof val === "function") {
      return `[Function ${val.name || "anonymous"}]`;
    }
    if (val instanceof Error) {
      return {
        name: val.name,
        message: val.message,
        stack: val.stack
      };
    }
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) {
        return "[Circular]";
      }
      seen.add(val);
    }
    return val;
  }, 0);
}