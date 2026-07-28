
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
8.[ ] vigilar el flujo de los tests
   - [ ] caso www
   - [ ] caso módulo conectado a otro (propag test)
   - [ ] caso compile.inject.source en los tests también
   - [ ] caso moduler.import
9. [ ] acabar de definir nomenclatura/filepatterns
   - [ ] entry con module.exports
   - [ ] class
   - [ ] caso de dependencias no sería class sino import, explicar
      - [ ] mirar el edgecase de module.exports = $moduler.import que sin await lance el catch
         - [ ] lo pilla igual o se pierde?
10. [ ] empezar con css también ya, ver los casos, evitar appends prepends
   - [ ] hacer el juego del theme con selector y js
   - [ ] probar de cambiar los estilos dinámicamente
   - [ ] no tocar el parser del css
11. [ ] un settings.sectionsMap iría bien
12. [ ] el settings en el www, hay que pensarlo bien
   - [ ] cosas del server no, importante
   - [ ] sectionsMap va en el www
   - [ ] que el de nodejs importe al del www sería la mejor
13. [ ] que se puedan usar sections en import/export gracias al sectionsMap
14. [ ] Feature-driven dev:
   - [ ] test/feature/[id].[name].js
   - [ ] settings.fdd/test.features con " y "!
   - [ ] con e.onFeature y e.onTest y e.onExport
   - [ ] que se ejecuten 1 vez con path.relative importas
15. [ ] necesito ver el arbol de ficheros y dependencias+ranking de dependencia
16. [ ] necesito poder parsear markdown (? o parser) y extraer la info de los comentarios
17. [ ] con la info de los comentarios, poder armar el foem y que pueda usarse con funciones y toString

18. [ ] que el Runtime pueda sacar isDev isTest isProduction con setting + controllers y servicio 
19. [ ] que el coverage vaya solo, sin cambiar los paths (6.bis) solo los selectores glob del settings
20. [ ] que el sectionsMap se genere solo no se puede porque hay que ponerle nombre
21. [ ] hay que poder llegar a sacar ciertas estructuras de los comentarios de md
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