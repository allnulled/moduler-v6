/**
 * @name DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf
 * @type 
 * @description 
 */
getDistribuibleFilenamesOf(fileBrute, event) {
  let file, filename, fileExtension;
  file = require("path").basename(fileBrute);
  BLOCKER_2_PARA_NUEVAS_EXTENSIONES: {
    if (file.endsWith(".entry.js")) {
      filename = file.substr(0, file.length - ".entry.js".length);
      fileExtension = "js";
    } else if (file.endsWith(".entry.css")) {
      filename = file.substr(0, file.length - ".entry.css".length);
      fileExtension = "css";
    } else if (file.endsWith(".entry.md")) {
      filename = file.substr(0, file.length - ".entry.md".length);
      fileExtension = "md";
    } else if (file.endsWith(".entry.html")) {
      filename = file.substr(0, file.length - ".entry.html".length);
      fileExtension = "html";
    } else if (file.endsWith(".entry.pegjs")) {
      filename = file.substr(0, file.length - ".entry.pegjs".length);
      fileExtension = "pegjs";
    } else {
      throw new Error(`Parameter «file» must end with «.entry.js|.entry.css|.entry.md|.entry.html|.entry.pegjs» but it is «${file}» on «DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf»`);
    }
  }
  const data = {
    file: fileBrute,
    rootdir: this.devbin.compiler.rootdirOf(this.devbin.compiler.normalizationOf(fileBrute)),
    rootdirDirectory: require("path").dirname(this.devbin.compiler.rootdirOf(fileBrute)),
    basename: file,
    extension: fileExtension,
    test: filename + ".test.js",
  };
  if(fileExtension === "js") {    
    Object.assign(data, {
      js: filename + ".dist.js",
      css: filename + ".dist.css",
      md: filename + ".md",
    });
  } else if(fileExtension === "css") {    
    Object.assign(data, {
      css: filename + ".dist.css",
      md: filename + ".md",
    });
  } else if(fileExtension === "md") {    
    Object.assign(data, {
      md: filename + ".dist.md",
    });
  } else if(fileExtension === "html") {    
    Object.assign(data, {
      html: filename + ".dist.html",
      md: filename + ".md",
    });
  } else if(fileExtension === "pegjs") {    
    Object.assign(data, {
      pegjs: filename + ".dist.pegjs",
      md: filename + ".md",
    });
  }
  return data;
}