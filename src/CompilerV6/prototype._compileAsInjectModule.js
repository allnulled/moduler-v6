/**
 * @name CompilerV6.prototype._compileAsInjectModule
 * @type 
 * @description 
 */
_compileAsInjectModule(compilationFile, compilationProcess, { token, tokenIndex }) {
  const parameters = this._getDataForTokenCompilation({ token });
  const rootpath = this.moduler.rootdirOf(parameters[0]);
  return this._compileAsInjectSource(compilationFile, compilationProcess, { token, tokenIndex, }, {
    modifySource: (source) => {
      return this._wrapAsModuleInjection(source, rootpath);
    },
  });
}