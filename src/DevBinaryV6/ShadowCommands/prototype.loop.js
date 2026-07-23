/**
 * @name DevBinaryV6.Hooks.prototype.loop
 * @type 
 * @description 
 */
async loop(args) {
  const targetRoot = await this.devbin.utils.constructor.findFirstParentDirectoryContaining(process.cwd(), "package.json");
  const targetDirs = [
    require("path").resolve(targetRoot, "src"),
    require("path").resolve(targetRoot, "test/unit/src"),
  ];
  return this.devbin.constructor.Refrescador.run({
    watch: targetDirs,
    bulletproof: false,
    ignore: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/*.dist.*",
      "**/logs/**/*",
    ],
    port: 3005,
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
  });
}