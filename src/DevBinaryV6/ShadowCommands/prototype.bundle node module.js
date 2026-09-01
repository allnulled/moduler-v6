/**
 * @name DevBinaryV6.ShadowCommands.prototype["bundle node module"]
 * @type 
 * @description 
 */
async "bundle node module"(args, devbin) {

  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Specifies the name of the node_module to be bundled"
    },
    output: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-o"],
      description: "Specifies the name of the node_module to be bundled"
    },
    asWww: {
      onFormat: devbin.constructor.Formatters.asBoolean,
      default: false,
      alias: ["-aw"],
      description: "Builds entry version for browser: @/src/www/external/<lib>/<lib>.entry.js"
    },
    asSrc: {
      onFormat: devbin.constructor.Formatters.asBoolean,
      default: false,
      alias: ["-as"],
      description: "Builds entry version for node: @/src/external/<lib>/<lib>.entry.js"
    },
  }, args);

  this.assert(typeof parameters.from === "string", `Parameter «--from» is required as string on «DevBinaryV6.ShadowCommands.prototype['bundle node module']»`);

  Validate_parameters: {
    const { asWww, asSrc } = parameters;
    this.assert(asWww || asSrc, `Command «devbin bundle node modules» requires at least 1 option from «--asSrc,--asWww» but none of them was found`);
  }

  const fs = require("fs");
  const esbuild = require("esbuild");
  const info = { name: parameters.from, files: {} };

  info.files.package = this.devbin.moduler.normalizationOf(`@/node_modules/${info.name}/package.json`);
  info.files.main = this.devbin.moduler.normalizationOf(`@/node_modules/${info.name}/${require(info.files.package).main}`);

  let bundle, source, outputs;

  Bundle_entry: {
    this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 bundles node module «${info.name}» from: ${this.devbin.moduler.rootdirOf(info.files.main)}`);
    bundle = await esbuild.build({
      entryPoints: [info.files.main],
      bundle: true,
      platform: "browser",
      format: "iife",
      write: false,
    });
    this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 bundled node module «${info.name}» successfully`);
  }

  Get_source_and_init_output: {
    source = bundle.outputFiles[0].text;
    outputs = [];
  }

  Collect_outputs: {
    if (parameters.asWww) outputs.push(`@/src/www/external/${info.name}/${info.name}.entry.js`);
    if (parameters.asSrc) outputs.push(`@/src/external/${info.name}/${info.name}.entry.js`);
    if (parameters.asDist) {
      if (parameters.asWww) outputs.push(`@/dist/www/external/${info.name}/${info.name}.dist.js`);
      if (parameters.asSrc) outputs.push(`@/dist/external/${info.name}/${info.name}.dist.js`);
    }
    if (parameters.output) outputs.push(parameters.output);
  }

  Write_outputs: {
    for (let index = 0; index < outputs.length; index++) {
      const outputBrute = outputs[index];
      const output = this.devbin.moduler.normalizationOf(outputBrute);
      this.devbin.console.setProfile("blackBright").print(`[*] DevBinaryV6 exports node module «${info.name}» to: ${this.devbin.moduler.rootdirOf(output)}`);
      await this.devbin.utils.ensureDirectoryOf(output);
      await fs.promises.writeFile(output, source, "utf8");
    }
  }

}