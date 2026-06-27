/**
 * @name ModulerV6.prototype._extendToken
 * @type 
 * @description 
 */
_extendToken(token, fields = []) {
  this._trace("_extendToken", arguments);
  return Object.assign(token, !fields.includes("referenceOf") ? {} : {
    referenceOf: (() => {
      const entry = this._hydrateParameters(token.inner)[0];
      const fullpath = this.fullpathOf(entry);
      const rootpath = this.rootpathOf(fullpath);
      return { type: "file", entry, fullpath, rootpath };
    })(),
  });
}