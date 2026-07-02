/**
 * @name CompilerV6.fromRootOf
 * @type 
 * @description 
 */
static async fromRootOf(file) {
  const root = await this.findRootOf(file);
  return new this(root);
}