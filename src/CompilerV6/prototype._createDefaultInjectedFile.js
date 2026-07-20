/**
 * @name CompilerV6.prototype._createDefaultInjectedFile
 * @type 
 * @description 
 */
_createDefaultInjectedFile(file, targetId) {
  const filename = require("path").basename(file).replace(/\.js$/g,"");
  let name, targetType, targetIsClass = false, targetRootdir;
  targetType = "any";
  targetRootdir = this.rootdirOf(file);
  name = (() => {
    const isPrototype = filename.startsWith("prototype.");
    const isStatic = filename.startsWith("static.");
    const isClass = filename.endsWith(".class");
    const isAsync = filename.match(/(^async\.)|(\.async\.)|(\.async$)/g);
    const isSync = filename.match(/(^sync\.)|(\.sync\.)|(\.sync$)/g);
    const isConstructor = filename === "constructor";
    const isOnlyClass = isClass && (!isPrototype) && (!isStatic);
    const fileId = filename
      .replace(/^(prototype|static)\./g, "")
      .replace(/^a?sync\./g, "")
      .replace(/\.a?sync$/g, "")
      .replace(/\.class$/g, "");
    const isJsFriendly = fileId.match(/^[A-Za-z_$][A-Za-z0-9_$]*$/g);
    let out = "";
    let prefixes = "";
    let middle = "";
    let suffixes = "";
    if(isStatic) {
      prefixes += `static `;
      targetType = "static class member";
    } else if(isPrototype) {
      targetType = "prototype class member";
    } else if(isClass) {
      targetType = "only class"
    }
    if(isClass) {
      if(isStatic || isPrototype)  {
        suffixes += " = ";
      }
      suffixes += `class ${fileId}`;
      targetType = targetType === "class" ? targetType : targetType + " + class";
    } else if(isAsync) {
      prefixes += `async `;
      suffixes += `()`;
      targetType += " + async";
    } else if(isSync) {
      prefixes += ``;
      suffixes += `()`;
      targetType += " + sync";
    } else {
      suffixes = " ()";
    }
    if(!isOnlyClass) {
      if(isJsFriendly) {
        middle = fileId;
      } else {
        middle = JSON.stringify(fileId);
      }
    }
    out = prefixes + middle + suffixes;
    return out;
  })();
  const headerComment = `/**\n   * @file ${targetRootdir}\n   * @type ${targetType}\n   */`;
  return require("fs").promises.writeFile(file, `${name} {
  ${headerComment}
}`, "utf8").catch(error => {
    console.log(`[!] Could not create injected path «${file}» on «ModulerV6.prototype._compileAsInjectSource»`);
  });
}