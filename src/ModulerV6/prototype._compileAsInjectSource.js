/**
 * @name ModulerV6.prototype._compileAsInjectSource
 * @type 
 * @description 
 */
async _compileAsInjectSource(compilationFile, compilationProcess, { token, indexToken }) {
  this._traceIn("_compileAsInjectSource", arguments);
  const { tokenization, source, resource, isRoot, } = compilationFile;
  const parameters = this._hydrateParameters(token.inner);
  this._assert(Array.isArray(parameters), `Parameters of injection must be an array in «${token.inner}» on «ModulerV6.prototype._compileAsInjectSource»`);
  this._assert(typeof parameters[0] === "string", `First parameter of injection must be string but «${typeof parameters[0]}» was found instead on «ModulerV6.prototype._compileAsInjectSource»`);
  const subpath = this.fullpathOf(parameters[0]);
  const compilation = await this._compileRecursively({ resource: subpath, isRoot: false, }, compilationProcess);
  compilationFile.compilation.js = this._replaceTextRange(compilationFile.compilation.js, token.location[0], token.location[1], compilation.js);
  this._traceOut("_compileAsInjectSource", arguments);
}