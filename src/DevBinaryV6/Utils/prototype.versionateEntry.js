/**
 * @name DevBinaryV6.Utils.prototype.versionateEntry
 * @type 
 * @description 
 */
async versionateEntry(versions, { file: fileBrute, onVersionateFile }) {
  if(typeof versions === "undefined") return -1;
  if(typeof versions === "number") return -2;
  this.devbin.moduler.assert(typeof versions === "object", `Parameter «versions» must be object, number or undefined but «${typeof versions}» was found instead on file «${onVersionateFile}» on «DevBinaryV6.Utils.prototype.versionateEntry»`);
  const rootfile = this.devbin.moduler.rootdirOf(fileBrute);
  const rootfileDir = require("path").dirname(rootfile);
  if(!rootfile.startsWith("@/src/")) return -3;
  const file = fileBrute; // si hace falta, haz normalizationOf, pero si no, no.
  const filename = require("path").basename(file);
  if(!(filename in versions)) return -1;
  const currentVersion = versions[filename];
  const id = filename.replace(/\.entry\.js$/g, "");
  const subpath = rootfileDir.replace(/^\@\/src\//g, "")
  const outputFile = `@/dist/src/${subpath}/v/${id}.${currentVersion}.dist.js`;
  const inputFile = `@/dist/src/${subpath}/${id}.dist.js`;
  const outputDir = require("path").dirname(outputFile);
  console.log(outputDir);
  console.log(outputFile);
  console.log(inputFile);
  await this.devbin.files.ensureDirectory(outputDir);
  await this.devbin.files.copyFile(inputFile, outputFile);
}