/**
 * @name ModulerV6.prototype.export
 * @type 
 * @description 
 */
export (...signature) {
  let filepath, dependencies, output;
  const parameters = this._formatExportParameters(signature);
  // @TODO: algoritmo del export
  const {
    id: _id = null,
    file: _file = null,
    dependencies: _dependencies = null,
    factory: _factory = null,
  } = parameters;
  this.assert(!(_id in this.modules), `Cannot export module with id «${_id}» because it already exists on «ModulerV6.prototype.export»`);
  Resolving_module: {
    const signatureCopy = [...signature];
    signatureCopy.splice(0,1);
    output = this.import(...signatureCopy);
  }
  return this.modules[_id] = output;
}