/**
 * @name DevBinaryV6.ShadowCommands.prototype["build github pages"]
 * @type 
 * @description 
 */
async "build github pages"(args, devbin) {
  await this.devbin.compiler.files.copyDirectory("@/dist/www", "@/docs/dist/www");
  await this.devbin.compiler.files.readDirectory("@/dist");
  await this.devbin.compiler.files.copyFile.try("@/dist/www/index.html", "@/docs/index.html");
  await this.devbin.compiler.files.copyFile.try("@/dist/www/app.dist.js", "@/docs/app.dist.js");
  await this.devbin.compiler.files.copyFile.try("@/dist/www/app.dist.css", "@/docs/app.dist.css");
}