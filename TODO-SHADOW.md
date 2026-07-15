Queremos que se puedan renderizar plantillas con lenguaje tipo TJS
  - directamente desde el CompilerV6.prototype.compile
  - directamente desde el $compiler.inject.source
  - que en un paso entre el readPath y el compileAs:
    - parsee el código como plantilla
    - y si encuentra algo, que lo resuelva
  - detalles importantes:
    - solo funciona en js+compiler, no en css+moduler ni js+moduler
      - el css no porque
        - abres vulnerabilidades en potencia que no te interesan
        - abres complejidad en potencia que no te interesa
      - el js+moduler tampoco porque
        - abres complejidad en potencia que no te interesa
        - más código boilerplate en runtime
        - más complejidad añadida en runtime
        - menos performance en runtime
        - funcionalidades que abren más superficie de vulnerabilidad
        - funcionalidades que tampoco son primordiales en runtime
        - funcionalidades que realmente no se apreciarían/destacarían/explorarían mucho en runtime
        - más flexibilidad pero
        - más código dormido
        - más legacy
        - aunque podemos bajar estas funciones al moduler
        - yo el runtime lo ensuciaría lo menos posible
        - y es una feature muy potente
        - pero que explotarla en runtime en vez de en devtime no es su mejor posición
    - solo funciona en devtime/compiler-v6, no runtime/moduler-v6
      - esto e

Hay algunos fallos menores acumulados:

- Sections, retirarlo del analizer, mala suerte tú, files y gou
- El parser duplica el match en outer y en text
- El parser duplica contenidos en token y en formatter
- Faltan traceos de métodos dinámicos (estáticos mala suerte tú)
  - En el moduler/compiler y devbinary creo que no tiene ni 1



------






- [ ] Otro TJS a mano
  - [ ] Sin tantos métodos
    - [ ] solo el que interesa
  - [ ] Es un paso previo al $compiler.inject.source
    - [ ] Esto significa que puede renderizar dinámicamente en la plantilla '$compiler.inject.source' y esperar que funcione igualmente
    - [ ] Sobre el análisis estático, ahora mismo me da igual
  - [ ] Que permita bucles, condicionales, bloques y valores con await
  - [ ] Funciona con el método $compiler.inject.template
    - [ ] No funciona con moduler de momento
  - [ ] Tiene que soportar el paso de parámetros a la plantilla

- [ ] Faltan:
  - [ ] $compiler.inject.template
  - [ ] /*@prepends:./file.css*/
    - [ ] adjunta un css antes del script
  - [ ] /*@appends:./file.css*/
    - [ ] adjunta un css después del script
    - [ ] es lo mismo que @injects, así que puede caer en revisión
  - [ ] /*@inserts:./file.css*/
    - [ ] inyecta un css o texto cualquiera en el lugar donde se le indique
  - [ ] PERO, todo esto debe caer en revisión antes
    - [ ] porque a la larga, el css va a requerir de un EJS o alguna cosa
    - [ ] para reaprovechar ya no código css, porque no lo permite el lenguaje,
    - [ ] pero sí código escrito, 1 vez para diferentes casos.
    - [ ] con EJS, todo estaría resuelto, de una forma u otra

- [ ] En moduler-v6-starter
  - [ ] Que el loop+touch funcione con dist - sin compilación intermedia
  - [ ] Que el $moduler.{export,import} funcione conforme:
    - [ ] Que las rutas de ficheros importadas como file o dependencies:
      - [ ] si empiezan por @/src se pasan a @/dist
      - [ ] si terminan por .entry.js se pasan a .dist.js
  - [ ] Que el build.js haga un copyDir del @/src/www al @/dist/www