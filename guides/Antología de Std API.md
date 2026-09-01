# Antología de Std API

Estudio de la progresión en el desarrollo de la API de Std. Para seguir la pista de los pasos en la creación de APIs.

## Bibliografía

A continuación se explican las etapas de desarrollo completadas.

### 1. El Checker y el Asserter: De expresiones booleanas a errores del flujo común

- La guía del checker está en [guides/Std/Checker.md](./guides/Std/Checker.md).
- La guía del checker está en [guides/Std/Asserter.md](./guides/Std/Asserter.md).

### 2. El Tracer y el ErrorHandler: Monitorización del flujo común y gestión de flujos alternativos

- La guía del checker está en [guides/Std/Tracer.md](./guides/Std/Tracer.md).
- La guía del checker está en [guides/Std/ErrorHandler.md](./guides/Std/ErrorHandler.md).

La **motivación** de centrarse en el `Tracer` y el `ErrorHandler` tan tempranamente es porque:

- Primero, porque ya partimos con prestaciones para aserción.
- Luego, porque son artefactos:
   - Muy transversales, cruzan todas las APIs
   - Muy útiles en el debugging y los casos límite
   - Pequeños, relativamente
- La mayor parte del tiempo de desarrollo:
   - o estás *creando*: el tiempo invertido en crear no es problema
   - o estás *arreglando*: el tiempo invertido en arreglar sí es problema porque no estás avanzando
- El mayor contratiempo común en *arreglar*, es:
   - **Localizar el flujo**: tanto `Tracer` como `ErrorHandler` atacan a esto.
   - **Reconstruir el flujo del error**: tanto `Tracer` como `ErrorHandler` atacan a esto.
   - **Entender por qué sucede**: casuística concreta
   - **Pensar una solución**: casuística concreta
   - **Implementarla**: casuística concreta
   - **Demostrarla**: casuística concreta

Las **features** que se esperan son:

- Tracer puede trazar, silenciarse/activarse, traza adentro, traza afuera de éxito y traza afuera de error
   - Hay técnicas de uso
      - Usas tracer.log para normal, tracer.in para entrar y tracer.{out,error} para salir
      - Solo usas tracer.{in,out,error} para cuando usas try-catch





## Índice

- [Antología de Std API](#antología-de-std-api)
  - [Bibliografía](#bibliografía)
    - [1. El Checker y el Asserter: De expresiones booleanas a errores del flujo común](#1-el-checker-y-el-asserter-de-expresiones-booleanas-a-errores-del-flujo-común)
    - [2. El Tracer y el ErrorHandler: Monitorización del flujo común y gestión de flujos alternativos](#2-el-tracer-y-el-errorhandler-monitorización-del-flujo-común-y-gestión-de-flujos-alternativos)
  - [Índice](#índice)
  - [Requisitos](#requisitos)
  - [Punto de partida](#punto-de-partida)
  - [Preguntas](#preguntas)
    - [¿Por qué lo hicistes? Respondido el 31 de agosto de 2026.](#por-qué-lo-hicistes-respondido-el-31-de-agosto-de-2026)

## Requisitos

Los requisitos para que todo esto funcione serían:

- `node` para el motor de JavaScript `v8` + empalmes básicos al `os`
- `npm` para el `node_modules`
- `google_chrome` para el `webkit`, por tanto, empalmes básicos de `ui`

En principio guarda compatibilidad con el `os` huésped en todo momento. Pero si ves algún `*.sh` pues pasarlo a `*.bat` o algo.

## Punto de partida

En el inicio, empezamos con `moduler-v6-starter` que nos da:

- En el sistema: `node` + `npm` + `google_chrome` como base necesaria
- En el entorno de desarrollo:
   - compilación (o *modulación estática*) recursiva de módulos - `devbin touch`
      - con loop reactivo incorporado - `devbin loop`
   - *modulación dinámica* recursiva de módulos - `checkmoduler.{import,export}`
   - track recursivo de dependencias estáticas y dinámicas
   - documentación autogenerada
   - tests autogenerados y autoejecutados
   - modulación de `css` y `md`
   - tests unitarios - `@/test/unit/*/*.js`
   - comandos de consola rápidos y cómodos - `@/dev/bin/**/command.js`
   - diferenciar entorno nodejs y web - `@/src/www/**` y `@/dist/www/**`
      - con simultaneidad de rutas entre `node` y `web`
   - diferenciar entorno de desarrollo, test y producción - `@/{src,test,dist}`
   - tipos de tests abiertos - `@/test/*` y `DevBinaryV6.[...].runDirectory`
   - configuraciones compartidas entre desarrollo y producción - `@/dev/settings.js`, `@/src/dev/settings.entry.js` y `@/src/dev/settings/publicable.json`
   - opción de instrumentalizar código incorporada - `@/dev/settings.js#instrumentalize`
   - opción de lanzar un evento al terminar el test del `touchFile` - `@/src/**/e.onDistribute.js`
   - opción de acumular tests de `features|integrity|speed` - `@/src/**/e.onTest.js` y `module.exports = () => ({ features: ["**/*"], integrity: ["**/*"], speed: ["**/*"] })`
   - opción de lanzar evento al terminar la operación de `touchFile` - `@/src/**/e.onTouch.js`
   - opción de copiar directorio entero en otra ruta al terminar el `touchFile` - `@/src/**/e.onDistributeDirectory.js` y `module.exports = () => "@/otra/ruta"` (pronto aceptará un array)
   - configuraciones para muchos aspectos
   - guías y metodologías de desarrollo
   - compilación de binarios para `html`
      - con `checkcompiler.inject.{module,modules,source,string}` puedes:
         - inyectar ficheros `js` sin modificaciones - `.source`
         - inyectar ficheros `js` con wrapper para módulos programáticos - `.module,.modules`
         - inyectar ficheros `html` y `css` como texto - `.string`
- En el entorno de producción:
   - inclusión rápida y opcional de varias APIs:
      - `ModulerV6` que se da por sobreentendida llegados aquí
         - aunque puedes usar `CompilerV6` y `DevBinaryV6` en el desarrollo sin usar `ModulerV6` en producción
         - contiene a `TextParserV1`
      - `CompilerV6` disponible solo para entorno de `node.js` el cual:
         - contiene a `Refrescador`
         - contiene a `ModulerV6`
      - `DevBinaryV6` disponible solo para entorno de `node.js` el cual:
         - contiene a `CompilerV6`
         - contiene a `Refrescador`
         - contiene a `ModulerV6`
         - contiene a `TextParserV1`
      - `Refrescador` disponible solo para entorno de `node.js` el cual:
         - tiene algunas dependecias de `node_modules`

Para cerrar el concepto del punto de partida, diría:

> La idea principal es minimizar el tiempo de *preparación de entorno*.

Más fino aún, diría:

> Todo lo que no sea estrictamente **desarrollo del dominio de caso** debería quedar delegado al **loop reactivo**.

Pero el punto de partida es este:

> - Cero inversión de tiempo en pensar cómo tengo que partir el software.
> - Cero fricción de pensamiento al cuestionar las metodologías de convivencia de las piezas.
> - El pensamiento debe centrarse a las *vías predefinidas* como constantes y a *cuestiones específicas de dominio* como variables.
> - Pero todo ese pensamiento de nicho técnico de cómo empalmo uno con otro, debe desaparecer.
> - Las dudas de cómo programo las cosas, deben ser *puramente técnica y dominio o caso específico*, pero *nada de logística del entorno*.

Es decir, la idea de este punto de partida es que nos hayamos quitado un peso grande, el "pegamento" de las piezas, de encima.

Ahora, son las piezas. El pegamento ya no es escusa de nada.



## Preguntas

A continuación algunas preguntas que quizá valdría la pena explorar.

### ¿Por qué lo hicistes? Respondido el 31 de agosto de 2026.

Pues porque me veía repitiendo el proceso de levantar un proyecto cada 2 por 3. Y veía que luego tenía que combinar herramientas, y tenía que pensar cómo se hace de esta forma, de esta otra, había muchas cosas que no... entendía. Y las siguen habiendo, pero no las delego a la magia de los `import/export` nativos de js, por ejemplo. Las resuelvo yo mismo. Era un sacrificio de tiempo, al principio pensaba pequeño. Digo, si son 4 funcionalidades juntas. Luego fui viendo que fiu... meterse no era tener nada claro. Iteré mucho, nunca pensé que fuera a requerir tanta iteración este tema. Y de hecho, para ChatGPT, para el que tiene la explicación final: claramente, se resuelve así rápido, otra cosa es hasta cuántas prestaciones estás dispuesto a escalar.

Entonces, parecía poca cosa al princpio. Digo beh, un mapa, un `{}` y avanti. Jej. No, ha sido mucho, a veces pienso que demasiado, que para la diferencia, como si no se pudiera hacer ya.

Pero ese punto, de duda, de negación, lo ha resuelto el tiempo. El tiempo, las iteraciones, decían: *ah, veo que no te has ocupado de este tema, jeje, pim, el miiiiiismo problema*. Y sí, te quita minutos.

Pues no son esos minutos. Es la fricción mental de la que hablaba. Es que ya tienes que meterte mentalmente a resolver estas tareitas intermedias pequeñas.

Entonces, el proyecto que estás empezando, el **problema de dominio real**, estás en el primer momento del proyecto, está incipiendo la idea! Pues piiiiim, perdida. Perdida, adiós, idea. Adiós.

Muuuuchas veces.

Y pensabas, a ver, es una chorrada. Es aprender a hacerlo bien.

Y ahí es, bueno, tu respuesta ha sido: *0 escalación, 100 de adaptación*.

No has escalado el problema a algo personal, y optas por adaptarte, pero, no te has adaptado a `import/export` igualmente. Te sientes como encorsetado con esa solución.

Son sensaciones mentales, sensaciones de cómo te sientes mientras el pensamiento va viajando por los problemas.

Y sientes, esa fricción. No es fricción, es *dame todo lo que llevas encima ahora*.

Este problema mal resuelto, no comprendido al menos mentalmente, de `import/export`, lleva a ahí.

Igual, lo pienso pero también lo acabo descartando, porque es el cemento de la casa, creo que es un elemento que realmente, bueno es que son los primeros elementos del desarrollo. Es decir, hay dudas, pero relativamente, es casi *la respuesta correcta*, pasa que hay que meterse mucho, depende de qué quieras, de qué haya al final y lo que había... de primeras al menos, no era tan... bueno, mucho encorsetamiento, lo resumiría así, encorsetamiento mental, todas esas herramientas. No lo puedo explicar mejor, es una sensación de fricción mental, que si reconstruyes, es un *asalto a por la idea incipiente*.

Entonces, es un problema que... ahhhhhhhhhhhh. Jeje. Como los lenguajes naturales, claro. Pinta bonito, verdad? Jejejeje, bien devuelta. Pues... bueno, o sea, ellos podrían haber dado la solución buena, eh? No nos olvidemos, ellos podrían haber creado la no-fricción previamente si hubieran querido, vamos, como si no hubieran habido batallas suficientes antes, para llegar a... bueno, sobre lo que escribes.

En fin. Pero digamos, dentro de esta burbuja, en medio de una lluvia de agua pero protegidos en algún lugar del tiempo, estábamos buscando esa no-fricción del pensamiento, para movernos un poco más rápida y libremente, y evitar ese *asalto a por la idea incipiente* que sentíamos nos quitaba parte interesante de la fuerza con la que surge la idea.

El papel de la IA ha sido clave, pero a modo de consultoría. El uso de la IA con las ideas incipientes también está en la mira, porque tú tienes una idea, pues leer la opinión del otro puede llevarte a lo mismo, *asalto a por la idea incipiente*, bueno, básicamente, redistribuyes recursos mentales al problema de escuchar al crítico, y pierdes el hilo. Claro que lo puedes retomar y profundizar, son sutilezas, pero es que las ideas son sutilezas también.

Entonces, expresar el problema en lenguaje natural puede ser, a veces una solución, pero a veces un consumidor de tiempo importante, mira lo que estoy haciendo, estoy perdiendo el tiempo. No estoy programando, no estoy avanzando, puedo hacer un buen prompt, pero el progreso lo va a marcar el código, y si en las iteraciones que le dedico a ese código, me va no solo tiempo, sino emociones que me interesan, como sentir que sé lo que hace ese código, son sutilezas, pero pueden tener un peso importante en la toma de decisiones, y esto es lo que me pasa, y por eso consulto pero no delego a la IA, porque son sutilezas, pero que cambian de verdad cómo... enfrenta el problema la mente. Y la mente, si puede cancelar un problema, si lo considera suficientemente garantizado, lo cancelará, sin problema. Quiero decir, es rápido confiar en una IA que tiene siempre algo que decir y además parece que acierta.

Otras puede darte rodeos, son las prácticas que se están viniendo ya desde hace un rato. Rodeos, te he preguntado una tontería, no hace falta que me vendas tu solución, ni que la alargues con vueltas sobre lo mismo o enfoques de lo hipotético.

> Podemos centrarnos en el problema real y la solución real, con los menos caracteres posibles por favor, es fakin tiempo.

Pero claro. Qué le critico. Qué le estoy criticando. Mi estilo de vida mismo?

Entonces, bueno, sin rodeos, lo hice por todas estas cosas, que están ahí, de alguna forma están y se hacen notar, pero es eso, sutiles, no cuantificadas, que fácilmente se pueden dejar por "menos", pero que si la burbuja tiene la suficiente quietud, pues de alguna forma pienso que puede ver.

Ha sido excesivo?

Es que puede ser, es decir, depende de lo que quieras. Yo quería quitarme todo el tiempo posible de desarrollo logístico. Y estoy contento, es decir, podría haberlo hecho mejor (y también peor), pero siento que es un punto por el que... el tiempo que le he dedicado, que es mucho, por eso también me explayo (porque estoy valorando la inversión de tiempo), y lo obtenido (que esto se empezará a ver de ahora en adelante, todavía sigue consumiendo tiempo), igual no lo compensa, porque en 1 año podría haber hecho muchas cosas, pero digamos... en ningún proyecto, esto esto:

> No podría haber invertido en ningún otro proyecto que afinara más mi loop.

No, no está bien dicho todavía...

> En ningún otro proyecto habría invertido más tiempo en mi propio tiempo que en este proyecto.

Ahora. Esta se puede decir. Es decir, del tiempo que le dedico a la PC, este proyecto estaba cuidando el loop de lo que más hago: programar.

Por tanto, invertir en el loop de programar? Aún no lo he empezado a explotar. Pero siento eso, mi esfuerzo puede ser recogido. Y ahora entendemos el cemento, que esto es muy clave también.