/**
 * @name ModulerV6.prototype.releaseFile
 * @type 
 * @description 
 */
releaseFile(file, reserve, returnment) {
  const filepath = this.normalizationOf(file);
  const rootpath = this.rootdirOf(filepath);
  this.assert(filepath in this.reserves, `File «${filepath}» is called to be released by «ModulerV6.prototype.releaseFile» but it was not reserved before. Methods «reserveFile,releaseFile» are not human-usage oriented, in case of «${rootpath}». Stop playing with out-of-domain methods, please.`);
  this.assert(reserve.file === filepath, `File «${filepath}» is called to be released by «ModulerV6.prototype.releaseFile» but it does not match with reserved file «${reserve.file}». Stop playing with not human-usage oriented methods, I told you!`);
  if(typeof returnment !== "undefined") {
    reserve.module = returnment;
  }
  const state = this.reserves[filepath];
  state.resolve(reserve.module.exports);
  delete this.reserves[filepath];
  return state.promise;
}