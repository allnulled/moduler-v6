/**
 * @name DevBinaryV6.Utils.prototype.exportDevSettings
 * @type 
 * @description 
 */
async exportDevSettings(filepath) {
  try {
    const fs = require("fs");
    const settingsAsyncFactory = require(filepath);
    const settingsData = typeof settingsAsyncFactory === "function" ? await settingsAsyncFactory({ devbin: this.devbin }) : settingsAsyncFactory;
    const publicableSettings = this.constructor.removeNullPropertiesFromObject({
      env: settingsData.env || null,
      instrumentalize: settingsData.instrumentalize || null,
      traceExternalSources: settingsData.traceExternalSources || null,
      sectionsMap: settingsData.sectionsMap || null,
    });
    const publicableJson = this.devbin.compiler.fullpathOf("@/dist/www/dev/settings/publicable.json");
    await this.ensureDirectoryOf(publicableJson);
    await fs.promises.writeFile(publicableJson, JSON.stringify(publicableSettings, null, 2), "utf8");
  } catch (error) {
    console.log("[!] Error loading settings:", error);
  }
}