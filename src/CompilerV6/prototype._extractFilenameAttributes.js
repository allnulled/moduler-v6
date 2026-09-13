/**
 * @name CompilerV6.prototype._extractFilenameAttributes
 * @type 
 * @description 
 */
_extractFilenameAttributes(filepath) {
  const filename = require("path").basename(filepath);
  const parts = filename.split(".").filter(part => part !== "js");
  let name = undefined;
  const attr = {};
  const hotwords = this.constructor.sensitiveFileAttributes;
  for(let index=0; index<parts.length; index++) {
    const part = parts[index];
    const isHotword = hotwords.includes(part);
    if(!isHotword) name = part;
    else {
      attr[part] = index+1;
      if(!name) name = part;
    }
  }
  return {name,attr,list:Object.keys(attr)};
}