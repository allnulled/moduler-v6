/**
 * @name DevBinaryV6.prototype.unmuteTouchListenerOf
 * @type 
 * @description 
 */
async unmuteTouchListenerOf(filepattern) {
  const unlistenedFile = this.devbin.moduler.normalizationOf("@/dev/unlistened.json");
  try {
    let unlistenedList = await this.devbin.utils.readJsonOrReturn(unlistenedFile, []);
    const pos = unlistenedList.indexOf(filepattern);
    if(pos !== -1) {
      unlistenedList.splice(pos, 1);
    }
    return await require("fs").promises.writeFile(unlistenedFile, JSON.stringify(unlistenedList, null, 2), "utf8");
  } catch (error) {
    //if(error.code === "ENOENT") return -1;
    console.log(`[!] Could not unmute filepattern «${filepattern}» due to following error:`, error);
  }
}