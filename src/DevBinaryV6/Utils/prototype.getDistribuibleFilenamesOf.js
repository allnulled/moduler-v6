/**
 * @name DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf
 * @type 
 * @description 
 */
getDistribuibleFilenamesOf(fileBrute, event) {
  let file, filename, fileExtension;
  file = require("path").basename(fileBrute);
  if(file.endsWith(".entry.js")) {
    filename = file.substr(0, file.length - ".entry.js".length);
    fileExtension = "js";
  } else if(file.endsWith(".entry.css")) {
    filename = file.substr(0, file.length - ".entry.css".length);
    fileExtension = "css";
  } else if(file.endsWith(".entry.md")) {
    filename = file.substr(0, file.length - ".entry.md".length);
    fileExtension = "md";
  } else {
    throw new Error(`Parameter «file» must end with «.entry.js», «.entry.css» or «.entry.md» but it is «${file}» on «DevBinaryV6.Utils.prototype.getDistribuibleFilenamesOf»`);
  }
  return {
    file: fileBrute,
    rootdir: this.devbin.compiler.rootdirOf(fileBrute),
    rootdirDirectory: require("path").dirname(this.devbin.compiler.rootdirOf(fileBrute)),
    basename: file,
    extension: fileExtension,
    test: filename + ".test.js",
    js: filename + ".dist.js",
    css: filename + ".dist.css",
    md: filename + ".md",
  };
}