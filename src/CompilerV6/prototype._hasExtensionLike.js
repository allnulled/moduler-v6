/**
 * @name CompilerV6.prototype._hasExtensionLike
 * @type 
 * @description 
 */
_hasExtensionLike(file, extensions = []) {
  for(let index=0; index<extensions.length; index++) {
    const extensionString = extensions[index];
    if(file.endsWith(extensionString)) return true;
  }
  return false;
}