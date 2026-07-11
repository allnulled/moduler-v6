# Guía rápida del moduler-v6-starter

## Índice

- [Guía rápida del moduler-v6-starter](#guía-rápida-del-moduler-v6-starter)
  - [Índice](#índice)
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

## Instalación

```sh
git clone ...
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
- una *propagación* consiste en:
   - hacer un *evento touch* en el `<dirname>.entry.js` del directorio actual, si existe
   - hacer un *evento touch* en todos los `*.entry.js` de los directorios superiores
- cada *evento touch* hará lo siguiente:
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

En los proyectos `moduler-v6-starter` hay una serie de ficheros y carpetas:

- `dev/run.js` - para ejecutar `devbin` localmente
- `dev/bin.js` - instancia `DevBinaryV6` del proyecto, la API, vaya
- `dev/bin/**/command.js` - los comandos disponibles
- `src/**/*.entry.js` - los ficheros de entrada
- `src/**/<dirname>.entry.js` - los ficheros de entrada por directorio, sensibles a propagación horizontal
- `src/lib/*` - librerías de terceros
- `src/www/**/*` - contenido estático
- `dist/**/*.dist.js` - ficheros de distribución o de entradas compiladas
- `dist/www/**/*` - contenido estático de distribución
- `test/unit/src/**/*.test.js` - ficheros de tests de entradas compiladas

Principalmente esto es lo que el `devbin new project` y el `devbin ensure core` van a asegurar de alguna forma.

