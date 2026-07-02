/**
 * @name CompilerV6.getStringSize
 * @type 
 * @description 
 */
static getStringSize(text) {
  let bytes = undefined;
  if (this.isBrowser) {
    bytes = new TextEncoder().encode(text).length;
  } else {
    bytes = Buffer.byteLength(text, "utf8");
  }
  if(bytes < (1024 * 1024)) {
    return `${(bytes / 1024).toFixed(2)}KB`;
  } else {
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  }
}