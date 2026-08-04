# Guía rápida del moduler-v6-starter

## Índice

- [Guía rápida del moduler-v6-starter](#guía-rápida-del-moduler-v6-starter)
  - [Índice](#índice)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [El loop](#el-loop)
  - [La propagación](#la-propagación)
    - [Es una estrategia para minimizar compilaciones](#es-una-estrategia-para-minimizar-compilaciones)
    - [Evita la propagación horizontal](#evita-la-propagación-horizontal)
    - [Permite propagación horizontal por un fichero solamente](#permite-propagación-horizontal-por-un-fichero-solamente)
    - [Criterio para crear directorios al representar árbol de inyecciones](#criterio-para-crear-directorios-al-representar-árbol-de-inyecciones)
    - [Coincidencia ontológica](#coincidencia-ontológica)
    - [Explicación del criterio estricto](#explicación-del-criterio-estricto)
    - [Uso final del criterio estricto](#uso-final-del-criterio-estricto)
  - [El evento touch](#el-evento-touch)
  - [Ficheros y directorios especiales](#ficheros-y-directorios-especiales)
    - [Ficheros de la API de DevBinaryV6](#ficheros-de-la-api-de-devbinaryv6)
    - [Ficheros de comandos de DevBinaryV6](#ficheros-de-comandos-de-devbinaryv6)
    - [Ficheros de entrada](#ficheros-de-entrada)
    - [Ficheros de eventos del touch](#ficheros-de-eventos-del-touch)
    - [Ficheros de APIs de terceros](#ficheros-de-apis-de-terceros)
    - [Ficheros de distribución](#ficheros-de-distribución)
    - [Ficheros de tests](#ficheros-de-tests)
    - [Ficheros de desarrollo](#ficheros-de-desarrollo)

## Requisitos

- node, npm y git
- el `devbin` de `moduler-v6` por línea de comandos no es necesario

## Instalación

Si tienes instalado `devbin` globalmente:

```sh
# si empiezas en un directorio fresco y quieres que haga la comprobación:
devbin new project --from . 
# o este comando que simplemente se asegura que tengas todos los ficheros o te los crea:
devbin ensure core --from . 
```

Si no tienes instalado `devbin` globalmente:

```sh
git clone https://github.com/allnulled/moduler-v6-starter.git .
npm install
```

## Uso

Si tienes instalado `devbin` globalmente:

```sh
devbin loop
```

Si no tienes instalado `devbin` globalmente:

```sh
./dev/run.js loop
```

## El loop

De ahí:

- trabajas editando el `src/**/*` pero pensando en el `dist/**/*`
- cada edición de fichero en `src` genera un *evento touch*
- hay una *propagación* al final de cada *evento touch*
- una *propagación* consiste en:
   - hacer un *evento touch* en el `<dirname>.entry.js` del directorio actual, si existe
   - hacer un *evento touch* en todos los `*.entry.js` del directorio superior
   - esta propagación se repite hasta la raíz del proyecto o `CompilerV6.prototype.rootdir`
- un *evento touch* hace lo siguiente:
   - si no es un `*.entry.js`, continúa la *propagación*
   - cada `src/**/*.entry.js` genera su homólogo en `dist/**/*.dist.js` nuevamente
      - en este paso se da la compilación
   - cada `src/**/*.entry.js` genera su homólogo en `test/unit/src/**/*.test.js` solo si no existe
   - cada `src/**/*.entry.js` ejecutará su homólogo en `test/unit/src/**/*.test.js`
      - en este paso se da la ejecución de test unitario de una `*.entry.js`
- por otro lado, las inyecciones con `$compiler.inject.source`
   - son escuchadas por el `devbin loop` también
      - concretamente es una opción de [`CompilerV6.prototype.compile(file, { dontCreateOnInjectSource: true })`](https://github.com/allnulled/moduler-v6/blob/main/src/CompilerV6/prototype.compile.js)
         - es decir, en `CompilerV6.CompilationProcess.prototype.dontCreateOnInjectSource`
         - que en el [`CompilerV6.CompilationProcess.prototype._defaultProcessData`](https://github.com/allnulled/moduler-v6/blob/main/src/CompilerV6/CompilationProcess/_defaultProcessData.js) se inicializa como `true` por defecto
      - pero que cuando se usa desde el `touchFile` ya se pasa el flag a `false`
         - esto sucede en el fichero [`DevBinaryV6.Utils.prototype.touchFile`](https://github.com/allnulled/moduler-v6/blob/main/src/DevBinaryV6/Utils/prototype.touchFile.js)
         - que dentro llama a [`DevBinaryV6.Utils.prototype.compileDistribuiblesOf`](https://github.com/allnulled/moduler-v6/blob/main/src/DevBinaryV6/Utils/prototype.compileDistribuiblesOf.js)
   - cuando el fichero al que apuntan no exista, va a intentar crearlo automáticamente
      - la única condición que piden es que la carpeta donde van exista y tengas permisos suficientes para crearlo
      - aquí es donde los prefijos, sufijos e infijos del método `CompilerV6.prototype._createDefaultInjectedFile` tienen sentido:
         - porque con cierto nombre de fichero ya nos generará una plantilla específica
         - `prototype.` (prefijo solo) = miembro prototipo de clase
         - `static.` (prefijo solo) = miembro estático de clase
         - `async.` | `.async` | `.async` = método asíncrono
         - `sync.` | `.sync` | `.sync` = método síncrono
         - `.class` (sufijo solo) = clase
         - es posible combinar `prototype.` o `static.` con `.class` y la plantilla seguirá adaptándose al caso concreto

## La propagación

### Es una estrategia para minimizar compilaciones

Es una estrategia para minimizar compilaciones.

- Ponle que editas `@/src/main/fun1.js`
   - Se hace *evento touch* en el `@/src/main/main.entry.js`
   - Se hace *evento touch* en todos los `@/src/*.entry.js` y `@/*.entry.js`
   - Pero no se hace en todos los `@/src/main/*.entry.js`

### Evita la propagación horizontal

Esto es para evitar la propagación horizontal. La verdad que ha ido saliendo, no lo tenía planificado, pero parece un cambio bastante natural:

- Solo triggear el touch del `<dirname>.entry.js`
- No usar `entry.js` o `index.entry.js`
- No triggear todos los `*.entry.js` del directorio

### Permite propagación horizontal por un fichero solamente

Resuelve:

- Permitir una opción para triggear todo el directorio, al menos `<dirname>.entry.js`
- Permitir que otros `*.entry.js` puedan convivir en el mismo directorio
   - Sin ser llamados todos a compilación automáticamente
   - Lo cual en ficheros con varios `*.entry.js` puede ser mucho más de lo necesario

### Criterio para crear directorios al representar árbol de inyecciones

En esta explicación y ejemplo se pretende responder a *¿cuándo creo un nuevo directorio representando un árbol de inyecciones, y cuándo no?*.

Hablamos de directorios que responden a `$compiler.inject.source` y no a `$moduler.{export,import}`.

### Coincidencia ontológica

La regla que uso yo al menos un poco es la siguiente:

- Un nuevo directorio debería coincidir con:
   - En OOP pura:
      - Una propiedad
      - Un método o función
      - Una clase
      - Un wrapper de los anteriores - aquí el `*.entry.js` también ayuda
      - Un string - en el caso de los `$compiler.inject.string`
   - En software de guerrilla puedes abrirte también a:
      - Un bloque o sentencia de código
      - Un fragmento menor de código

### Explicación del criterio estricto

La OOP pura es lo más bonito/eficiente que se puede conseguir ahora mismo con JavaScript, y es para lo que se orientaría mejor.

- Entonces en OOP pura lo que dices al crear 1 nuevo directorio es que:
   - hay 1 nueva entry para 1 clase o en su defecto una propiedad de clase
   - por tanto, hay un fichero antes con el nombre de este directorio:
      - sea `prototype.newProperty.js`
      - sea `static.newProperty.js`
      - con sus variaciones de `sync,async` opcionales
      - y desde ahí se está inyectando un `newProperty/newProperty.class.js`
      - pero como coincide con el directorio, se usa el `newProperty/newProperty.entry.js`
         - que por dentro sí inyectará al `newProperty/newProperty.class.js`
   - un nuevo directorio está diciendo implícitamente, con buenas prácticas máximas digo, que:
      - hay un `./{prototype,static}.newProperty.{class,async,sync}?.js`
         - la propiedad de la clase
         - este fragmento engancha algo como propiedad de clase
      - hay un `./newProperty/newProperty.{class,async,sync}?.js`
         - el valor de la propiedad de la clase
         - este fragmento es la definición pura de la clase
         - contiene estrictamente la definición de la clase
      - hay un `./newProperty/newProperty.entry.js`
         - el wrapper del valor de la propiedad de la clase
         - este fragmento es la definición exportable de la clase

### Uso final del criterio estricto

Durante el desarrollo de clases recursivas, se ve natural hacer:

- un `static.<ClassName>.class.js` porque normalmente las clases son propiedades estáticas
   - estás diciendo: es una propiedad estática, que a su vez, es una clase de nombre `ClassName`
   - este fichero conecta la propiedad de la clase con la otra clase diferente
   - el nombre se repite como propiedad y como nombre de la clase por propósito de mejor debug y reflexión interna estática
- un `<ClassName>/<ClassName>.class.js` para la definición de la clase puramente
   - aquí es el código de la clase y nada más
- un `<ClassName>/<ClassName>.entry.js` para la definición con exportación propia
   - no tiene por qué exportar la clase tal cual, puede hacer de mediador y retornar otras formas, como:
      - llamada a función inmediata síncrona con cabecera de exportación (compatible con `CompilerV6`)
      - retorno de llamada a `$moduler.export` o `$moduler.import` (compatible con `ModulerV6`)
      - exportación por `module.exports` (compatible con `ModulerV6`)
      - exportación por `export.<prop>` (compatible con `ModulerV6`)
      - exportación por `return` (compatible con `ModulerV6`)

## El evento touch

El evento touch tiene su origen en [`DevBinaryV6.Utils.prototype.touchFile`](https://github.com/allnulled/moduler-v6/blob/main/src/DevBinaryV6/Utils/prototype.touchFile.js). Ahí se puede ver el proceso

## Ficheros y directorios especiales

A continuación se habla de los ficheros y directorios que tienen una importancia especial.

Muchos de ellos se corresponden con ficheros o carpetas que genera el comando `devbin ensure core`.

Esta lista se clasifica por grupos funcionales.

En los proyectos `moduler-v6-starter` hay una serie de ficheros y carpetas.

### Ficheros de la API de DevBinaryV6

Estos 2 ficheros permiten acceso por `node` o `cmd` a la api de `DevBinaryV6` o `devbin`:

- `@/dev/run.js`
   - para ejecutar `devbin` localmente
   - se usa así: `./dev/run.js path to command --arg0 val0`
- `@/dev/bin.js`
   - instancia `DevBinaryV6` del proyecto
      - la API de prototype de DevBinary para el proyecto concreto
   - se importa con el `require` de nodejs
      - puede usarse `$moduler.{export,import}` también
         - porque aceptan `module.exports` como fórmula de modulación

### Ficheros de comandos de DevBinaryV6

Este conjunto son los comandos disponibles en el `cmd` para `devbin ruta a comando --arg0 arg0`:

- `@/dev/bin/**/command.js`
   - los comandos disponibles
   - la única condición es que tengan un `command.js` al final

### Ficheros de entrada

Las entradas `@/src/**/*.entry.js` son ficheros que se compilan al `@/dist/**/*.dist.js`.

A continuación se explican los patrones y sus características:

- `@/src/**/<dirname>.entry.js`
   - los ficheros de entrada por directorio, sensibles a propagación horizontal
   - significa que si un `touch` del mismo directorio se propaga, este fichero `entry` sí se compila
      - en cambio, los otros `entry` del directorio no
      - de esta forma, te ahorras compilar todos los `entry` del directorio
      - consiguiendo que muchos `entry` puedan convivir en un mismo directorio
         - sin saturar los tiempos de la propagación de la compilación
         - pero permitiendo cierta propagabilidad también
- `@/src/**/*.entry.js`
   - los ficheros de entrada
   - estos ficheros representan módulos programáticos/APIs modulables
      - en el mejor de los casos, con `ModulerV6` donde quedaría siempre algo como:
      - `module.exports = $moduler.export("#Sección/a/api", ["dep1","#sección/1"], async function([dep1,sec1]) {});`
   - son sensibles al `devbin {touch,loop}`
   - en el `touch` se compila su `@/src/**/*.entry.js` al `@/dist/**/*.dist.js`
   - estos ficheros propagarán los eventos del directorio de:
      - `e.onDistribute.js`
      - `e.onTouch.js`
      - `e.onTestFeature.js`
- `@/src/www/**/*`
   - los ficheros de desarrollo web
   - los `@/src/www/**/*.entry.js`: se compilan al `@/dist/www/**/*.dist.js`
   - los `@/src/www/**/*.entry.css`: se compilan al `@/dist/www/**/*.dist.css`
   - los `@/src/www/**/*.html`: se copian al `@/dist/www/**/*.html`
   - lo demás, tienes que copiarlo a mano al `@/dist/www`

### Ficheros de eventos del touch

Estos son los ficheros de eventos inyectables del `{touch,loop}`:

- `@/src/**/e.onDistribute.js`
   - evento inyectable
   - se ejecutará después de ejecutar el test unitario del `entry`
      - cuando ya se ha compilado el distribuible correspondiente
   - debes hacer `module.exports` de una `Function`
   - la función recibe el contexto en el primer parámetro
   - tipicamente, aquí vas a querer:
      - exportar el `*.dist.js` con `DevBinaryV6.Utils.prototype.copyFile`
      - quizás hacer alguna tarea extra
- `@/src/**/e.onTouch.js`
   - evento inyectable
   - se ejecutará antes de propagar el evento touch al directorio superior
   - debes hacer `module.exports` de una `Function`
   - la función recibe el contexto en el primer parámetro
- `@/src/**/e.onTestFeature.js`
   - evento inyectable
   - se ejecutará después del `e.onDistribute.js` de haberlo.
   - la función recibe el contexto en el primer parámetro
   - la función debe devoler un `Array<String>` con selectores para el método `DevBinaryV6.Utils.prototype.matchesFileWithSimpleSelector`
      - el `String` debe estar incluido en el `filename` (no el `filepath`, ojo)
      - permite `startsWith` poniendo `^` al principio
      - permite `includes` en todos los demás casos

### Ficheros de APIs de terceros

Las APIs de terceros tienen unos directorios muy concretos, y es, dentro de la carpeta de distribución, estos 2 lugares:

- `@/dist/src/lib/**/*.js`
   - librerías de terceros para nodejs
   - aquí se copian las APIs del `DevBinaryV6,ModulerV6,CompilerV6,Refrescador` con el `devbin ensure core`
- `@/dist/www/lib/**/*.js`
   - librerías de terceros para web o ambivalente (web y nodejs irían aquí también)
   - aquí se copia la API del `ModulerV6` con el `devbin ensure core`

### Ficheros de distribución

Los ficheros de distribución están pensados para poder usarse en runtime. Pero recordar que hay 2 runtimes principales: web y nodejs. Por eso:

- `@/dist/src/**/*.dist.js`
   - ficheros de distribución o de entradas compiladas para nodejs
   - aquí van a parar todos los `@/src/**/*.entry.js` excepto los `@/src/www/**/*.entry.js`
- `@/dist/www/**/*.dist.js`
   - ficheros de distribución o de entradas compiladas para web o ambivalente (web y nodejs irían aquí también)
   - aquí van a parar todos los `@/src/www/**/*.entry.js`
   - en estos ficheros tienes los mismos métodos de modulación que en nodejs:
      - tienes los `$compiler.inject.source` y familia, para el devtime
      - tienes los `module.exports + $moduler.{import,export}`, para el runtime
- `@/dist/www/**/*`
   - ficheros de distribución web
   - este contenido estará disponible en la aplicación web desde el servidor estático
   - aquí pueden ir vídeos, imágenes, sonidos, texto, JSON, cualquier cosa que quieras en la web.

### Ficheros de tests

Los ficheros de tests se conforman por algunos grupos diferentes:

- `@/test/unit/src/**/*.test.js`
   - ficheros de tests de entradas compiladas
   - esta colección de tests es la que se corresponde a los `@/src/**/*.entry.js`
   - cada `entry`, al compilarse, genera un `test/unit` si no lo hay y se ejecuta en el evento `touch`
   - se corresponden con los **tests de módulo de API**
   - se generan solos, cuando cada `@/src/**/*.entry.js` es compilada
- `@/test/feature/*/test.js`
   - son los ficheros de los tests de features
   - estos tests aseguran que el software de `@/src/` permita las **features** pretendidas
   - esta colección de tests es muy importante porque lidera el desarrollo, básicamente
      - lidera el TDD orientado a features que es la orientación que interesa
- `@/test/integrity/*/test.js`
   - son los ficheros de los tests de integridad
   - estos tests aseguran que el software de `@/src/` cumple con los criterios de integridad considerados
   - estos tests NO se ejecutan en el `devbin {touch,loop}`
      - porque su propósito se considera superado normalmente en el devtime
      - es más para asegurar que el software que corre (runtime) está sano
   - principalmente, sería, a saco:
      - asegurar que cada función contiene el código fuente no nativo que se espera
      - asegurar que cada propiedad tiene un valor o inicial o igualmente válido
      - asegurar que las funcionalidades mínimas se mantienen correctas
         - pero esto ya sería features también, así que el límite estaría aquí
   - estos tests pueden querer correrse en runtime, o en la web
      - lo mejor es intentar mantener compatibilidad con `ModulerV6` para la modulación
         - ni `<script>` ni `require`
      - de esta forma te aseguras que los módulos son compatibles con ambos entornos
- `@/test/case/*/test.js`
   - son los ficheros del caso actual
   - se ejecutan siempre, al final del `touch`
   - aquí escribes los tests para el feature actual, antes de pasarlos en `test/feature`

### Ficheros de desarrollo

Los ficheros de desarrollo son ficheros que tienen un uso especial en el devtime y alguno en el runtime también.

- `@/dev/bin/**/command.js`
   - para el `devbin algun comando`, ya se ha explicado antes
- `@/dev/settings.js`
   - fichero de configuraciones para el devtime
      - el runtime tiene otro: `@/dist/www/dev/settings.dist.js`
   - es importante porque tiene un pipeline diferente en el `touch`:
      - concretamente, genera una copia de parte de sus propiedades (las publicables), en: `@/dist/www/dev/settings/publicable.json`
   - actualmente tiene propiedades como:
      - `env:String` con `'dev' | 'test' | 'prod'`
      - `features:Array<String>` con los selectores de filename de los features que quieres ejecutar globalmente
         - se añadirán a los locales arrastrados por los `e.onTestFeature.js`
         - el método es `DevBinaryV6.Utils.prototype.matchesFileWithSimpleSelector`
      - `instrumentalize:Array<String>` con los rootpaths de los `@/dist/**/*.dist.js`
      - `loop.port:Number`
- `@/dist/www/dev/settings.dist.js`
   - fichero de configuraciones para el runtime web
   - debería hacer los imports necesarios 
- `@/dist/www/dev/settings/publicable.json`
   - fichero de configuraciones para el runtime web, heredadas de las configuraciones del devtime, y publicables
   - este fichero se autogenera al guardar el `@/dev/settings.js` con el método `DevBinaryV6.Utils.prototype.exportDevSettings`
   - son las propiedades que se heredan del `@/dev/settings.js` que sí pueden estar públicas en la aplicación web
   - actualmente las propiedades publicables del devtime al runtime son:
      - `env:String` con el nombre del entorno, que es `"dev" | "test" | "prod"`
      - `instrumentalize:Array<String>` con los rootpath de los `@/dist/**/*.dist.js` de los que quieras el instrumental
         - el instrumental será igual pero: ~~`filename.dist.js`~~ sino `filename.dist.instr.js`
      - `traceExternalSources:Boolean` por si quieres imprimir los códigos que pasan por el `evaluateFile` del `ModulerV6`
- `@/dev/coverage/*/index.html`
   - vistas generadas por los reportes de cobertura de código
   - participan métodos como:
      - `DevBinaryV6.Utils.prototype.instrumentCode`
      - `@/dev/controllers.js`
- `@/dev/controllers.js` 
   - fichero de controladores añadidos al `refrescador` en el `devbin loop`
   - puedes extender el servidor de desarrollo fácilmente con este fichero
   - el generado por `devbin ensure core` expone con `refrescador` los servicios HTTP de:
      - `/dev/coverage/commit [POST]`
         - permite generar un reporte de cobertura nuevo
      - `/dev/coverage`
         - permite consultar reportes de cobertura generados
      - `/dev/file/{read,write,editor}`
         - permite intercambiar texto plano entre el cliente y el servidor
         - es solo para pasar texto del móvil al pc, en mi caso
         - porque apunto cosas que luego me interesaría tener en el TODO.md o así, y Gmail es como muy aparatoso para un simple copy-paste
   - probablemente esto se lleve al código de DevBinaryV6 y no se exponga el código de estos servicios
- `@/dev/files` 
   - es un directorio utilizado para el servicio de `/dev/file/{read,write,editor}` solamente


