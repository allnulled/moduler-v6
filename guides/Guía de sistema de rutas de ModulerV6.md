# Guía de sistema de rutas de ModulerV6

En este documento se explicarán:

- Las diferentes formas de resolución de rutas
- Las variables clave de la API de ModulerV6 en la resolución de rutas
- Los métodos clave de la API de ModulerV6 en la resolución de rutas
- Algunos consejos relacionados

## Índice

- [Guía de sistema de rutas de ModulerV6](#guía-de-sistema-de-rutas-de-modulerv6)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Métodos de resolución de rutas](#métodos-de-resolución-de-rutas)
  - [Variables de resolución de rutas](#variables-de-resolución-de-rutas)
  - [Otras features relacionadas](#otras-features-relacionadas)
    - [Los imports y exports del ModulerV6 permite ignorar ficheros que no se encuentran](#los-imports-y-exports-del-modulerv6-permite-ignorar-ficheros-que-no-se-encuentran)
  - [Consejos relacionados](#consejos-relacionados)
    - [Cuidado con las rutas relativas en módulos importados](#cuidado-con-las-rutas-relativas-en-módulos-importados)
    - [Casos de uso para cada tipo de ruta](#casos-de-uso-para-cada-tipo-de-ruta)
    - [Patrones que se van creando](#patrones-que-se-van-creando)

## Introducción

Las rutas en una aplicación `ModulerV6/CompilerV6/DevBinaryV6` tienen unas nomenclaturas concretas gracias a una serie de métodos concretos que usan una serie de variables concretas.

Este documento pretende esclarecer este contexto.

## Métodos de resolución de rutas

- Métodos de resolución de rutas de `ModulerV6`:
   - `ModulerV6.prototype._joinPaths`:
      - es el método de resolución de rutas de más bajo nivel
      - los demás métodos beben de este
      - los casos que discrimina son:
         1. Ruta por protocolo
            - si `subpath.includes("://")`
         2. Ruta absoluta estilo Windows
            - si `subpath.includes(":\\")`
            - si `subpath.includes(":/")`
            - si `subpath.startsWith("\\\\")`
            - si `subpath.startsWith("//")`
         3. Ruta absoluta estilo Linux
            - si `subpath.startsWith("/")`
         4. Ruta relativa al basedir
            - si `subpath.startsWith("./")`
         5. Ruta relativa al basedir pero directorio superior
            - si `subpath.startsWith("../")`
         6. Ruta relativa al rootdir
            - si `subpath.startsWith("@/")`
         7. Cualquier otra ruta
            - se administrará tal cual ha venido
   - `ModulerV6.prototype.basedirOf`
      - Usa `_joinPaths` por debajo
      - Devuelve una ruta que empieza con `./` si puede, o si no tal cual.
      - Depende de la variable `ModulerV6.prototype.basedir` que se puede cambiar con `ModulerV6.prototype.setBasedir`
   - `ModulerV6.prototype.rootdirOf`
      - Usa `_joinPaths` por debajo
      - Devuelve una ruta que empieza con `@/` si puede, o si no tal cual.
      - Depende de la variable `ModulerV6.prototype.rootdir` que se puede cambiar con `ModulerV6.prototype.setRootdir`
   - `ModulerV6.prototype.normalizationOf`
      - Usa `_joinPaths` por debajo
      - Devuelve una ruta completa si puede, o si no tal cual.
- Métodos de resolución de rutas de `CompilerV6`:
   - `CompilerV6.prototype.rootdirOf`
   - `CompilerV6.prototype.basedirOf`
   - `CompilerV6.prototype.normalizationOf`
   - Estos métodos deberían depender directamente de `CompilerV6.prototype.moduler.{rootdir,basedir}`
      - Pero ahora mismo funcionan autónomamente entre ellos
      - Si usas `CompilerV6.prototype.{setBasedir,setRootdir}` para cambiar
         - deberían funcionar igualmente porque estos 2 métodos los sincronizan
         - la sincronización es mutua, si usas el `setBasedir` del `ModulerV6.prototype` se sincroniza el `ModulerV6.prototype.compiler` también.
- Métodos de resolución de rutas de `DevBinaryV6`:
   - `DevBinaryV6` no tiene métodos de resolución de rutas
   - Puedes usar `DevBinaryV6.prototype.{compiler,moduler}` para conseguir acceso a los anteriores

## Variables de resolución de rutas

- `ModulerV6.prototype.rootdir`
- `ModulerV6.prototype.basedir`

Principalmente. Ahora mismo, y temporalmente, también son relevantes `CompilerV6.prototype.{rootdir,basedir}`.

## Otras features relacionadas

A continuación se mencionan features que pueden tener relación.

### Los imports y exports del ModulerV6 permite ignorar ficheros que no se encuentran

- Una feature relacionada, lateralmente, con las rutas, es el prefijo de rutas `!`
   - que permite ignorar si un fichero no existe
   - y devolver `undefined` en lugar de interrumpir la ejecución
   - pero esto solo afecta a `ModulerV6.prototype.{import,export}`
      - sin embargo, (algunos, deberían todos), contemplan que ese `!` esté o no al principio de la ruta
      - es compatible con todos los tipos de ruta, en principio: `./` `../` `@/` y demás.
      - estos métodos ya entienden (deberían) que ese `!` no es parte de la ruta

## Consejos relacionados

A continuación algunos consejos relacionados con las rutas en el momento de codificar.

### Cuidado con las rutas relativas en módulos importados

- Cuando usas `ModulerV6.prototype.{import,export}` siempre vas a atacar al `ModulerV6.prototype.{rootdir,basedir}`.
- El problema cuando estás en el fichero importado es que:
   - `$moduler !== ModulerV6.globalInstance`
      - Porque en el fichero importado, se está suplantando externamente al `$moduler` global por otro localizado donde el archivo
      - *Y esto se hace únicamente para poder usar rutas relativas*
      - Y ese `$moduler` es una nueva instancia de `ModulerV6` diferente a la global `ModulerV6.globalInstance`
      - Que tiene el `this.basedir` modificado para poder utilizar rutas que empiecen por `"./"` y se puedan referir al fichero actual
- Por tanto, el consejo es el siguiente:
   - El `$moduler` en ficheros importados hay que usarlo superficial y esporádicamente
      - Siempre mencionarlo en el primer nivel, nunca dentro de funciones
         - Para que el Garbage Collector no bindee la instancia `$moduler` a funciones definidas en el fichero
         - Esto causaría retenciones en memoria de instancias de `ModulerV6` localizadas
         - Lo mismo aplica a usar:
            - `$moduler`
            - `module`
            - `exports`
         - Esto está sucediendo en los ficheros:
            - `ModulerV6.prototype._importFile`
            - `ModulerV6.prototype._importFactory`
            - Esto es lo único que se inyecta localmente en el script
            - Y si no fuera por las rutas relativas, solo serían `module` y `exports`
   - Si quieres usarlo dentro de funciones:
      - O usas el `ModulerV6.globalInstance` dentro de las funciones directamente
      - O te guardas el `$moduler.basedir` local en una variable y lo combinas con `ModulerV6.globalInstance`
      - Así te curas de tener instancias `ModulerV6` duplicadas solo por tener el `basedir` adecuado al fichero concreto
- Que en realidad no es tan grave
   - Porque el `prototype` ya hace eficiente la reutilización de código
      - Pero no todo
      - Y mejor no fiarse porque las cosas pueden ir cambiando
   - Pero que ya que vas a usarlo, que sepas el caso concreto por el que se está polucionando el scope local
      - `module` y `exports` tienen sentido para poder comunicarse con el que llama en tiempo real
      - pero `$moduler` solo es para que puedas importar más cómodamente con el `./` y el `../`
         - y esa comodidad tiene 1 coste en memoria
         - que JS puede disimular elegantemente con la sobreescritura de identificadores de variables en herencia de ámbitos
         - pero que sigue estando ahí
         - se barajó la opción de usar `local$moduler.import` para poder usar el `./` y el `../`
            - pero pareció muy ruidoso ese `local` extra
            - y en el `compiler.inject.source` habría otras casuísticas también
            - y el `./` y el `../` no tenían sentido entonces
            - y al final se optó por esta opción, elegante gracias a JS
            - pero que tiene este detalle técnico de espacio en memoria y la garbage collection
            - son casos menores, pero más vale entenderlo que encontrárselo tardíamente
   - Y la regla es esa:
      - El `$moduler` solo en superficie
      - Dentro de funciones, mejor `ModulerV6.globalInstance`

### Casos de uso para cada tipo de ruta

Aunque parezca que es una decisión libre usar una ruta relativa o enraizada o absoluta, en el flujo de fabricación del código ves que no lo es tanto. Sí, va a funcionar en cualquier caso, pero en algunos tiene más sentido una vía que otra.

Esto es lo que he visto:

- Cuando estás importando/inyectando un fichero que cae **dentro de la propia API** que estás escribiendo:
   - Prefieres usar `./` o `../`
   - Porque ya lo asocias con desarrollo localizado en el directorio actual o superior
   - Desarrollo interno
- Cuando estás importando/inyectando un fichero que cae **fuera de la propia API** que estás escribiendo:
   - Prefieres usar `@/` o rutas absolutas
   - Porque ya lo asocias con desarrollo localizado en el proyecto en general
   - Desarrollo externo

### Patrones que se van creando

Si vas siguiendo las líneas, te irás encontrando que:

- Los imports de los ficheros que se usan en el browser siempre siguen este patrón:
   - `@/dist/www/**/*`
   - también `./` y `../`
- Los imports de los ficheros que se usan en el nodejs pueden tener más patrones:
   - `@/dist/www/**/*` sí
   - y también `./` y `../`
   - pero también `@/**/*`

Esta sutil repetición de patrón de rutas es normal e intencional:

> El `dist/www` es la línea de la **seguridad informática aprendida** en el desarrollo web. No es redundante especificar, en un desarrollo híbrido de cliente web + servidor web, una ruta diferente para los módulos del cliente web.

Aunque sea pesado y repetitivo, con esto consigues que:

- Nada más viendo un código fuente
   - ya sabes que está tirando de *dependencias web*
   - y no de *dependencias os*

Y esto es importante, porque:

- No quieres que un cliente web:
   - ejecute código del sistema
   - ni siquiera que veo el código del sistema
- No quieres que un desarrollador:
   - pierda tiempo pensando si este código va en un lado u otro
   - pierda tiempo analizando/hilando si está hablando desde el cliente o desde el servidor
   - tenga un tooling/builder diferente para cada entorno
   - pierda tiempo pensando en las rutas
   - tenga código distinto entre cliente y servidor
      - esta es la razón más clave porque:
      - todo lo del cliente web, el servidor web lo tiene en la misma ruta:
         - en `@/dist/www`
         - el cliente web también lo tiene ahí
         - esto ahora mismo se está consiguiendo gracias a [`refrescador`](https://github.com/allnulled/refrescador)
            - `--serve` y `--staticPath`
            - El servidor estático sirve el directorio: `serve: this.devbin.compiler.fullpathOf("@/dist/www")`
            - El refrescador lo enruta desde esta url relativa: `staticPath: "dist/www"`
            - De esta forma, consigues que el `@/dist/www` en browser apunte al mismo directorio del root del proyecto.
               - Y en el código, la ruta siempre se ve igual
               - Aunque según el entorno lo importe con `fetch`, o según, con `require`.
               - Pero el nombre de la ruta es el mismo

Por todo esto es que `"@/dist/www/"` se vuelve un patrón muy repetido en este tipo de aplicaciones, pero si comprendes todo esto, comprendes que es mucho más interesante sobreespecificar esta subruta, que tener:

- Tener el `dist/www/` mezclado con el `@/`
   - porque podría hacer que `@/` en entorno web signifique `dist/www`
      - pero tendrías rutas mezcladas, sería un caos, aquí es nosequé, allí es nosequé
- Símbolos extra que dan por hecho más cosas de las básicas
   - porque podría poner un `~/` para ir al `dist/www`
   - pero es prematuro, un shortcut tan específico tan tempranamente
   - puede que con el uso, se incorpore
- Otras soluciones quizá

Por todo esto, el `@/dist/www/` es un patrón muy concurrido, y tiene que verse normal si se entiende todo esto.