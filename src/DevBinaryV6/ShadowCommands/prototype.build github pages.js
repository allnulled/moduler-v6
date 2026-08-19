/**
 * @name DevBinaryV6.ShadowCommands.prototype["build github pages"]
 * @type 
 * @description 
 */
"build github pages"(args, devbin) {
  return devbin.compiler.files.copyDirectory("@/dist/www", "@/docs/dist/www");
}