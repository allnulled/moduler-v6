/**
 * @name DevBinaryV6.prototype.unmuteTouchListenerOf
 * @type 
 * @description 
 */
async unmuteTouchListenerOf(filepattern) {
  const unlistenedFile = this.moduler.normalizationOf("@/dev/unlistened.json");
  try {
    let unlistenedList = !await this.utils.existsFile(unlistenedFile) ? [] : JSON.parse(await require("fs").promises.readFile(unlistenedFile, "utf8"));
    const pos = unlistenedList.indexOf(filepattern);
    if(pos !== -1) {
      unlistenedList.splice(pos, 1);
    }
    await require("fs").promises.writeFile(unlistenedFile, JSON.stringify(unlistenedList, null, 2), "utf8");
  } catch (error) {
    if(error.code === "ENOENT") return -1;
    console.log(`[!] Could not unmute filepattern «${filepattern}» due to following error:`, error);
  }
}