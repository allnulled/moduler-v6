/**
 * @name DevBinaryV6.Hooks.prototype.loop
 * @type 
 * @description 
 */
async loop(args) {
  const targetRoot = await this.devbin.utils.constructor.findFirstParentDirectoryContaining(process.cwd(), "package.json");
  const targetDir = require("path").resolve(targetRoot, "src");
  return this.devbin.constructor.Refrescador.run({
    watch: [
      targetDir,
    ],
    bulletproof: false,
    ignore: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/*.dist.*",
      "**/logs/**/*",
      "**/test/assets/unit/**/*"
    ],
    port: 3005,
    debounce: 0,
    extensions: [
      "sh",
      "ts",
      "tsx",
      "txt",
      "js",
      "json",
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
    // serve: 'some/static/www',
    // urlPrefix: 'static/subpath/on/server',
  });
}