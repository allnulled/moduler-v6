/**
 * @name DevBinaryV6.ShadowCommands.prototype["print directory"]
 * @type 
 * @description 
 */
async "print directory"(args, devbin) {

  const fs = require("fs");
  const path = require("path");

  const parameters = devbin.utils.formatCliArgs({
    patterns: {
      onFormat: devbin.constructor.Formatters.asArray,
      default: false,
      alias: ["-p"],
      description: "Glob expressions of files and directories to print"
    },
    output: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-o"],
      description: "File to output"
    },
  }, args);

  devbin.assert(Array.isArray(parameters.patterns), "Parameter «--patterns» must be array on «devbin print directory»");
  devbin.assert(parameters.patterns.length, "Parameter «--patterns» must provide 1 or more values on «devbin print directory»");

  const printers = {
    async format(file) {
      const rootfile = devbin.moduler.rootdirOf(file);
      const lstat = await fs.promises.lstat(file);
      if (lstat.isFile()) return printers.file(file, await fs.promises.readFile(file, "utf8"));
      else if (lstat.isDirectory()) return printers.directory(file, await fs.promises.readdir(file));
      throw new Error(`Could not find file or directory of «${rootfile}»`);
    },
    async file(file, source) {
      return `[#FILE=${devbin.moduler.rootdirOf(file)}]\n${source}\n`;
    },
    async directory(file, subfiles) {
      let output = `[#DIRECTORY=${devbin.moduler.rootdirOf(file)}]${!subfiles.length ? ' (empty)' : '\n - ' + subfiles.join("\n - ")}\n`;
      for (let index = 0; index < subfiles.length; index++) {
        const subfile = subfiles[index];
        output += await printers.format(`${(file)}/${subfile}`);
      }
      return output;
    }
  };

  const allMatches = await devbin.compiler.files.findByPattern(parameters.patterns);
  devbin.assert(allMatches.length, `No files matched for «--patterns» parameter: [${parameters.patterns.join(",")}]`);
  console.log(`[*] Found ${allMatches.length} matches to print:`);
  console.log(allMatches);
  allMatches.forEach(match => console.log(` [x] ${match}`));
  const lines = [];
  for (let index = 0; index < allMatches.length; index++) {
    const fileBrute = allMatches[index];
    const file = devbin.moduler.normalizationOf(fileBrute);
    const result = await printers.format(file);
    lines.push(result);
  }
  const report = lines.join("");
  if (parameters.output) {
    try {
      await devbin.files.writeFile(parameters.output, report);
      devbin.console.setProfile("blackBright").print("[*] DevBinaryV6 printed directory at: " + devbin.moduler.rootdirOf(parameters.output));
    } catch (error) {
      console.log(report);
      console.log(`[!] Could not write file to specified output: ${devbin.moduler.rootdirOf(parameters.output)}`);
      console.log(error);
    }
  } else {
    console.log(report);
  }
  return report;

}