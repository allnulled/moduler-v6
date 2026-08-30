/**
 * @name CompilerV6.prototype._extendToken
 * @type 
 * @description 
 */
_extendToken(token, fields = [], submoduler = this) {
  this._trace("_extendToken", arguments);
  return Object.assign(token, !fields.includes("referenceOf") ? {} : {
    referenceOf: (() => {
      const entry = this._hydrateParameters(token.inner)[0];
      const fullpath = submoduler.normalizationOf(entry);
      // const fullpath = submoduler.fullpathOf(entry);
      const rootpath = submoduler.rootdirOf(fullpath);
      return { type: "file", entry, fullpath, rootpath };
    })(),
  });
}