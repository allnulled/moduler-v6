1. Los instrumentalizados deben especificarse con ruta completa, no con globs
   - Esto es para poder reutilizarlo bien en el moduler
2. El moduler debe tener un Settings
   - ok, lo tiene
3. El Settings del moduler carga a dist/www/dev/settings.dist.js
   - ok, lo hace
4. El dist/www/dev/settings.dist.js carga al dist/www/dev/settings/instrumentalize.json
   - esto aún no lo hace
5. El dev/settings.js genera al dist/www/dev/settings/instrumentalize.json
   - esto hay que hacerlo en el loop
   - hay que poder poner un watcher específico al dev/settings.js
   - esto tiene pinta de parámetro compuesto
   - no lo reuses aún, haz la prueba de concepto hardcodeado
   - y ya veremos más adelante
6. De esta forma consigues:
   - Pasar los instrumentalizados del dev al runtime en el momento de cambiarlos
   - Reutilizar configuraciones del dev al runtime fácilmente y al momento

Luego además:

7. Añadir en Settings a: env.id = "test" / "dev" / "prod"
8. Añadir clase Runtime
   - Probablemente al ModulerV6
   - Debe aportar:
      - Runtime.env
      - Runtime.isDev
      - Runtime.isTest
      - Runtime.isProd
      - Runtime.isBrowser
      - Runtime.isNodejs
      - Runtime.isInRefrescador (diferente de isDev | isTest && !isProd aunque puede coincidir)
      - Runtime.hasCompilerV6
      - Runtime.hasDevBinaryV6
      - Runtime.currentPath
      - Runtime.moduler getter de ModulerV6.globalInstance
      - Runtime.compiler getter de CompilerV6.globalInstance
      - Runtime.devbin getter de DevBinaryV6.globalInstance
      - Runtime.isInModule($moduler) para saber si estás cargando un módulo o no
         - útil para metacódigo
      - Runtime.load()
      - Runtime.loadSettings()
      - Runtime.settings
9. Usar el Runtime para cargar al Settings
10. Cuando el ModulerV6 puede saber si está en dev|test|prod
   - Meter en el ModulerV6.prototype.{import,export} el hook
      - y mirar el Runtime.settings.instrumentalize
      - y sacar de ahí si tiene que ir con `.dist.instr.js`


----

TODO claro y conciso:

- Vale, el www está medio-solucionado porque básicamente los 2 entornos apuntan a: dist/www
- Es decir, igual no es muy elegante, pero te quita de un percal-que-flipas
   - El percal consiste en que un símbolo extra para referirse al entorno es super-ambiguo
   - Y todo sería para parchear el slug intermedio entre el rootdir del "dist/www"
   - Y estarías obligado a desambiguar, según el entorno, en todo el medio de varias funciones calientes
      - desde normalizationOf, rootdirOf
      - hasta import, export, etc.
      - probablemente el normalizationOf sea el más conflictivo porque no siempre estás opinionándote
      - es una feature de lo más indeseable y complicada
      - todo esto se subsana con el slug "dist/www" que permite acceder:
         - acceso de forma uniforme
         - desde nodejs y browser por igual
         - a los módulos de distribución
      - fin, así se cierra este conflicto.

- Entonces, pasamos al siguiente conflicto: el dev/settings.js
   - El dev/settings.js es uno, y
   - El src/www/dev/settings.entry.js es otro
   - En el browser lo que haces es: `$moduler.import("@/dist/www/dev/settings.dist.js")`
      - Aquí estás importando los settings del moduler-v6
         - es compatible con el browser
         - y es compatible con el nodejs
   - En el nodejs lo que haces es: `$moduler.importFile("@/dev/settings.js")` (o con el require, vaya)
      - Aquí estás importando los settings del devbinary-v6 realmente
         - no es compatible con el browser
         - solo es compatible con el nodejs



1. [x] bug de import export dependencies as sections: solucionar
2. [x] generar reporte cov json y html con refrescador --controllers file.js
3. [x] generar reporte cov para nodejs también (con fetch, igual que el browser)
4. [ ] generar el md con los comentarios aunque sea en json y md plano
   - [ ] pero empezar a ver las dependencias de cada módulo entry
5. [x] acabar el inject source por comentario
   - [x] no el de plantilla, que demanda otro segundo parseo
   - [x] el injects de js a js
   - [x] delega el postCompileAsInjectSource
6. [ ] que los globs del instr permitan negación también con !
7. [ ] que los glob dels instr sirvan para gestionar el coverage sin estar más pendiente.
   - [ ] muy importante, conseguir olvidarse 100% solo el dev/settings.js
   - [ ] tanto en inject.source como @injects como moduler.import y moduler.export
8.[ ] vigilar el flujo de los tests
   - [ ] caso www
   - [ ] caso módulo conectado a otro (propag test)
   - [ ] caso compile.inject.source en los tests también
   - [ ] caso moduler.import
1. [ ] acabar de definir nomenclatura/filepatterns
   - [ ] entry con module.exports
   - [ ] class
   - [ ] caso de dependencias no sería class sino import, explicar
      - [ ] mirar el edgecase de module.exports = $moduler.import que sin await lance el catch
         - [ ] lo pilla igual o se pierde?
2.  [ ] empezar con css también ya, ver los casos, evitar appends prepends
   - [ ] hacer el juego del theme con selector y js
   - [ ] probar de cambiar los estilos dinámicamente
   - [ ] no tocar el parser del css
3.  [ ] un settings.sectionsMap iría bien
4.  [ ] el settings en el www, hay que pensarlo bien
   - [ ] cosas del server no, importante
   - [ ] sectionsMap va en el www
   - [ ] que el de nodejs importe al del www sería la mejor
5.  [ ] que se puedan usar sections en import/export gracias al sectionsMap
6.  [ ] Feature-driven dev:
   - [ ] test/feature/[id].[name].js
   - [ ] settings.fdd/test.features con " y "!
   - [ ] con e.onFeature y e.onTest y e.onExport
   - [ ] que se ejecuten 1 vez con path.relative importas
7.  [ ] necesito ver el arbol de ficheros y dependencias+ranking de dependencia
8.  [ ] necesito poder parsear markdown (? o parser) y extraer la info de los comentarios
9.  [ ] con la info de los comentarios, poder armar el foem y que pueda usarse con funciones y toString

10. [ ] que el Runtime pueda sacar isDev isTest isProduction con setting + controllers y servicio 
11. [ ] que el coverage vaya solo, sin cambiar los paths (6.bis) solo los selectores glob del settings
12. [ ] que el sectionsMap se genere solo no se puede porque hay que ponerle nombre
13. [ ] hay que poder llegar a sacar ciertas estructuras de los comentarios de md
   - [ ] puede que con un parser aparte
   -  [ ] puede necesitarse peggy para estos fragmentos
   - [ ] sacar los parámetros de las funciones y métodos, sus nombres, tipos, definiciones
      - [ ] de aquí se sacaría el forms ya no del file sino de funciones que están escampadas por el global
      - [ ] y con types se complementaría para sacar un form, con una función alcanzable, ReachableFunction
      

1. core
2. node
3. server
4. binary
5. client
6. web

RemoCore
.version

RemoNode
.utils

RemoServer
.start
.stop
.handleRequest

.ProgressNotifier
  .advance
  .subprogress():ProgressNotifier
  .setTotal
  .onStart
  .onAdvance
  .onCompleted
.eventHandlers
.EventHandler
  .condition
  .handler

RemoBinary
.dispatch
.selfDispatch

RemoClient
...fs.toplevel
...db.toplevel

RemoWeb
.




Messager
Channel
Communicator
Synchronizer

Messager.create(socket, server)
messager.on(conditionCallback, action)
meesager.send(message)