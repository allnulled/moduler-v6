# 2026/08/19, miércoles

Ahora:

- [x] El dev/bin/build/github/pages/command.js
   - [x] No hay un fichero de comando, se hace con ShadowCommands
   - [x] Solamente copia "dist/www" en "docs/dist/www"
   - [x] Tiene un test en 205
- [x] El $compiler.inject.module
   - [x] Permite módulos doblemente compatibles, con: $moduler.{import,export} y $compiler.inject
   - [x] Tiene un test en 011
- [x] El DevBinary.prototype.command no lanzaba error al no encontrar el comando
   - [x] ahora debería lanzarlo
- [ ] El moduler-v6-starter tiene apps en el dist/www:
   - [ ] se tienen que poder ver en github pages gracias al comando devbin build github pages
      - [ ] gracias a que el basedir del ModulerV6 detecta si estás en github.io
      - [ ] y se configura solo para que el rootdir sea la raíz del docs de ese proyecto
      - [ ] y sobreentiende que los módulos de distribución están en "@/docs/dist/www" (en producción de github pages)
      - [ ] aunque se acceden con "@/dist/www" igualmente
   - [ ] se tiene que poder explotar la modulación estática y programática con módulos ambivalentes
      - [ ] gracias a $compiler.inject.module y a $moduler.{import,export}
   - [ ] se tienen que poder omitir los script tags para bindearlo con el refrescador
      - [ ] ModulerV6 sabiendo el entorno debe saber también resolver esos 2 scripts y poder omitirlos del index.html si importas ModulerV6
      - [ ] ModulerV6 sabiendo el entorno debe saber también resolver esos 2 scripts y poder omitirlos del index.html si importas ModulerV6
   - [ ] Iterar con npm run up hasta que funcione en github pages (?)

Luego:

- [ ] La guía para aplicaciones de Github Pages
   - [ ] Explicar la modulación ambivalente
      - [ ] $compiler.inject.module para js
      - [ ] @injects para css
      - [ ] devbin build github pages para compilar
   - [ ] Aclarar la historieta de las rutas
      - [ ] Que si usas @/dist/www/ se entienden los 2
      - [ ] Que si estás en github.io el ModulerV6 automáticamente se asigna el rootdir
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