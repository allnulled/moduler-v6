# Guía de malentendidos y buenas prácticas de DevBinaryV6

En esta guía se explican algunos casos propensos a la confusión, por qué suceden y cómo sortearlos.

Se habla de `DevBinaryV6` porque son problemas compartidos con `CompilerV6` y/o `ModulerV6`, no necesaria y estrictamente con `DevBinaryV6`.

## Índice

- [Guía de malentendidos y buenas prácticas de DevBinaryV6](#guía-de-malentendidos-y-buenas-prácticas-de-devbinaryv6)
  - [Índice](#índice)
  - [Caso 1. El inject.source no cambia el basedir, solo import y export](#caso-1-el-injectsource-no-cambia-el-basedir-solo-import-y-export)
    - [Ejemplo](#ejemplo)
    - [Casuística teórica](#casuística-teórica)
    - [Casuística práctica](#casuística-práctica)
    - [Reflexión](#reflexión)
    - [Caso confuso](#caso-confuso)
    - [El workaround](#el-workaround)
    - [La conclusión](#la-conclusión)
  - [Caso 2. Propagar un touch desde un e.onTouch.js](#caso-2-propagar-un-touch-desde-un-eontouchjs)

## Caso 1. El inject.source no cambia el basedir, solo import y export

Disección del caso a continuación.

### Ejemplo

En un main haces así:

```js
// src/main.entry.js
$compiler.inject.source("./lib/module-a.js");
```

Y luego en el módulo, así:

```js
// src/lib/module-a.js
$moduler.import("./piece-1.js"); // queriendo referirte a: @/src/lib/piece-1.js
```

La solución, long-story short, es cambiar esto último por:

```js
$moduler.import("@/src/lib/piece-1.js");
// También valdría, aunque no resuelves tanto la confusión, y no universalizas el origen del import así, pero:
$moduler.import("./lib/piece-1.js");
```

### Casuística teórica

La casuística teórica es la siguiente:

- El dato importante es que el `$compiler` y el `$moduler`...
   - no corren en el mismo runtime
   - no comparten instancia de `ModulerV6/CompilerV6/DevBinaryV6`
   - no comparten `this.{basedir,rootdir}`
- Lo anterior implica que...
   - Cuando haces `$compiler.inject.source("./otro-fichero.js")`, el `$compiler` tiene su propio `this.basedir`.
   - Cuando haces `$moduler.import("./otro-fichero.js")`, el `$moduler` tiene su propio `this.basedir`.
   - No por inyectar un fichero con `$compiler.inject.source`, estás cambiándole el `$moduler.basedir`.
      - solo el `$compiler.basedir`
   - Solo por `$moduler.import` y `$moduler.export` estarías cambiando el `$moduler.basedir`.

### Casuística práctica

La casuística práctica ha explotado en los tests cuando...

- En el test `@/test/assets/unit/103`...
   - donde en la carpeta `signatures` los `$moduler.{import,export}` estaban usando `"./fichero.js"`
   - al cambiar `@/src/CompilerV6/prototype._compileAsModulerExport.js` y su homólogo para el `import`
      - para que continúen la compilación recursiva
      - y ampliar el reporte de `rels.json` a la modulación del runtime (`ModulerV6` no solo `CompilerV6`)
      - el único test que petaba era este
      - y era porque el `_compileAsModulerExport` y el `import` no comparten el `basedir`
         - esto hacía que las rutas relativas de dentro de la carpeta `signatures` no coincidieran con el `main.js` que está en la carpeta superior
   - la solución ha terminado siendo: *cambiar las rutas de relativas (`./ruta.js`) a enraizadas (`@/ruta.js`)*
      - con eso, el test ha vuelto a pasar normal

### Reflexión

La reflexión ha sido que, en realidad, esto es correcto que suceda. Y la razón es esta:

> Los métodos `$compiler.inject.{source,string}` y `$moduler.{import,export}` **no comparten** el `this.basedir` entre ellos, ni siquiera llegan a existir en el mismo *runtime* nunca.

### Caso confuso

El caso confuso se da cuando haces lo siguiente:

- Utilizas `$compiler.inject.source` para importar ficheros que usan luego `$moduler.{import,export}`
   - intuitivamente, desde el fichero importado sigues importando con `./`
   - sobreentendiendo que `$moduler.basedir` apunta al fichero que estás inyectando con `$compiler.inject.source`
   - y **craso error**, porque esto es lo que no es cierto

### El workaround

- El workaround inicial ha sido el del test: 
   - dejas de usar `./` al importar rutas
   - y en su lugar usas `@/` para lo mismo
      - así universalizas la ruta, y desbloqueas el origen del fichero que le haga el `$moduler.{import,export}`
      - de esta forma, solo tienes que hacer que `$compiler` y `$moduler` compartan `rootdir` y no `basedir`
      - y esta es una premisa inicial del proyecto de `DevBinary`

- Este problema da sentido a no exponer los métodos `inject.source` o `import/export` como globales directas
   - al utilizar `$compiler` y `$moduler` ya tienes que saber ver que estás hablando...
      - con runtimes diferentes
      - con normas diferentes
      - con objetos diferentes
   - sin embargo, `DevBinaryV6` plantea de base que `$compiler` y `$moduler` compartan el `rootdir` igualmente
      - dentro de esto está que el browser siempre tenga que atacar al mismo subpath del proyecto, `dist/www`, por ejemplo
         - porque al hacerse así, el `@/dist/www/` apunta a la misma carpeta en ambos entornos
            - node y browser
            - y aunque no son lo mismo exactamente, pero hay relación, también: devtime y runtime
      - por tanto, con cambiar las rutas de relativas a enraizadas, el problema debería desaparecer

### La conclusión

Este error es humano, pero el framework es correcto aquí, y lo que hará será quejarse de que no encuentra el módulo.

¿Y por qué tiene sentido que se haga así?

- De base, estás en 2 runtimes diferentes, hacer que se entiendan a ese nivel no es correcto.
   - que tú hagas un `$compiler.inject.source` **NO PUEDE IMPLICAR** que cambies la ruta del `$moduler.basedir`
   - por más de una razón, pero la principal es que:
      - PORQUE ese cambio de ruta del `$moduler.basedir` solo sería válido en el fragmento de código de la inyección
         - y estás en un script más grande
         - el `inject.source` solo aplica a una parte
         - es un cambio que parece intuitivamente correcto, si no lo piensas bien
            - pero si lo piensas, es prácticamente no solo imposible, sino incluso indeseable
            - no te interesa cambiar el basedir del runtime en un fragmento porque el inject.source te confunde en el coding time a ti, como desarrollador imperfecto
               - piensa lo que haces, las implicaciones, el alcance
               - y acepta que este cambio sería absurdo, y debes corregir tu comprensión del código, no el framework
               - el framework es correcto, `$compiler` y `$moduler` son objetos que nunca se llegan a ver entre sí
- Finalmente, si vas a usar `$compiler.inject.source` para incorporar módulos con `$moduler.{import,export}`, solo tienes que tener en cuenta que:
   - estás haciendo una inyección estática, copiando-pegando código externo
      - el `./` te seguirá valiendo para el `$compiler` pero `$moduler` va por otro lado siempre
      - si apuntas a la misma carpeta, no saltará el problema
      - si apuntas a otras carpetas, puedes incurrir en esta confusión
         - simplemente usa `@/` en lugar de `./` y tus problemas desaparecerán
            - esto tiene sentido en tanto que con `inject.source` estás deslocalizando el devtime pero el runtime no
               - puedes entender que, de aquí en adelante, todo el desarrollo es deslocalizado, por tanto usas el `@/`
               - con `@/` además consigues que los módulos estáticos (inyectables) siempre encuentren las rutas, independientemente de donde estén
         - también puedes continuar las rutas relativas con `./` pero
            - o desde el fichero que inicia las inyecciones (el main.entry.js típicamente)
               - que es el que retiene el `$moduler.basedir` realmente
            - o desde el fichero que es importado con `$moduler.{import,export}`
               - porque ahí sí se cambia el `$moduler.basedir`
- Y para cerrar:
   - este caso, vuelve a ser una explicación necesaria, exclusivamente, por la funcionalidad de `./` para rutas relativas.
   - este feature ha complicado bastante el desarrollo, debe decirse
   - pero con todo, sigue teniendo sentido, porque es realmente la forma más cómoda de modular
      - con el `$compiler` no hay ninguna duda
      - sin embargo, con el `$moduler` hay que reconocer que
         - nos ha exigido varios esfuerzos extra y
         - arrastrado bastante *lógica arriesgada* hasta el runtime
         - forzado a extender la documentación explicando lógica y casos problemáticas
            - como este en el que estamos
            - o la suplantación del `$moduler` en los ficheros importados con `$moduler.{import,export}`
   - todo esto de alguna forma, nos hace cuestionar un poco esta funcionalidad
      - concretamente, rutas relativas en runtime/`ModulerV6`
      - probablemente hubiera sido mejor mantener el runtime libre de rutas relativas, y solo en devtime
      - por código, por confusión, por documentación, y por no necesariedad (es un feature innecesario en el fondo)
      - pero bueno, en algún punto había que equivocarse
      - y me temo que este problema hará cascada con otros
         - como reconstruir rutas relativas del `$moduler.{import,export}` en *devtime*
            - para documentar las dependencias, por ejemplo
         - y al final, pues bueno, acaba siendo una rama que va chupando energía extra
         - y cuya funcionalidad es, de alguna forma, bastante innecesaria y ahora vamos viendo que también indeseable
            - y fácilmente caiga en desuso
            - y conlleve retro-incompatibilidades futuras
   - pero de momento, se queda.

## Caso 2. Propagar un touch desde un e.onTouch.js

- El fichero `e.onTouch.js` permite ejecutar algo después de compilar un fichero del `@/src/`
- Es fácil, que quieras hacer un `touch` desde un `e.onTouch.js` u otros eventos que se llaman en el `touchFile` como:
   - `e.onTouch.js`
   - `e.onTest.js`
   - `e.onDistribute.js`
   - `e.onDistributeDirectory.js`
- El punto crítico es que `touchFile` hace `await` de todos estos eventos
   - esto implica que, si en estos eventos, haces otro `touch` y lo esperas con `await`, entra en bucle y no acaba nunca ningún evento `touch` al final
- Si, por ejemplo, queremos que de un cambio en `app.css` se pase al `dist` el `index.html` también
   - porque estamos inyectando el `css` con un `$compiler.inject.source` en el `html`
   - lo único que hay que hacer es crear un `e.onTouch.js` en el directorio
   - luego ponerle:
   ```js
   module.exports = function(info) {
     return info.devbin.utils.touchFile(`@/src/www/path/to/my/dir/index.html`, {
       ignoreOnTouchEvent: true, //este flag es importante para que no entre en recursividad
     });
   };
   ```
   - el evento `touch` sobre el `html` se ocupará de compilar su contenido y pegarlo en el `dist`
- Ten en cuenta que, de no hacerlo, entra en bucle infinito, porque:
   - el `touchFile` ya está haciendo `await` del `triggerCallbackFromFile` antes de ejecutar tu `e.onTouch.js`
   - y al `triggerCallbackFromFile` le haces que llame al `touchFile` otra vez
      - si le pasas este flag, no hay problema, porque no hay más llamadas al `e.onTouch.js`
      - pero si no le pasas este flag, el `e.onTouch.js` vuelve a llamar al `touchFile`, que volverá a llamar al mismo `e.onTouch.js`, que... etc.
