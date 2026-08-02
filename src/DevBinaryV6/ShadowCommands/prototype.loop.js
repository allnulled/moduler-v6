/**
 * @name DevBinaryV6.ShadowCommands.prototype.loop
 * @type 
 * @description 
 */
async loop(args) {
  const targetRoot = await this.devbin.utils.constructor.findFirstParentDirectoryContaining(process.cwd(), "package.json");
  await this.devbin.settings.load();
  const port = this.devbin.settings.data?.loop?.port || 3005;
  const settingsControllers = this.devbin.settings.data?.loop?.controllers || [];
  const targetDirs = [
    require("path").resolve(targetRoot, "src"),
    require("path").resolve(targetRoot, "dev/settings.js"),
    require("path").resolve(targetRoot, "test/unit/src"),
    require("path").resolve(targetRoot, "test/feature"),
    require("path").resolve(targetRoot, "test/integrity"),
    require("path").resolve(targetRoot, "test/spontaneous"),
  ];
  const devControllersFile = `${targetRoot}/dev/controllers.js`;
  const devControllers = await this.devbin.utils.existsFile(devControllersFile) ? [devControllersFile] : [];
  return this.devbin.constructor.Refrescador.run({
    watch: targetDirs,
    bulletproof: false,
    ignore: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/*.dist.*",
      "**/logs/**/*",
      "**/test/unit/**/*",
    ],
    port,
    debounce: 0,
    extensions: [
      "js",
      "css",
      "html",
      "md",
    ],
    execute: [
      'dev/run.js touch --file @{refrescador.file}',
    ],
    message: "El tiempo de refrescar ha llegado",
    messageFile: "TODO.md",
    payload: 'console.log("📟 Evento de refrescar activado");',
    // ignoreCallback: __dirname + "/ignorer.js",
    // executeCallback: ["file/from/cwd/target.js",],
    // payloadFile: 'browser-payload.js',
    serve: this.devbin.compiler.fullpathOf("@/dist/www"),
    staticPath: "dist/www",
    urlPrefix: "/",
    controllers: [
      ...devControllers,
      ...settingsControllers,
    ],
  });
}