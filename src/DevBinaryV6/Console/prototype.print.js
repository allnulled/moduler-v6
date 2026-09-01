/**
 * @name DevBinaryV6.Console.prototype.print
 * @type 
 * @description 
 */
print(message) {
  let out = "";
  console.log(out = this.profile ? this.devbin.compiler.constructor.ansi.colors.style(this.profile).text(message) : message);
  return this;
}