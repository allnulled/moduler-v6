/**
 * @name ModulerV6.prototype.reserveFile
 * @type 
 * @description 
 */
reserveFile(file) {
  const filepath = this.normalizationOf(file);
  const rootpath = this.rootdirOf(filepath);
  if(filepath in this.modules) {
    throw new Error(`Cannot reserve file module because it is already solved on file «${rootpath}» on method «ModulerV6.prototype.reserveFile»`);
  }
  const resolvable = this.constructor.createResolvable();
  Export_promise_of_reserve_as_module: {
    this.modules[filepath] = resolvable.promise;
    this.reserves[filepath] = resolvable;
  }
  const _module = { exports: {} };
  return {
    $moduler: this.cloneForFile(filepath),
    module: _module,
    exports: _module.exports,
    file: filepath,
  };
}