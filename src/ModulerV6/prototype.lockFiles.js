/**
 * @name ModulerV6.prototype.lockFiles
 * @type 
 * @description 
 */
lockFiles(list) {
  return {
    until: function(promise) {
      return promise.then(output => {
        // @AQUI hay que resolver los módulos con el crédito de lockFiles
        console.log(`[*] Unlocked files: ${list.join(", ")}`, output);
        return output;
      });
    }
  }
}