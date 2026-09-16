/**
 * @name CompilerV6.prototype._createDefaultInjectedFile
 * @type 
 * @description 
 */
_createDefaultInjectedFile(file, targetId) {
  const path = require("path");
  const fileid = path.basename(file);
  const filename = fileid.replace(/\.js$/g, "");
  const fileattrs = this._extractFilenameAttributes(fileid);
  const { name, attr, list: attrList } = fileattrs;
  const notMethods = this.constructor.sensitiveFileAttributes.filter(it => !["static","prototype"].includes(it));
  let output = "";
  Decide_output: {
    const cannotBeMethod = !!attrList.filter(it => notMethods.includes(it)).length;
    Intercept_one_solution_cases: {
      if(name === "static") {
        output = "static {\n  \n}";
      }
      if(name === "constructor") {
        output = "constructor() {\n  \n}";
      }
    }
    First_type: {
      if (attr.class) {
        output = `class ${name || ""}{\n  static {\n    $moduler.toolkit.makeClass([\n      Std.interfaces.InstantiableInterface,\n    ], this);\n  }\n}`;
      } else if (attr.function) {
        output = `function ${name || ""}() {\n  \n}`;
      } else if (attr.member || attr.any) {
        output = `0`;
      } else if (attr.fact) {
        output = `(function ${name || ""}() {\n  \n}).call(this)`;
      } else if (attr.part) {
        output = name ? `Step_${name}: {\n  \n}` : "";
      } else if (attr.promise) {
        output = `new Promise(async (resolve, reject) => {\n  \n})`;
      } else if (attr.get) {
        output = `get ${name || ""} () {\n  \n}`;
      } else if (attr.set) {
        output = `set ${name || ""} () {\n  \n}`;
      } else if (attr.construct) {
        output = `construct ${name || ""} () {\n  \n}`;
      } else if (attr.apply) {
        output = `apply ${name || ""} () {\n  \n}`;
      } else if (attr.deleteProperty) {
        output = `deleteProperty ${name || ""} () {\n  \n}`;
      } else if (attr.interface) {
        output = `// @interface:${name || ""}\n{\n  prototype: {},\n  static: {},\n}`;
      } else if (!cannotBeMethod) {
        output = `${name || ""} () {\n  \n}`;
      }
    }
    Second_presentation: {
      if (attr.static && name && cannotBeMethod) {
        output = `static ${name} = ${output};`;
      } else if (attr.static && name) {
        output = `static ${output}`;
      } else if (attr.prototype && name && cannotBeMethod) {
        output = `${name} = ${output};`;
      } else if (attr.prototype && name) {
        // @OK
      } else if (attr.member && name) {
        output = `${name}: ${output}`;
      }
    }
  }
  return require("fs").promises.writeFile(file, output, "utf8").catch(error => {
    console.log(`[!] Could not create injected path «${file}» on «ModulerV6.prototype._compileAsInjectSource»`);
  });
}