/**
 * @name ModulerV6.prototype._fetchCompilable
 * @type 
 * @description 
 */
_fetchCompilable(compilationFile, compilationProcess) {
  this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._fetchCompilable»");
  this._assert(typeof compilationFile.resource === "string", "Parameter «compilationFile.resource» must be string on «ModulerV6.prototype._fetchCompilable»");
  this._assert((/\.(js|css|md)$/g).test(compilationFile.resource), `Parameter «compilationFile.resource» must match with valid extension on «ModulerV6.prototype._fetchCompilable»`);
  compilationFile.extension = compilationFile.resource.match(/\.(js|css|md)$/g)[0].substr(1);
  return this._readPath(compilationFile.resource).then(source => {
    compilationFile.source = source;
    return compilationFile.compilation.js = source;
  });
}