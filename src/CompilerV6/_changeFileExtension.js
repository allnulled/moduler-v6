/**
 * @name CompilerV6._changeFileExtension
 * @type 
 * @description 
 */
static _changeFileExtension(file, nuevaExt) {
  const path = require("path");
  if (!nuevaExt.startsWith(".")) {
    nuevaExt = "." + nuevaExt;
  }
  const dir = path.dirname(file);
  const nombre = path.basename(file, path.extname(file));
  return path.join(dir, nombre + nuevaExt);
}