/**
 * @name DevBinaryV6.static.fromRootDirectoryOf
 * @type 
 * @description 
 */
static fromRootDirectoryOf(dir, file = "package.json") {
  return this.Utils.findFirstParentDirectoryContaining(dir, file).then(upperDir => new this(upperDir));
}