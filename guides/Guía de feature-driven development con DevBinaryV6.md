# Guía de Feature Driven Development

Esta es la guía de desarrollo dirigido por prestaciones.

## Índice

- [Guía de Feature Driven Development](#guía-de-feature-driven-development)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Tipos de tests en DevBinaryV6](#tipos-de-tests-en-devbinaryv6)
  - [Ficheros especiales de tests en DevBinaryV6](#ficheros-especiales-de-tests-en-devbinaryv6)
  - [Métodos útiles para testing en la API de DevBinaryV6](#métodos-útiles-para-testing-en-la-api-de-devbinaryv6)
  - [Soporte para instrumentalización incorporado](#soporte-para-instrumentalización-incorporado)

## Introducción

- Feature-driven development es un subconjunto de test-driven development
- Hay muchos tipos de tests, muchos aspectos y criterios posibles con los que dividir una lista de tests.
- No he probado muchas técnica, pero *feature-driven development* parece la más práctica posible para un desarrollo común.
- Yo la he adoptado como la oficial de momento

## Tipos de tests en DevBinaryV6

La división inicial de DevBinaryV6 a día 08/09/2026 sobre tipos de tests es:

- `@/test/case`: para el caso que te ocupa en el momento
- **`@/test/feature`**: para definir prestaciones
- `@/test/integrity`: para asegurar mínimos
- `@/test/speed`: para cronometrar
- `@/test/spontaneous`: para algo que se te ha ocurrido de golpe
- `@/test/trash`: para cosas que te dan igual
- **`@/test/unit`**: para cada API, o `@/src/**/*.entry.js` y `@/dist/**/*.dist.js`
   - estos ficheros se van creando a medida que generas el `@/dist/**/*.dist.js`

## Ficheros especiales de tests en DevBinaryV6

- Los `@/test/**/*.test.js`:
   - en el `touch` propio, se ejecutan y terminan el touch
   - en el `touch` de un `@/src/**/*.entry.js`, hay dos pasos donde hace cosas:
      - si no existe, lo crea
      - lo ejecuta
- Los `@/test/**/*.run.js`:
   - igual.
- Los `@/test/**/e.onTest.js`:
   - el evento `e.onTest.js` solo puede retornar, desde la función que exporta, un objeto con las propiedades:
      - `feature:Array`
      - `integrity:Array`
      - `speed:Array`
   - en estos arrays puedes poner **expresiones glob** de [picomatch](https://github.com/micromatch/picomatch)
      - estas expresiones activarán los tests coincidentes en cada categoría
      - por tanto con `module.exports=()=>({feature:["**sockets**"]})` ya le estás diciendo:
         - *ejecuta todos los `@/test/features/**sockets**` que encuentres*
         - el evento se reserva para que, si quieres hacer algo insitu puedas, pero tienes todos los hooks ahí.
   - el `touch` ejecuta varios tests, en el momento de escribir esto, hay 2 tiempos:
      - los tests unitarios cada vez que se toca a un `@/src/**/*.entry.js`
         - a cada entry le corresponde un equivalente `@/test/unit/src/**/*.test.js`
         - este es el fichero que crea automáticamente el `DevBinaryV6`
      - los tests de `integrity`, `speed`, `feature` y `case` al terminar la propagación hacia arriba

## Métodos útiles para testing en la API de DevBinaryV6

Principalmente destacaría el último de todos, porque hay más, pero de uso público solo veo este:

- `DevBinaryV6.prototype.tester.runDirectory({ ... })`
   - todas las propiedades a continuación son opcionales
   - `filename = false`: string para especificar que quieres ejecutar *un fichero concreto*
      - por tanto, este parámetro te permite reusar el método
      - tanto con `directorio/<*>`
      - como con `directorio/<subdirectorio>/<filename.js>`
   - `ignore = ["runner.js"]`: array de strings con los ficheros o directorios que va a ignorar
   - `injection = {}`: objeto con propiedades que quieres proporcionar a los tests
   - `title = false`: string con un título del test
   - `filter = false`: function para filtrar ficheros 100% custom

## Soporte para instrumentalización incorporado

- Para instrumentalizar solo debería llevar:
   - ir a `dev/settings.js#instrumentalize`
   - añadir al array el **glob pattern** de [picomatch](https://github.com/micromatch/picomatch)

