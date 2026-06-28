/**
 * @name CompilerV6.prototype.compile
 * @type 
 * @description 
 */
async compile(resource, options = {}) {
  return this._compileRecursively({
    resource,
    isRoot: true,
  }, {
    ...options,
  });
}