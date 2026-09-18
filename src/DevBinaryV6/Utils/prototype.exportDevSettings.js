/**
 * @name DevBinaryV6.Utils.prototype.exportDevSettings
 * @type 
 * @description 
 */
async exportDevSettings(filepath) {
  try {
    let settingsData = undefined;
    let publicableSettings = undefined;
    let publicFields = undefined;
    const fs = require("fs");
    Collect_public_settings: {
      const settingsAsyncFactory = require(filepath);
      settingsData = typeof settingsAsyncFactory === "function" ? await settingsAsyncFactory({ devbin: this.devbin }) : settingsAsyncFactory;
      publicableSettings = {};
      publicFields = [
        "env",
        "instrumentalize",
        "traceExternalSources",
        "sectionsMap",
        "test",
        "browser",
      ].concat(settingsData.publicableFields || []);
    }
    List_test_directories_and_attach_to_browser_settings: {
      if(settingsData?.browser?.test?.directories) {
        const targetDirs = Object.keys(settingsData.browser.test.directories);
        for(let index=0; index<targetDirs.length; index++) {
          const dir = targetDirs[index];
          const dirOptions = settingsData.browser.test.directories[dir];
          const dirPath = this.devbin.moduler.normalizationOf(dir);
          const files = await fs.promises.readdir(dirPath);
          dirOptions.files = files.map(innerDir => this.devbin.moduler.rootdirOf(this.devbin.moduler._joinPaths([dirPath, innerDir, dirOptions.file || "test.dist.js"])));
        }
      }
    }
    Export_public_settings: {
      for (let indexProp = 0; indexProp < publicFields.length; indexProp++) {
        const publicableProp = publicFields[indexProp];
        publicableSettings[publicableProp] = settingsData[publicableProp] ?? null;
      }
      publicableSettings = this.constructor.removeNullPropertiesFromObject(publicableSettings);
    }
    //////////////////////////////
    const publicableJson = this.devbin.compiler.normalizationOf("@/dist/www/dev/settings/publicable.json");
    await this.ensureDirectoryOf(publicableJson);
    await fs.promises.writeFile(publicableJson, JSON.stringify(publicableSettings, null, 2), "utf8");
    this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 exported «publicableFields» of «@/dev/settings.js» to «@/dist/www/dev/settings/publicable.json»`);
  } catch (error) {
    console.log("[!] Error loading settings:", error);
  }
}