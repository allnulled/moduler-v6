/**
 * @name DevBinaryV6.Utils.prototype.addTouchMutedirTo
 * @type 
 * @description 
 */
async addTouchMutedirTo(dir) {
  const mutedirDir = this.devbin.moduler.normalizationOf(dir);
  const mutedirFile = require("path").resolve(mutedirDir, ".mutedir");
  const wasMuted = await this.devbin.files.hasFile(mutedirFile);
  if(!wasMuted) {
    this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 mutes directory through .mutedir: ${mutedirDir}`);
    await this.devbin.files.writeFile(mutedirFile, `Directory captured by process: ${process.pid}`);
  } else {
    this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 ignores to mute directory through .mutedir: ${mutedirDir}`);
  }
  return {
    cancel: () => {
      if(wasMuted) {
        this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 ignores to unmute directory through .mutedir: ${mutedirDir}`);
        return false;
      }
      this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 unmutes directory through .mutedir: ${mutedirDir}`);
      // @ATENCIÓN: solución aparentemente "guarra" pero la conclusión con ChatGPT ha sido que probablemente la race condition
      // se esté dando porque el refrescador tarda demasiado en empezar el trigger de fichero modificado
      // y para cuando lo hace, el directorio ya ha sido liberado.
      // @PORESO esta función. Porque es la que libera el directorio.
      // @SI simplemente se demora, el dev tiene medio segundo, porque esto no bloquea, medio segundo para poder volver a guardar otra vez
      // Solo pierde medio segundo que no va a usar. Y va en paralelo y todo.
      // Pues.... feature conseguida, parece, de momento, demo ok.
      // @INFO: te lo digo porque con 200 todavía se cuela alguno, así que no te puedes fiar, el paso del chokidar es donde se hace el bottleneck.
      // @BUENDATOESE eh. Je. No, sí, no te escarrasis aquí, hay un bottleneck desde el S.O. o los bindings, de momento si funciona así, me intentaría conformar.
      setTimeout(() => {
        return this.devbin.files.deleteFile.try(mutedirFile);
      }, 500);
    }
  };
}