/**
 * @name DevBinaryV6.ShadowCommands.prototype.filecom
 * @type 
 * @description 
 */
async filecom(args, devbin) {

  const parameters = devbin.utils.formatCliArgs({
    command: {
      onFormat: devbin.constructor.Formatters.asArray,
      default: false,
      alias: ["-c"],
      description: "One command to be executed. Accepts multiple strings as path parts, not white spaces. Matches the path between: @/dev/filecom/ and /command.js"
    },
    in: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-i"],
      description: "One file of the input"
    },
    out: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-o"],
      description: "One file of the out. Defaults to same name of --in but on ./out/ directory and typically as JSON."
    },
  }, args);

  this.assert(Array.isArray(parameters.command), `Parameter «--command» is required as array on «DevBinaryV6.ShadowCommands.prototype['filecom']»`);
  this.assert(typeof parameters.in === "string", `Parameter «--in» is required as string on «DevBinaryV6.ShadowCommands.prototype['filecom']»`);
  this.assert(typeof parameters.out === "string", `Parameter «--out» is required as string on «DevBinaryV6.ShadowCommands.prototype['filecom']»`);
  
  const fileCommand = this.devbin.moduler.normalizationOf(`@/dev/filecom/${parameters.command.join("/")}/command.js`);
  const rootdirCommand = this.devbin.moduler.rootdirOf(fileCommand);

  const commandTitle = this.devbin.compiler.constructor.ansi.colors.style("yellowBright").text(`> Running: devbin filecom -c ${JSON.stringify(parameters.command.join("/"))}`);
  let output = "";
  output += `   ${commandTitle}`;
  output += `\n   - filecom:  ${this.devbin.moduler.rootdirOf(fileCommand)}`;
  output += `\n   - in:       ${this.devbin.moduler.rootdirOf(parameters.in)}`;
  output += `\n   - out:      ${this.devbin.moduler.rootdirOf(parameters.out)}`;
  console.log(devbin.compiler.constructor.ansi.colors.box(output));

  return await devbin.moduler.import([fileCommand], function([command]) {
    return command({ parameters, devbin });
  });

}