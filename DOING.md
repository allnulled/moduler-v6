# 2026/08/19, miércoles

Ahora:

- [x] El DevBinary.prototype.command no lanzaba error al no encontrar el comando
   - [x] ahora debería lanzarlo
- [x] El dev/bin/build/github/pages/command.js
   - [x] No hay un fichero de comando, se hace con ShadowCommands
   - [x] Solamente copia "dist/www" en "docs/dist/www"
   - [x] Tiene un test en 205
- [x] El $compiler.inject.module
   - [x] Permite módulos doblemente compatibles, con: $moduler.{import,export} y $compiler.inject
   - [x] Tiene un test en 011

Luego:

- [ ] La guía para aplicaciones de Github Pages
   - [ ] Potenciada por $compiler.inject.module
   - [ ] Potenciada por devbin build github pages
   - [ ] Aclarar la historieta de las rutas
   - [ ] Tipo all-in-1-HTML 
      - [ ] Pero reaprovechando módulos programáticos con $compiler.inject.module

# 2026/08/18, martes

- [x] Permitir importar ficheros html con el compilador
   - [x] permitir al CompilerV6.prototype._fetchCompilable la extensión de html
   - [x] permitir al CompilerV6.prototype._tokenizeText la extensión de html
   - [x] habilitar un parser forHtml con las gramáticas mínimas de @injects y $compiler.inject.source solamente
   - [x] permitir al CompilerV6.prototype._compileAsInjects la extensión de html
   - [x] preparar un test que compile un html con estas sintaxis
   - [x] permitir al CompilerV6.prototype._compileAsInjectSource la extensión de html
   - [x] pasar el test