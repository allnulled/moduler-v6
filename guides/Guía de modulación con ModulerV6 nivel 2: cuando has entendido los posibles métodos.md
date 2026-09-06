# Guía de modulación con ModulerV6 nivel 2: cuando has entendido los posibles métodos

A continuación se explican los métodos de modulación que finalmente vas a querer usar cuando has entendido las opciones que tienes.

## Índice

- [Guía de modulación con ModulerV6 nivel 2: cuando has entendido los posibles métodos](#guía-de-modulación-con-modulerv6-nivel-2-cuando-has-entendido-los-posibles-métodos)
  - [Índice](#índice)
  - [Momento en que se escribió esta guía](#momento-en-que-se-escribió-esta-guía)
  - [Todos los casos de modulación](#todos-los-casos-de-modulación)
    - [Compilación de clase](#compilación-de-clase)
    - [Decoración de objeto](#decoración-de-objeto)
    - [Compilación de colección](#compilación-de-colección)
    - [Piscina de módulos dinámicos y compilables](#piscina-de-módulos-dinámicos-y-compilables)


## Momento en que se escribió esta guía

- Esta guía se empezó después de terminarse la "Guía de modulación con ModulerV6".
- Estamos empezando a diseñar el Std.
- Y todavía no tenemos estabilizado ModulerV6/CompilerV6/DevBinaryV6
   - Aunque ha progresado mucho
- Nos encontramos con problemas de:
   - No todos los módulos tienen el mismo formato ni implican los mismos requerimientos:
      - Algunos es una clase sin dependencias, qué cómodo
      - Otros es una clase con dependencias
      - Otros es un módulo (clase u objeto) que tiene que irse extendiendo con otros módulos
      - Algunos es un módulo que quisiera compactar
      - Otros es un módulo que me está bien que se cargue más adelante si se necesita
   - Tengo muchas opciones disponibles pero no entiendo exactamente cómo funcionan
      - Y además tengo que decidir cuál se adecúa mejor entre todas ellas
   - Tengo tentaciones de ensuciar el *scope* global como solución rápida

En este punto, paramos a ver exactamente los caminos que hemos abierto, y pensar qué combinación de ellos nos da:

- Una solución universal a nuestros inciertos aún requerimientos de modulación
- Que mantenga la compatibilidad con modulación estática (`CompilerV6`) y modulación dinámica (`ModulerV6`)
   - sí, exactamente como el `import`/`export` del JavaScript moderno
   - pero sin el `import`/`export`
   - pero no estamos justificando esto ahora

## Todos los casos de modulación

A continuación se explican todos los casos de modulación, y su solución con `ModulerV6/CompilerV6`.

En principio sí, son todos, o no son todos, pero con estos puedes ir sin fricción para adelante, vaya.

### Compilación de clase

- Es el caso más habitual de desarrollo:
   - una clase
   - que quieres que sea un módulo estático y dinámico a la vez
   - que va a utilizar módulos de otros ficheros por dentro
   - que va a compilar fragmentos de código de miembros y otras partes en 1 mismo fichero
- Caso donde quieres crear 1 clase, pero te gustaría ir modulando en otros ficheros sus funcionalidades: fragmentos de código.
- Caso de 1 clase normal y corriente, que define su principio y su final en el mismo fichero: modulación estática.
- Sin embargo, va a necesitar que se le inyecten módulos externos antes: modulación dinámica.

En este ejemplo, creamos un main.js (*que le llamas `*.entry.js` para automatizar la compilación del `@/dist/**/*.dist.js` en cualquier `touch` del directorio*) y luego tenemos la clase aparte:

```js
// MyClass.entry.js
module.exports = $moduler.import([
    "@/dist/src/Dependency1.dist.js",
    "@/dist/src/Dependency2.dist.js",
    "@/dist/src/Dependency3.dist.js",
], function([Dependency1, Dependency2, Dependency3]) {
    return $compiler.inject.source("./MyClass.class.js");
});
```

Luego, en un fichero limpio, tienes la clase solamente:

```js
// MyClass.class.js
class MyClass {
    static Dependency1 = Dependency1;
    static Dependency2 = Dependency2;
    static Dependency3 = Dependency3;
}
```

Esta fórmula permite varias cosas:

- Que `ModulerV6` compatibilice el módulo con la modulación en node.js (con `module.exports`)
- Que `ModulerV6` compatibilice el módulo con la modulación dinámica (con `$moduler.import`)
- Que `CompilerV6` compatibilice el módulo con la modulación estática (con `$compiler.inject.{module,modules}`)
- Que `DevBinaryV6` compatibilice el módulo con la edición masiva de miembros (gracias al `*.class.js`, con `splittable.class.js`)
- Que `DevBinaryV6` compatibilice el módulo con la sincronización del directorio entero (gracias al `*.entry.js`, con `<directorio>/<directorio>.entry.js`)

Es la fórmula más habitual de desarrollo. Pero no abarca todos los casos.

### Decoración de objeto

A veces, quieres ir ampliando un objeto. Aunque sea una `Function` por `function` o por `class`, queremos **seguir decorando un objeto**.

- Cuando 1 objeto quieres que vaya descubriendo en el transcurso subobjetos
- Típico caso de: *cuelgo una variable de global, y la voy ampliando con snippets*

Las peculiaridades de este método son que:

- Usa `module.exports =` para ser compatible con node.js
- Usa `$moduler.export` para ser compatible con módulos estáticos y dinámicos
- Usa `$moduler.export` y exporta un `{}` para ser compatible con *el patrón de "cuelgo una variable de global"*
- Permite reusar la sección del `export` en los `dependency` del `ModulerV6.prototype.{import,export}`
   - Entonces, el patrón *"cuelgo una variable"* se transforma en *"cuelgo un fichero tipo sección en el `$moduler`"*.
   - Y esa variable, que habría ido al global, la tienes localizada en el `$moduler` y disponible como dependencia.
- Y el patrón es reusar esta sección para ir decorando la API desde módulos distintos.

```js
// MyGlobal.entry.js
module.exports = $moduler.export("#MyGlobal", [], function() {
    return {}
});
```

```js
// Decorators.entry.js
module.exports = $moduler.import(["#MyGlobal"], function([MyGlobal]) {
    return MyGlobal.Decorator1 = "something";
});
module.exports = $moduler.import(["#MyGlobal"], function([MyGlobal]) {
    return MyGlobal.Decorator2 = "something";
});
module.exports = $moduler.import(["#MyGlobal"], function([MyGlobal]) {
    return MyGlobal.Decorator3 = "something";
});
```

### Compilación de colección

En este caso, tenemos una combinación de las anteriores:

- Por un lado, queremos congregar varios módulos en un compilado estático
- Por el otro lado, queremos conseguir total compatibilidad con la modulación dinámica, es decir:
   - Aunque sean módulos que vamos a compilar:
      - sus ficheros deben quedar resueltos en el `$moduler`
         - aun sin haber ido a buscarlo por internet o el sistema operativo, sino *inline*
         - para que cuando otro módulo lo requiera, no vaya por su cuenta y empiece a haber duplicados
      - idealmente, el `$moduler` de cada fragmento de módulo tiene un `this.basedir` adaptado al fichero al que está representando ese fragmento
         - y esto no sé si está implementado

En principio, no parece que haya mucha diferencia con lo anterior. Pero hay 1:

- El `$moduler.inject.module` no lo voy a hacer 1 vez: lo voy a hacer muchas.
   - Lo necesito para vincular los módulos a sus ficheros
      - si hardcodeo con `$compiler.inject.source` no cubro ese vínculo
      - si hardcodeo con `$compiler.inject.module` sí, pero surge otro problema:
         - unos módulos son síncronos, la inyección no da conflicto
         - otros módulos son asíncronos, la inyección ya no es tan cómoda como, `<propiedad>: $compiler.inject.module("./whatever.dist.js")`
         - ni siquiera puedo utilizar `await $compiler.inject.module`!
            - de usarlo, tengo que preocuparme por el orden de carga de los módulos
            - porque si intento cargar un módulo de la capa 2 y el módulo de capa 1 que este requiere no ha llegado, o falla, o se quedaría esperando para siempre
            - entonces tengo que hacer una historieta con `Promise.all` para que la carga vaya por todos los módulos, en formato asíncrono
               - **POR ESTA RAZÓN**, se dijo y se sigue diciendo:
               - **SIEMPRE QUE USES $moduler.import PARA OBTENER UN MÓDULO RESUELTO, AAAAAAUNQUE, EL MOOOOÓDULO, SEEEEA, SIIIIIÍNCRONO, USA EL await DELANTE**
               - **PORQUE SI ESOS MÓDULOS MÁS ADELANTE SON USADOS EN UN $compiler.inject.modules**, su valor será una `Promise<val>`, no simplemente `val`.
- Ese `Promise.all` intermedio lo cambia todo, ya no es un simple `$moduler.inject.source`:
   - hay más detalles que tener en cuenta
   - y se tienen que resolver como conjunto, no puedo convertir esta lógica con simplemente `$compiler.inject.module`
   - en cambio, si la operación que se pide es:
      - *Dame todos estos módulos resueltos como una Promise*
      - entonces sí puedo resolverlo, sin incurrir en *deadlocks* donde capa 2 se queda esperando a capa 1

El algoritmo que resuelve esta fórmula de modulación hacer algo así:

- Pone una `Promise` en todos los ficheros módulo que has pedido con `$compiler.inject.modules`
   - Por tanto, los demás sabrán siempre ya que ese módulo **no puede resolverse otra vez**, y además pueden esperar a que se resuelva.
- Luego ejecuta síncronamente todos los módulos
   - Previamente a wrapeado a cada módulo dentro de un callback para que vea un `$moduler` propio, y cazar su `module.exports` y su `return`
   - Al acabar, establece ese valor en el fichero módulo que corresponde a la ruta.

Ok. Y cómo gestiona la asincronicidad y las dependencias, entonces?

Ok. Al tener a todos los módulos encajados con su fichero propio:

- Primero se reservan los módulos:.
   - Se pone una `Promise` en el valor del módulo
   - Esta `Promise` será resuelta al terminar la carga del módulo
- Luego se pasan a ejecutar y resolver:
   - Si son síncronos: a la primera.
   - Si son síncronos, y tienen dependencias síncronas, igual: a la primera.
   - Pero, si el módulo es asíncrono, o tiene dependencias asíncronas:
      - El módulo solo pasa a ejecutarse (caso de `async function` digo) cuando tiene todas las dependencias resueltas (asíncronamente, con una `Promise`)
      - El módulo solo pasa a resolverse cuando ha completado la `Promise` del módulo mismo

Entonces:

- La primera pasada, es síncrona, rápida, y exporta las `Promise` al `$moduler.modules`.
- En las siguientes, porque son ejecuciones paralelas iniciadas porque cada módulo ha iniciado su propia `Promise`:
   - Los módulos intentan completarse, pero se paran cuando hay dependencias sin resolver o cuando el `async` tiene `await` dentro.
- Pero digamos, cada módulo intenta cargarse a sí mismo lo antes posible, y espera a sus dependencias justas completarse para ejecutar su función y exportar su resolución a `$moduler.modules`.
   - Por tanto, confiar en este método es muy amigable, por todas las features que arrastramos, y esta, con la que casi culminamos.
   - Porque esta fórmula es la que nos permite, finalmente, modular:
      - En devtime / runtime
      - En node.js / browser
      - En síncrono / asíncrono
      - Con módulos compilados / cargados en vivo, pero escritos en 1 único estilo de codificación
      - Reutilizando, pues, 1 único código fuente

Para recapitular:

- Con este método, podemos agrupar la carga de módulos de 1 colección en una `Promise`
   - Manteniendo full-compatibilidad con el sistema de modulación dinámico.

En Dart, habían los llamados *ficheros barril*. Esto es su equivalente, pero, aquí no te fuerza a sacrificar todo el fichero:

- Tú simplemente tienes que saber que `$compiler.inject.modules` devuelve una `Promise`
   - desde ahí, puedes utilizarlo donde quieras, como quieras.


El ejemplo es muy sencillo también:


```js
// main.entry.js
module.exports = $compiler.inject.modules({
    Persona: "./Persona.dist.js",
    Animal: "./Animal.dist.js",
    Cosa: "./Cosa.dist.js",
});
```

```js
// Persona.entry.js
module.exports = $moduler.import(["./Animal.dist.js"], function([Animal]) {
    return class Persona extends Animal {};
});
```

```js
// Animal.entry.js
module.exports = $moduler.import(["./Cosa.js"], function([Cosa]) {
    return class Animal extends Cosa {};
});
```

```js
// Cosa.entry.js
module.exports = $moduler.import([], function() {
    return class Cosa {};
});
```

Si se ve, hay un poco de los dos patrones anteriores, cierto? Tenemos:

- Los `$moduler.import` de la **Composición de clases**
- El `$compiler.inject.modules` de la **Composición de objetos**
   - Porque este método nos va a devolver un *objeto* o *array* con las dependencias resueltas (vía `Promise`, eso sí)
   - Por lo cual, se entiende que es un patrón de decoración de objeto, y cada módulo va a dejar su marca (en una propiedad o posición, concretamente)

Vale. Esto es, compilación de colección (objeto o array) de módulos.

### Piscina de módulos dinámicos y compilables

Este es el último patrón, el más dinámico, pero también el más lento al ejecutarse.

- Este patrón es el que intentan, y en cierta manera resuelven satisfactoriamente, las sintaxis de `import/export` del JavaScript moderno.
- Pero este patrón existía antes con `<script src>` también, o `require/module.exports`, o con `fetch + eval` hasta en node.js.
- Y no estamos aquí para ponerlo en cuestión, estamos aquí porque ya lo pusimos en cuestión mucho antes.
   - Simplemente que el patrón existía de cierta manera, y se siguió persiguiendo, de cierta manera, hasta hoy tener los `import/export` modernos.
   - Su sintaxis puede ser leída por modulador en runtime, o por compilador en devtime también

Trata de:

- Teniendo la opción de compilar cualquier módulo ($compiler.inject.source + entry)
- Teniendo la opción de importar dinámicamente cualquier módulo ($moduler.import + dist)
- Procurarse una función que me permita cargar cualquier módulo en runtime

Esa función es `ModulerV6.prototype.import`.

Pero se recomienda que si vas a usar este patrón, no uses `$moduler.import` sino `ModulerV6.globalInstance.import`. La razón se ha explicado muchas veces en guías anteriores: `$moduler` es un clon localizado de `ModulerV6.globalInstance` (por defecto, puede ser otro, aquí quiero decir, la instancia original de esa importación) y retener referencias suyas en funciones locales impide que sean destruidos por el Garbage Collector del V8.

Estos módulos, entonces, se verían así:

```js
// @/src/www/Commander.js
module.exports = class Commander {
    static run(id) {
        return ModulerV6.globalInstance.import(`@/dist/www/commands/${id}/command.js`);
    }
};
```

Los comandos serían así:

```js
// @/src/www/commands/<id de comando>/command.js
module.exports = $moduler.import([
    // Aquí importas otros módulos
], function() {
    // Aquí haces lo que quieras.
});
```

Y usarlos sería así:

```js
// main.js
module.exports = $moduler.import([
    "@/src/www/Commander.js",
], async function([Commander]) {
    await Commander.run("Comando 1");
    await Commander.run("Comando 2");
    await Commander.run("Comando 3");
    return { status: "ok" };
});
```

