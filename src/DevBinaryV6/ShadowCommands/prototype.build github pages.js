/**
 * @name DevBinaryV6.ShadowCommands.prototype["build github pages"]
 * @type 
 * @description 
 */
async "build github pages"(args, devbin) {
  await devbin.compiler.files.copyDirectory("@/dist/www", "@/docs/dist/www");
  await devbin.compiler.files.copyFile.try("@/dist/www/index.html", "@/docs/index.html");
  await devbin.compiler.files.copyFile.try("@/dist/www/app.dist.js", "@/docs/app.dist.js");
  await devbin.compiler.files.copyFile.try("@/dist/www/app.dist.css", "@/docs/app.dist.css");
}