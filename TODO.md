1. [ ] bug de import export dependencies as sections: solucionar
2. [ ] generar reporte cov json y html con refrescador --controllers file.js
3. [ ] generar reporte cov para nodejs también
4. [ ] generar el md con los comentarios aunque sea en json y md plano
   - [ ] pero empezar a ver las dependencias de cada módulo entry
5. [ ] acabar el inject source por comentario
   - [ ] no el de plantilla, que demanda otro segundo parseo
   - [ ] el injects de js a js
   - [ ] modula el postCompileAsInjectSource
6. [ ] que los globs del instr permitan negación también con !
7. [ ]vigilar el flujo de los tests
   - [ ] caso www
   - [ ] caso módulo conectado a otro (propag test)
   - [ ] caso compile.inject.source en los tests también
   - [ ] caso moduler.import
8. [ ] acabar de definir nomenclatura/filepatterns
   - [ ] entry con module.exports
   - [ ] class
   - [ ] caso de dependencias no sería class sino import, explicar
      - [ ] mirar el edgecase de module.exports = $moduler.import que sin await lance el catch
         - [ ] lo pilla igual o se pierde?
9. [ ] empezar con css también ya, ver los casos, evitar appends prepends
10. [ ] un settings.sectionsMap iría bien
11. [ ] el settings en el www, hay que pensarlo bien
   - [ ] cosas del server no, importante
   - [ ] sectionsMap va en el www
   - [ ] que el de nodejs importe al del www sería la mejor
12. [ ] Feature-driven dev:
   - [ ] test/feature/[id].[name].js
   - [ ] settings.fdd/test.features con " y "!
   - [ ] con e.onFeature y e.onTest y e.onExport
   - [ ] que se ejecuten 1 vez con path.relative importas
13. [ ] necesito ver el arbol de ficheros y dependencias+ranking de dependencia
14. [ ] necesito poder parsear markdown (? o parser) y extraer la info de los comentarios
15. [ ] con la info de los comentarios, poder armar el foem y que pueda usarse con funciones y toString



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