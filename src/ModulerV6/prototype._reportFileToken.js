/**
 * @name ModulerV6.prototype._reportFileToken
 * @type 
 * @description 
 */
_reportFileToken(compilationFile, targetBrute, token) {
  this._traceIn("_reportFileToken", arguments);
  const owner = this.rootpathOf(compilationFile.resource);
  const target = this.rootpathOf(targetBrute);
  if (!(owner in compilationFile.report.tree)) {
    compilationFile.report.tree[owner] = {};
  }
  const reportedToken = this._cloneStructureAsJson(token);
  delete reportedToken.location;
  this._extendToken(reportedToken, [
    "referenceOf"
  ]);
  compilationFile.report.tree[owner][token.location.join("-")] = reportedToken;
  this._traceOut("_reportFileToken", arguments);
}