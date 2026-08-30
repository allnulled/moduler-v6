/**
 * @name DevBinaryV6.Utils.prototype.synchronizeSplittableMethod
 * @type Function
 * @description
 * Sincroniza un método de un fichero splittable con las clases
 * splittable que puedan contenerlo.
 */
async synchronizeSplittableMethod(filepath, event) {
  const fs = require("fs").promises;
  const path = require("path");
  const parser = require("@babel/parser");
  const directory = path.dirname(filepath);
  const methodFilename = path.basename(filepath);
  const $ = this.devbin.compiler.constructor.ansi.colors;
  let output = 0;
  let _error = false;
  let classFiles = undefined;
  try {
    // Chutar si viene de splittable anterior:
    if(event.isSynchronizingSplittable) return 0;
    // ------------------------------------------------------------
    // 0. Mutear el directorio por si se vienen cambios
    // ------------------------------------------------------------
    await this.devbin.muteTouchListenerOf(`${directory}/**/*`);
    // ------------------------------------------------------------
    // 1. Determinar el tipo y nombre del miembro desde filepath
    // ------------------------------------------------------------
    const methodMatch = methodFilename.match(/^(static|prototype)\.(.+)\.js$/);
    if (!methodMatch) {
      // Dismissed por
      return output = false;
    }
    const methodKind = methodMatch[1];
    const methodName = methodMatch[2];
    const isStatic = methodKind === "static";
    // ------------------------------------------------------------
    // 2. Leer el contenido del método
    // ------------------------------------------------------------
    const methodSource = await fs.readFile(filepath, "utf8");
    // ------------------------------------------------------------
    // 3. Buscar los splittable class del directorio
    // ------------------------------------------------------------
    const entries = await fs.readdir(directory);
    const splittableClassFiles = entries
      .filter(entry => entry.startsWith("splittable.") && entry.endsWith(".class.js"))
      .map(entry => path.join(directory, entry));
    if (!splittableClassFiles.length) {
      return output = false;
    }
    // ------------------------------------------------------------
    // 4. Iterar sobre los splittable class encontrados
    // ------------------------------------------------------------
    for (const splittableClassFile of splittableClassFiles) {
      // ----------------------------------------------------------
      // 4.1. Leer splittable class
      // ----------------------------------------------------------
      const source = await fs.readFile(splittableClassFile,"utf8");
      // ----------------------------------------------------------
      // 4.2. Parsear splittable class
      // ----------------------------------------------------------
      const ast = parser.parse(source, {
        sourceType: "unambiguous",
        plugins: [
          "classProperties",
          "classPrivateProperties",
          "classStaticBlock",
          "decorators-legacy"
        ]
      });
      // ----------------------------------------------------------
      // 4.3. Buscar las clases existentes
      // ----------------------------------------------------------
      const classes = [];
      function walk(node) {
        if (!node || typeof node !== "object") {
          return;
        }
        if (node.type === "ClassDeclaration" || node.type === "ClassExpression") {
          classes.push(node);
        }
        for (const key of Object.keys(node)) {
          if (key === "loc" || key === "start" || key === "end") {
            continue;
          }
          const value = node[key];
          if (Array.isArray(value)) {
            for (const child of value) {
              walk(child);
            }
          } else if (value && typeof value === "object") {
            walk(value);
          }
        }
      }
      walk(ast);
      // ----------------------------------------------------------
      // 4.4. La clase debe ser única
      // ----------------------------------------------------------
      if (classes.length !== 1) {
        throw new Error(`synchronizeSplittableMethod(): se esperaba exactamente una clase en "${splittableClassFile}", pero se encontraron ${classes.length}.`);
      }
      const classNode = classes[0];
      // ----------------------------------------------------------
      // 4.5. Buscar el método
      // ----------------------------------------------------------
      let targetMethod = null;
      for (const member of classNode.body.body) {
        if (member.type !== "ClassMethod" && member.type !== "ClassPrivateMethod") {
          continue;
        }
        let name;
        if (member.key.type === "Identifier") {
          name = member.key.name;
        } else if (member.key.type === "StringLiteral") {
          name = member.key.value;
        } else if (member.key.type === "NumericLiteral") {
          name = String(member.key.value);
        } else if (member.key.type === "PrivateName") {
          name = `#${member.key.id.name}`;
        } else {
          continue;
        }
        if (name === methodName && member.static === isStatic) {
          targetMethod = member;
          break;
        }
      }
      // ----------------------------------------------------------
      // 4.6. Si no existe el método, esta clase no corresponde
      // ----------------------------------------------------------
      if (!targetMethod) {
        continue;
      }
      // ----------------------------------------------------------
      // 4.7. Sustituir exclusivamente el método
      // ----------------------------------------------------------
      const reconstructedSource = source.slice(0, targetMethod.start) + this.getClassMemberFragmentCodeFor(methodSource) + source.slice(targetMethod.end);
      // ----------------------------------------------------------
      // 4.8. Escribir splittable class
      // ----------------------------------------------------------
      console.log($.style("blackBright").text(`[*] DevBinaryV6 is updating splittable class: ${this.devbin.moduler.rootdirOf(splittableClassFile)}`));
      // @ATENCIÓN: ESTE ES EL QUE CREA LA RECURSIVIDAD:
      await fs.writeFile(splittableClassFile, reconstructedSource, "utf8");
    }
    classFiles = splittableClassFiles.map(file => {
      return path.join(path.dirname(file), path.basename(file).replace(/^splittable\./g, ""));
    });
    /*
    for(let index=0; index<classFiles.length; index++) {
      const classFile = classFiles[index];
      await this.touchFile(classFile, {
        propagateUp: false,
        processedEntries: event.processedEntries || {},
        isSynchronizingSplittable: true,
      });
    }
    //*/
    output = classFiles;
  } catch (error) {
    console.log("Error synchronizing splittable method:", error);
    _error = error;
  } finally {
    // ------------------------------------------------------------
    // 5. Desmutear el directorio porque los cambios han terminado
    // ------------------------------------------------------------
    await this.devbin.unmuteTouchListenerOf(`${directory}/**/*`);
    if(_error) throw _error;
    return output;
  }
}