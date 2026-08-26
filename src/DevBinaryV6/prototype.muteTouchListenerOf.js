/**
 * @name DevBinaryV6.prototype.muteTouchListenerOf
 * @type 
 * @description 
 */
async muteTouchListenerOf(filepattern) {
  const unlistenedFile = this.moduler.normalizationOf("@/dev/unlistened.json");
  try {
    let unlistenedList = !await this.utils.existsFile(unlistenedFile) ? [] : JSON.parse(await require("fs").promises.readFile(unlistenedFile, "utf8"));
    if(!unlistenedList.includes(filepattern)) {
      unlistenedList.push(filepattern);
    }
    await require("fs").promises.writeFile(unlistenedFile, JSON.stringify(unlistenedList, null, 2), "utf8");
  } catch (error) {
    if(error.code === "ENOENT") return -1;
    console.log(`[!] Could not mute filepattern «${filepattern}» due to following error:`, error);
  }
}