1. [x] Que el touch pase los html del src al dist (copy simple de momento, pero que el index no tenga que editarlo en el dist)
2. [ ] Que se puedan generar los rels en el dist en formato json
   - al lado de cada `*.dist.js` su `*.rels.json`
   - La pega del rels ahora mismo es que [creo] el to:source no añade en el reporter
3. [ ] Que se puedan acoplar .md bien en jerarquía vertical
   - se trata de que cuando:
   - hay un inject.source + de un dist + en el compileRecursively + cuando isRoot + al final, antes de salir del método
   - coge el compilation.md y hace el replace para equilibrar los títulos
   - y además, crea un numerito donde mantiene el nivel al que tienen que estar los títulos, mínimo, y en cada _compileRecursively se lo va pasando
      - y si es un dist.js, le suma 1
4. [ ] Que se pueda inyectar ToC en el markdown desde el compiler/devbin
5. [ ] Que se pueda inyectar rels.json en el markdown desde el compiler/devbin
6. [ ] Falta que se pueda inyectar @__FILENAME__ en el markdown también desde el compiler/devbin
7. [ ] Que se puedan añadir hooks en el moduler:
```js
// Para añadir un hook:
$moduler.hooks.on.file("@/src/std/Some/Class.dist.js").add(function() {
    // do something
    // puedes alterar el valor del package
});
$moduler.hooks.on.file("@/src/std/Some/Class.dist.js").remove($moduler.hooks._onFile["@/src/std/Some/Class.dist.js"][0]);
```