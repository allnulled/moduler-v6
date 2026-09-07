# 2026/09/04, domingo

- [x] COMMIT:

> secciones como dependencias del moduler.import daba problemas porque se interpretaba como filepath + test en 421 + refrescador (creo) esparcía procesos por el so pero ahora usa executeCallback que en principio no debe

- [x] BUG: había un malentendido con las secciones en `import` como dependencias
   - [x] lo usaba como apéndice de fichero, ahora lo respeta
   - [x] test en 421
- [x] BUG/FEATURE: antes el refrescador lanzaba un comando de consola
   - [x] iba bien, pero al hacer ps -A ves todo de procesos node
   - [x] se ha pasado el execute a executeCallback para reaprovechar el mismo proceso (veremos, esto también)
- [x] BUG: con $compiler.inject.modules:
   - [x] las rutas locales no las pilla bien, las rootdir sí
   - [x] compiler.inject.modules no debería poder pillar rutas locales porque es ambiguo, porque en un...
      - [x] solucionado
      - [x] se reemplazan las `@/src/**/*.entry.js` por su `@/dist/**/*.dist.js` en el _importFile
      - [x] se crea un moduler especifico para cada módulo, con su ruta especifica, cambiando los src a dist si escaece
      - [x] también el wrapAsModuleInjection transforma los path de src+entry.js a dist+dist.js
         - [x] entonces conseguimos compatibilidad con las rutas de otros módulos, el sistema de secciones, y el cacheo
- [x] BUG: markdown hace cosa rara recursiva
   - [x] reproducir bug
   - [x] parchear
   - [x] commit
   - [x] ERA un falso error
- [x] BUG: test repetido
   - [x] reproducir bug
   - [x] parchear
   - [x] commit
   - [x] FUE breve

# 2026/09/03, sábado

- [x] BUG: caso de `$moduler.import("ok", ["ok2", "ok3"] Problema.con(parser, aqui))`
   - [x] que solo pille hasta antes de "Problema.con"
      - [x] función de `_findStringOrArrayEnd`
      - [x] función de `_findStringEnd`
      - [x] función de `_hydrateParameters`
      - [x] función de `format{Im,Ex}portParameters`

# 2026/09/03, viernes

- [x] BUG: `touchFile` no estaba pasando por el mismo try-catch al ejecutar el unit test cuando guardabas el src que cuando guardabas el test/unit:
   - [x] ahora las 2 vías pasan por el mismo try-catch

# 2026/09/03, jueves

- [x] BUG: en DevBinaryV6.Console.prototype.setProfile usaba la misma instancia de Console
   - [x] pero si 2 métodos llaman a setProfile + print con diferentes al mismo tiempo, podría haber race condition, raro, pero bueno
   - [x] ahora crea una instancia nueva al vuelo
   - [x] pensado para hacer print y ya
- [x] FEATURE: mejorado colors para que sea compatible con browser (en Chrome al menos) solamente el prototype.style
- [x] En curso varias APIs pero del starter

# 2026/09/02, miércoles

- [x] La API de los Filecom
   - [x] que consiste en comandos cuya entrada es 1 fichero que haces *touch* en 1 carpeta concreta y te saca la salida en otra carpeta concreta.
      - [x] para programas cuya entrada pueda basarse en 1 fichero/texto
      - [x] de uso puntual (o no) pero sobre todo que
      - [x] preferirías que no se perdieran en el tiempo
      - [x] típicos programitas que te ves repitiendo a menudo
      - [x] con esta API puedes taxonomizarlos fácilmente y acumularlos para ocasiones futuras
   - [x] puedes ampliarlos con más `@/dev/filecom/**/command.js`
   - [x] puedes llamarlos (desde el loop) simplemente
      - [x] guardando ficheros en `@/dev/filecom/${ruta a comando}/in/` y
      - [x] típicamente construir la salida en su `./out/${input}`
- [ ] starter:
   - [ ] diseño de lenguaje de types

# 2026/09/01, martes

- [x] BUG: los `@/test/**/*` dejan de estar en ignore
   - [x] cuando CTRL+S un `@/test/**/*.test.js`, ahora se ejecuta con delete require.cache previo.
- [x] FEATURE: los `e.onVersionate.js`
   - [x] de estar en un touchFile y haber un e.onVersionate.js y haber entries en el dir y coincidir nombre de fichero con clave en objeto retornado
      - [x] crea un fichero en "@/dist/${subpath}/v/${id}.${version}.dist.js" con la versión especificada
      - [x] el e.onVersionate.js solo tiene que hacer un module.exports = function que retorne un objeto cuyas claves coincidan con el nombre de la entry
      - [x] y el touchFile ya se ocupa de sobreescribir la versión automáticamente

# 2026/08/31, lunes

- [x] BUG: el setProfile cambia la instancia
   - [x] Pues no. Tiene que crear una instancia, que luego será borrada en por el collector


















-----

De aquí para abajo, está en REVISABLE:

- [ ] FEATURE: /starter/ El Checker.createCheck.
   - [ ] con los check(x,label).{is,has}.not?|its etc.
- [ ] FEATURE: /starter/ El Asserter.createAssert.
   - [ ] con el assert(condition, message|data)
   - [ ] que el assert se entienda con el checker, para poder hacer:
   ```js
   const it = assert.check(100);
   it.is.number();
   it.is.lessThan(200);
   it.is.greaterThan(50);
   it.is.not.string();
   it.is.not.function();
   it.is.not.object();
   it.is.not.array();
   it.is.not.undefined();
   ```
- [ ] FEATURE: /starter/ El ErrorHandler.from.
   - [ ] que el errorHandler se entienda con el AssertionError
   ```js
   // El que tengo claro de momento de todos es este:
   ErrorHandler.from(error)
   .silence()
   .print(0 /* silencia: evitar mejor */)
   .print(1) // printa normal
   .print(2) // debug en profundidad
   .print(3) // warn: error de severidad local
   .print(3) // global: error de severidad global
   .print(4) // critical: 
   .debug() // 
   .warn()
   .rethrow(); // Hace un print pero más profundo
   // Todos estos, están en duda, porque no sé si valen la pena
   ErrorHandler.classes.register(class AssertionError extends Error {
      constructor(message) {
         super(message);
         this.name = "AssertionError";
      }
   });
   // O lo que sería lo mismo:
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("assertion error"));
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("type error"));
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("syntax error"));
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("timeout error"));
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("async operation error"));
   ErrorHandler.classes.register(ErrorHandler.createErrorClassByName("validation error"));
   ErrorHandler.classes.registerErrorName(ErrorHandler.createErrorClassByName("validation error"));
   ErrorHandler.from(error).severity(0).rethrow();
   ErrorHandler.from(error).severity(1).rethrow(); // shortcut de debug
   ErrorHandler.from(error).severity(2).rethrow(); // shortcut de debug
   ErrorHandler.from(error).severity(3).rethrow(); // shortcut de debug
   ErrorHandler.from(error).switchByClass([
      "Error de inicialización": ErrorHandler.classes.InitializationError,
      "Error de aserción": ErrorHandler.classes.AssertionError,
      "Error de discriminación": ErrorHandler.classes.DiscriminationError,
      "Error de tipo": ErrorHandler.classes.TypeError,
      "Error no identificado": null,
   ]);
   ErrorHandler.from(error).switchByFunction([
      ["Error de inicialización", it => it instanceof ErrorHandler.classes.InitializationError],
      ["Error de aserción", it => it instanceof ErrorHandler.classes.AssertionError],
      ["Error de discriminación", it => it instanceof ErrorHandler.classes.DiscriminationError],
      ["Error de tipo", it => it instanceof ErrorHandler.classes.TypeError],
      ["Error no identificado", null],
   ]);
   ```
- [ ] FEATURE: /starter/ El Tracer.createTrace

# 2026/08/27, miércoles

- [x] FEATURE: comando «devbin bundle node module --of picomatch --to "@/src/www/external/picomatch/picomatch.entry.js"»
   - [x] con la opción de --asSrc
   - [x] con la opción de --asWww
   - [x] con la opción de --asDist para generar los distribuibles de asSrc o asWww
   - [x] con la opción de --to para otras salidas
- [ ] LIBRARY: el starter se provee de una clase SimpleRegistry
   - [ ] SimpleRegistry.create
   - [ ] SimpleRegistry.prototype.define
   - [ ] SimpleRegistry.prototype.find
   - [ ] SimpleRegistry.prototype.modify
   - [ ] SimpleRegistry.prototype.remove
   - [ ] Tests en 409 porque Registry se va a reutilizar en módulos nativos del ModulerV6
- [x] BUG: detectado un bug cuando haces _cloneForFile + compiler.rootdirOf + compiler.moduler.rootdirOf dan resultados diferentes
   - [x] neutralizar esto
   - [x] óptimo un getter setter en compiler para que actúe sobre moduler siempre
   - [x] mirar si pasa tests así
   - [x] el CompilerV6 estaba haciendo una cosa rara en lugar de delegar al ModulerV6.prototype.rootdirOf
- [x] FEATURE: el método $moduler.toolkit.{normalizeParameters,normalizeOptions,normalizeObject}
   - [x] permite normalizar 1 objeto (arguments[0])
   - [x] mediante la especificación de otro objeto (arguments[1])
      - [x] cuyas propiedades permiten otro objeto con:
         - [x] default: Function | any - permite especificar el valor si esa propiedad no existe
         - [x] validate: Function - permite especificar un callback de validación que debe de lanzar error por sí mismo
         - [x] format: Function - permite especificar un callback de formateo
   - [x] este es el método convencional para inicializar parámetros en métodos privados
      - [x] para saber más, consultar «Guía de programación de funciones para DevBinaryV6»
   - [x] tests en 408
- [ ] BUG: que el synchronizeSplittableMethod no genere recursividad
   - [ ] el bug sucede porque al sincronizar escribe sobre el splittable, y el splittable sobre los demás
   - [ ] si el mute/unmute hiciera bien su función, no pasaría nada
   - [ ] pero lo que sucede es que: entra, mutea, procesa, ESCRIBE EN splittable Y SE PROPAGA, desmutea
      - [ ] el primer fichero de dentro de la recursión, ese lo coge bien
      - [ ] porque está muteado aún
      - [ ] pero en tanto que ese se termina, desmutea
      - [ ] el desmute afecta a toda la cadena recursiva, que ahora está volviendo del final al principio
      - [ ] entonces el segundo ya no tiene el mute
      - [ ] ESTO NOS SUGIERE QUE:
         - [ ] habría que hacer una cola de supplicants
         - [ ] cuando se borra el último de la cola y esta se queda vacía de supplicants, se puede desmutear el patrón
         - [ ] pero si la cola tiene alguno, se mantiene

# 2026/08/19, miércoles

- [x] BUG: la indentación de cuando splittable a métodos y viceversa está descuajeringando un poco el código
   - [x] de clase a método tienes que desindentarlo 1
   - [x] de método a clase tienes que indentarlo 1 inclusive el nombre

Mientras tanto, paralelamente...:

- [ ] Estamos con el moduler-v6-starter:
   - [ ] El Filesystem por Drivers para Nodejs de momento
   - [ ] El Tracer como muestra integrado con el Filesystem de Nodejs
   - [ ] La Database por sobre de Filesystem y JSONL
   - [ ] Los Types por sobre de Database



# 2026/08/25, martes