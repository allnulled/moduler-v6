/**
 * @name ModulerV6.Util.prototype.joinPaths
 * @type 
 * @description 
 */
joinPaths(subpaths, origin = false) {
  this.assert(Array.isArray(subpaths), `Parameter «subpaths» must be array on «ModulerV6.prototype.joinPaths»`);
  this.assert(subpaths.length !== 0, `Parameter «subpaths.length» cannot be 0 on «ModulerV6.prototype.joinPaths»`);
  let out = "";
  Join_paths_overwritting_when_required:
  for(let index=0; index<subpaths.length; index++) {
    const subpath = subpaths[index];
    this.assert(typeof subpath === "string", `Parameter «subpaths[${index}]» must be string too on «ModulerV6.prototype.joinPaths»`);
    this.assert(typeof subpath !== "", `Parameter «subpaths[${index}]» cannot be empty string on «ModulerV6.prototype.joinPaths»`);
    if(subpath.includes("://")) {
      // @case Ruta por protocolo
      this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_PROTOCOL_BASED_PATH), `Paths can only have «://» at the begining, and preceded only by a protocol id, if any in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
      out = subpath;
    } else if(subpath.includes(":\\") || subpath.includes(":/") || subpath.startsWith("\\\\") || subpath.startsWith("//")) {
      // @case Ruta absoluta estilo Windows
      this.assert(subpath.match(this.constructor.symbols.REGEX_FOR_ABSOLUTE_WINDOWS_PATH), `Paths can only have «:\\|:/|\\\\|//» at the begining, and preceded only by a standard Windows disk unit identifier, if any in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
      out = subpath;
    } else if(subpath.startsWith("/")) {
      // @case Ruta absoluta estilo Linux
      out = subpath;
    } else if(subpath.startsWith("./")) {
      // @case Ruta relativa al basedir
      this.assert(typeof this.moduler.basedir === "string", `Cannot use «./» expression because «this.moduler.basedir» is «${typeof this.moduler.basedir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
      out = this.appendPathSeparator(this.moduler.basedir) + subpath.substr(2);
    } else if(subpath.startsWith("../")) {
      // @case Ruta relativa al basedir pero directorio superior
      this.assert(typeof this.moduler.basedir === "string", `Cannot use «../» expression because «this.moduler.basedir» is «${typeof this.moduler.basedir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
      out = this.appendPathSeparator(this.moduler.basedir, "..") + subpath.substr(3);
    } else if(subpath.startsWith("@/")) {
      // @case Ruta relativa al rootdir
      this.assert(typeof this.moduler.rootdir === "string", `Cannot use «@/» expression because «this.moduler.rootdir» is «${typeof this.moduler.rootdir}» right now in the case of «${subpath}» on «ModulerV6.Util.prototype.joinPaths»`);
      out = this.appendPathSeparator(this.moduler.rootdir) + subpath.substr(2);
    } else {
      // @case Cualquier otra ruta
      if(out.length) {
        out = this.appendPathSeparator(out) + subpath;
      } else {
        out = subpath;
      }
    }
  }
  Resolve_one_and_two_dots: {
    //    C:/una/ruta/absoluta.js
    //    C:\una\ruta\absoluta.js
    //    \\una\ruta\absoluta.js
    //    /una/ruta/absoluta.js
    //    ://una/ruta/absoluta.js
    //    http://una/ruta/absoluta.js
    //    ./una/ruta/relativa.js
    //    ../una/ruta/relativa.js
    //    @/una/ruta/relativa.js
    //    una/ruta/relativa.js
    const parts = this.splitPath(out);
    const newParts = []
    for(let index=0; index<parts.length; index++) {
      const part = parts[index];
      if(part === "..") {
        newParts.pop();
      } else if(part === ".") {
        // @OK.
      } else {
        newParts.push(part);
      }
    }
    out = newParts.join("/");
  }
  return out;
}