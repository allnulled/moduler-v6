/**
 * @name ModulerV6.Util.prototype.splitPath
 * @type 
 * @description 
 */
splitPath(path) {
  const out = [""];
  let i = 0;
  while (i < path.length) {
    const c = path[i];
    if (c === "/" || c === "\\") {
      out.push("");
    } else {
      out[out.length - 1] += c;
    }
    i++;
  }
  return out;
}