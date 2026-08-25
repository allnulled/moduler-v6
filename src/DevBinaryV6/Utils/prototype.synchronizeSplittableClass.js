/**
 * @name DevBinaryV6.Utils.prototype.synchronizeSplittableClass
 * @type Function
 * @description
 * Sincroniza una clase JavaScript con una estructura de ficheros
 * donde cada miembro de la clase puede vivir en su propio fichero.
 */
async synchronizeSplittableClass(filepath, event) {
  const fs = require("fs").promises;
  const path = require("path");
  const parser = require("@babel/parser");
  const classDirectory = path.dirname(filepath);
  try {
    // ------------------------------------------------------------
    // 0. Mutear el directorio por si se vienen cambios
    // ------------------------------------------------------------
    await this.devbin.muteTouchListenerOf(`${classDirectory}/**/*`);
    // ------------------------------------------------------------
    // 1. Leer filepath
    // ------------------------------------------------------------
    const source = await fs.readFile(filepath, "utf8");
    // ------------------------------------------------------------
    // 2. Parsear filepath como JavaScript
    // ------------------------------------------------------------
    const ast = parser.parse(source, {
      sourceType: "unambiguous",
      plugins: [
        "classProperties",
        "classPrivateProperties",
        "classStaticBlock",
        "decorators-legacy"
      ]
    });
    // ------------------------------------------------------------
    // 3. Comprobar que únicamente tiene 1 class
    // ------------------------------------------------------------
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
    if (classes.length !== 1) {
      throw new Error(`synchronizeSplittableClass(): se esperaba exactamente una clase en "${filepath}", pero se encontraron ${classes.length}.`);
    }
    const classNode = classes[0];
    const className = classNode.id?.name || "AnonymousClass";
    // ------------------------------------------------------------
    // Directorio donde vivirán los fragmentos
    // ------------------------------------------------------------
    await fs.mkdir(classDirectory, { recursive: true });
    // ------------------------------------------------------------
    // 4. Extraer miembros
    // ------------------------------------------------------------
    const members = [];
    for (const member of classNode.body.body) {
      // --------------------------------------------------------
      // Constructor
      // --------------------------------------------------------
      if (member.type === "ClassMethod" && member.kind === "constructor") {
        members.push({
          kind: "constructor",
          name: "constructor",
          filename: "constructor.js",
          node: member
        });
        continue;
      }
      // --------------------------------------------------------
      // Método estático / prototipo
      // --------------------------------------------------------
      if (member.type === "ClassMethod" || member.type === "ClassPrivateMethod") {
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
          throw new Error(`No se puede determinar el nombre de un miembro de "${className}".`);
        }
        const kind = member.static ? "static" : "prototype";
        members.push({
          kind,
          name,
          filename: `${kind}.${name}.js`,
          node: member
        });
        continue;
      }
      // --------------------------------------------------------
      // Propiedad de clase
      // --------------------------------------------------------
      if (member.type === "ClassProperty" || member.type === "ClassPrivateProperty") {
        let name;
        if (member.key.type === "Identifier") {
          name = member.key.name;
        } else if (member.key.type === "PrivateName") {
          name = `#${member.key.id.name}`;
        } else if (member.key.type === "StringLiteral") {
          name = member.key.value;
        } else {
          throw new Error(`No se puede determinar el nombre de la propiedad de "${className}".`);
        }
        const kind = member.static ? "static" : "prototype";
        members.push({
          kind,
          name,
          filename: `${kind}.${name}.js`,
          node: member
        });
        continue;
      }
      // --------------------------------------------------------
      // static {}
      // --------------------------------------------------------
      if (member.type === "StaticBlock") {
        members.push({
          kind: "static",
          name: "block",
          filename: "static.block.js",
          node: member
        });
        continue;
      }
      throw new Error(`Miembro de clase no soportado: ${member.type}`);
    }
    // ------------------------------------------------------------
    // 5. Determinar contenido de cada miembro
    // ------------------------------------------------------------
    for (const member of members) {
      if ((member.node.type === "ClassProperty" || member.node.type === "ClassPrivateProperty" ) && member.node.value?.type === "NullLiteral") {
        member.content = null;
      } else {
        member.content = source.slice(member.node.start,member.node.end);
      }
    }
    // ------------------------------------------------------------
    // 6. Sincronización
    // ------------------------------------------------------------
    let reconstructedClass = `class ${className} {\n\n`;
    for (const member of members) {
      const targetFile = path.join(
        classDirectory,
        member.filename
      );
      let content;
      // --------------------------------------------------------
      // Si el fichero de origen contiene el miembro, lo usamos
      // y actualizamos su fragmento.
      // --------------------------------------------------------
      if (member.content !== null) {
        content = member.content;
        await fs.writeFile(targetFile, this.getMemberFragmentCodeFor(content, member), "utf8");
      }
      // --------------------------------------------------------
      // Si no hay contenido, intentamos recuperar el fragmento
      // existente.
      // --------------------------------------------------------
      else {
        try {
          content = await fs.readFile(targetFile, "utf8");
        } catch (error) {
          if (error.code === "ENOENT") {
            content = "";
          } else {
            throw error;
          }
        }
      }
      // --------------------------------------------------------
      // Añadir el miembro a la clase reconstruida
      // --------------------------------------------------------
      if (content.trim()) {
        reconstructedClass += content.trimEnd() + "\n\n";
      }
    }
    reconstructedClass += "}\n";
    // ------------------------------------------------------------
    // 7. Escribir la clase reconstruida
    // ------------------------------------------------------------
    reconstructedClass = await this.devbin.compiler.constructor.beautifyJs(reconstructedClass);
    await fs.writeFile(filepath, reconstructedClass, "utf8");
    return {
      filepath,
      className,
      classDirectory,
      members: members.map(member => ({
        kind: member.kind,
        name: member.name,
        filename: member.filename
      }))
    };
  } catch (error) {
    // throw error;
  } finally {
    // ------------------------------------------------------------
    // 8. Desmutear el directorio porque los cambios han terminado
    // ------------------------------------------------------------
    await this.devbin.unmuteTouchListenerOf(`${classDirectory}/**/*`);
  }
}