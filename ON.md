- Tenemos que conseguir pasar todos los tests pero cambiando:
   - que el prepend actúe sobre toda la cadena de parentCompilations
   - a
      - que el prepend actúe sobre el actual +
      - que el unify sí haga prepend solo al parentCompilation inmediato
      - luego le aplique el indentation titular
      - luego le inyecte el toc
      - luego le inyecte el rels
      - pero los cambios solo en el local, el parent se ocupa de lo suyo


ChatGPT revisando la feature del ! delante de las rutas para que no crashee si no encuentra el fichero (no si devuelve algún error, sino si hay ese error concreto).

| Zona                                    |             Afectada | Problema                                                                              |
| --------------------------------------- | -------------------: | ------------------------------------------------------------------------------------- |
| `ModulerV6.import()`                    |               **Sí** | Es el punto principal                                                                 |
| `_importFile()`                         | **Sí, directamente** | `!` está capturando errores de ejecución además de errores de carga                   |
| Importaciones de dependencias           |               **Sí** | `Promise.all(_dependencies.map(...))` puede propagar/rechazar según dónde esté el `!` |
| `$moduler.import()` durante compilación |   **Sí, importante** | El compilador no trata `!` como opcional                                              |
| `$moduler.export()` durante compilación |               **Sí** | Tiene prácticamente el mismo problema que `import`                                    |
| JSON imports                            |               **Sí** | El `.json` tiene una ruta de ejecución distinta y el `catch` de `justTry` no lo cubre |
| `sectionMap`                            |   **Indirectamente** | Acaba llamando a `this.import(sectionPath)`                                           |
| `@requires` / `$compiler.inject...`     |  **No directamente** | Son mecanismos distintos de importación                                               |
