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