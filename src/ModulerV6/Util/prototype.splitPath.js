/**
 * @name ModulerV6.Util.prototype.splitPath
 * @type 
 * @description 
 */
splitPath(path) {
  const out = [""];
  let index = 0;
  while (index < path.length) {
    const ch = path[index];
    if (ch === "/" || ch === "\\") {
      out.push("");
    } else {
      out[out.length - 1] += ch;
    }
    index++;
  }
  return out;
}