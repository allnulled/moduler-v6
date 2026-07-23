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
  this.assert(this.section instanceof ModulerV6.SectionsManager, `For some random reason, the section manager global instance is not available on «ModulerV6.prototype.export»`);
  this.assert(!this.section.has(_id), `Cannot export section by id «${_id}» because it already exists on «ModulerV6.prototype.export»`);
  Resolving_module: {
    const signatureCopy = [...signature];
    signatureCopy.splice(0,1);
    output = this.import(...signatureCopy);
  }
  if(output === null) {
    this.section.set(_id, output);
  } else if(["object"].includes(typeof output)) {
    this.section.expand(_id, output);
  } else {
    this.section.set(_id, output);
  }
  return output;
}