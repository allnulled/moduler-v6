/**
 * @name CompilerV6.prototype._createDefaultInjectedFile
 * @type 
 * @description 
 */
_createDefaultInjectedFile(file, targetId) {
  return require("fs").promises.writeFile(file, `/**
 * @name ${targetId}
 * @type any
 * @description none
 */`, "utf8").catch(error => {
    console.log(`[!] Could not create injected path «${file}» on «ModulerV6.prototype._compileAsInjectSource»`);
  });
}