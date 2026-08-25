# Guía de programación de funciones para DevBinaryV6

A continuación se explica cómo programar funciones de forma óptima para DevBinaryV6.

## Índice

- [Guía de programación de funciones para DevBinaryV6](#guía-de-programación-de-funciones-para-devbinaryv6)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Normas para funciones y métodos de clase](#normas-para-funciones-y-métodos-de-clase)
    - [Norma 1. Todo método público tiene un método privado sombra](#norma-1-todo-método-público-tiene-un-método-privado-sombra)
    - [Norma 2. La firma de los parámetros de todos los métodos privados siempre es la misma](#norma-2-la-firma-de-los-parámetros-de-todos-los-métodos-privados-siempre-es-la-misma)
    - [Norma 3. Las variables locales destacables de una función van al principio y con let](#norma-3-las-variables-locales-destacables-de-una-función-van-al-principio-y-con-let)
    - [Norma 4. Ámbitos para todo](#norma-4-ámbitos-para-todo)
    - [Norma 5. Los tipos try-catch](#norma-5-los-tipos-try-catch)
    - [Norma 6. Un único return por función, usa breaks si se complica](#norma-6-un-único-return-por-función-usa-breaks-si-se-complica)
    - [Norma 7. Una pequeña memoria intrafunción te permitirá transportar el estado de la función a otras rápidamente](#norma-7-una-pequeña-memoria-intrafunción-te-permitirá-transportar-el-estado-de-la-función-a-otras-rápidamente)
    - [Norma 8. Diferentes estilos de redacción de función según el uso que quieras darle](#norma-8-diferentes-estilos-de-redacción-de-función-según-el-uso-que-quieras-darle)
    - [Norma 9. Para juntar fragmentos de código tienes $compiler.inject.source](#norma-9-para-juntar-fragmentos-de-código-tienes-compilerinjectsource)
    - [Norma 10. Puedes extender clases con objetos-rasgo y la cláusula static](#norma-10-puedes-extender-clases-con-objetos-rasgo-y-la-cláusula-static)
    - [Norma 11. Explica los algoritmos que se hacen más difíciles con las sintaxis de markdown en comentarios de CompilerV6](#norma-11-explica-los-algoritmos-que-se-hacen-más-difíciles-con-las-sintaxis-de-markdown-en-comentarios-de-compilerv6)
    - [Utilidad 1. Tienes los splittable.ClassName.class.js para hacer varias ediciones de golpe](#utilidad-1-tienes-los-splittableclassnameclassjs-para-hacer-varias-ediciones-de-golpe)

## Introducción

- En esta guía se mezclan consejos de diferente categoría pero mezclados.
- Las categorías son grupos que se forman a partir diferentes criterios.
- Los criterios que más interesa conocer son:
   - la **estabilidad**
      - indica lo fiable que se considera es el consejo
      - a más alta, más imperativo de uso
      - a más baja, menos imperativo de uso y más experimental
      - se da con un número del 1 al 10
   - principalmente, este es el criterio más importante para ordenarlas.

## Normas para funciones y métodos de clase

A continuación se hablan de las normas que aplican a la hora de codificar métodos de clase, estáticos o prototipo, o funciones en general.

### Norma 1. Todo método público tiene un método privado sombra

- **Estabilidad:** 8.5
   - Es un buen consejo, pero puede parecer verborreico de primeras
   - Yo no lo he usado mucho, pero al final creo que es la forma más universal, clara y mantenible
- Benficios:
   - API pública y privada claramente separadas
   - API pública y privada con firmas más estables
   - API pública accesible y usable
   - API privada escalable aunque algo más verbosa
- Consistencia:
   - Los métodos públicos empiezan por minúscula
   - Los métodos privados empiezan por `_` + minúscula
   - Cada método público tiene un método sombra privado que se llama igual (pero con el `_` delante)
   - Los métodos públicos sí tienen *expansión de la firma de parámetros*
      - Aceptan varios parámetros, variables
      - Ordenan y envían estos parámetros al método sombra correspondiente
   - Los métodos privados no tienen *expansión de la firma de parámetros*
      - Siempre usan la misma firma de parámetros, que es:
         - Argumento 0: `parameters:Object`
            - parámetros de la función, propiamente
         - Argumento 1: `settings:Object`
            - configuraciones globales
            - este parámetro sirve para mantener unos parámetros a través de toda la API

Un ejemplo sería este:

```js
class Database {
   select(table, filter, limit) {
      return this._select({ table, filter, limit });
   }
   _select(parameters, settings = {}) {
      let output;
      let memory = {};
      let table, filter, limit;
      Format_input: {
         Extract_parameters: {
            { table, filter, limit } = parameters;
         }
         Format_parameters: {
            table = table || "DefaultTable";
         }
         Validate_parameters: {
            if(typeof table !== "string") throw new Error("Table must be string");
         }
      }
      
      Process_info: {
         memory.step1 = this._method1({ input: "x" });
         memory.step2 = this._method2({ input: "y" });
         memory.step3 = this._method3({ input: "z" });
      }
      Return_output: {
         return output;
      }
   }
}
```

Esto se hace porque en un futuro te va a interesar hacer esto:

```js
class Database {
   async _select(input, _settings = {}) {
      let output;
      const settings = this.constructor.normalizeSettings(_settings);
      const { tracer, progresser, channel, hooks, } = settings;
      try {
         Inicio: {
            await hooks.hook("Database.prototype._select:Entrada");
            await hooks.hook("Database.prototype._select:Inicio");
            tracer.trace("Database.prototype._select", arguments);
            progresser.setTotal(4);
            channel.emit({ type: "debug", message: "Started Database.prototype._select" });
         }
         Proceso: {
            await hooks.hook("Database.prototype._select:Proceso");
            progresser.setCurrent(1);
            progresser.advance(1); // 2
            progresser.advance(1); // 3
            progresser.advance(1); // 4
         }
         Final: {
            await hooks.hook("Database.prototype._select:Final");
            channel.emit({ type: "debug", message: "Finished Database.prototype._select" });
            return output;
         }
      } catch(error) {
         Erroneo: {
            hooks.hook("Database.prototype._select:Erroneo", {error, output});
         }
      } finally {
         Salida: {
            return hooks.hook("Database.prototype._select:Salida", {output}) || {output};
         }
      }
   }
}
```

Observación:

- a través de `settings` estás teniendo:
   - un `Tracer` personalizable
      - necesitas *tracers* no vinculados a la clase, y esta es la forma más incisiva de conseguirlo
      - el tracer no está vinculado a la clase porque está vinculado a un método público que inicia la llamada
      - esto es porque puedes hacer varias llamadas simultáneas a un mismo método público
         - y si está vinculado a la clase el tracer, no puede controlar el nivel de profundidad de las llamadas
         - la profundidad *solo se puede comunicar bien en cualquier casuística*...
            - **reservando siempre un parámetro exclusivo** para pasarle un `tracer` concreto
   - un `Progresser` personalizable
      - un *progresser* tampoco está vinculado a la clase concretamente
         - la clase es una entidad que reúne métodos
         - pero esa entidad puede vivir antes y después, usarse por otras llamadas, etc.
         - necesitas *progressers* no vinculados a la clase y personalizables en cada función
      - cada función, que llama a más funciones dentro, va particionando la responsabilidad que se inició en el método público original
      - de esta forma, cada parte del algoritmo puede particionar su franja de responsabilidad
         - y sincronizarla/avanzarla sin más información del exterior
   - un `Channel` que va sinronizándose
      - un *channel* tampoco está necesariamente asociado a la clase de dominio, de hecho, rara vez sucedería
      - necesitas *channels* no asociados a la clase, y que puedan venir de fuera del método
   - La idea es que una clase de dominio **no es la localidad de** este tipo de herramientas
      - si la clase de dominio no es donde está el tracer, no puedo hacer `this.tracer`
      - ni `this.progresser`, ni `this.channel`
      - **necesariamente**, tengo que poder **inyectar en cualquier función** un *tracer*, *channel*, *progressBar*, etc.
      - y se ve claramente que son, otro tipo, de parámetros
         - la función tiene sus parámetros propios
         - pero estos agentes (`tracer`, `progresser`, `channel`) son:
            - herramientas del proyecto
            - externas a la función
            - que *no están vinculadas a un dominio específico*
            - que *deberían poder inyectarse en todas las funciones*
         - cuando estas propiedades se reúnen, ese parámetro es candidato a propiedad transversal del `FunctionSettings`

Reflexión:

- Es cierto que son features muy avanzadas y a menudo innecesarias
   - Pero lo conozco, yo hablo para muy a futuro, cuando consigas todo lo que quieres
   - Y te des cuenta que:
      - *oh, si tuviera esto desde el principio, pero ahora... impleméntalo, sabes!*
   - Antes de que esto pase, esta guía te avisa:
      - *hay, un día, en el futuro, que quieres esto*
      - y no haber empezado desde el principio con ello, va a hacer que...
         - abandones el proyecto, o
         - te dé mucha pena no poder implementar estas features, o
         - depende de cómo, lo puedas implementar, pero si es grande, va a tocarte muchas cosas
   - Por todo esto, es mejor que empieces ahora a hacerlo así desde el principio, y sepas por qué
   - La ley es:
      - En los métodos públicos siempre se hace el retorno de una llamada a un método privado
      - En los métodos privados
         - el primer parámetro siempre es un objeto
         - el primer parámetro tiene todo lo que necesitas saber para que el método funcione
         - el segundo parámetro ya son meta-parámetros
         - la firma siempre es esta
         - te reservas los siguientes parámetros para *lo que pudiera venirse*

### Norma 2. La firma de los parámetros de todos los métodos privados siempre es la misma

- Lo que hablábamos, esto garantiza escalabilidad y orden a cambio de un poco de legibilidad
- La firma es esa:
   - `parameters:Object`
   - `settings:Object` con un valor polifyler por defecto
      - este parámetro tiene que tener un estado muy previsible
      - porque sus funcionalidades son satelitales al dominio de la función
         - va a pasar mucho que las propiedades de `settings` sí estén, pero también que no estén
         - si su valor es previsible, puedes jugar con esas propiedades sin incurrir en comportamientos no esperados
         - si tienes tracer bien, si no, o un condicional o un polyfill
            - pero son objetos y llamadas que si pudiéramos hacer pequeñas, o pintarlas de otro color
            - nos transmitirían mucho mejor el papel que están cumpliendo
            - porque son parte de las features que queremos incorporar en la función
            - pero no son parte del dominio concreto de la función
            - o sí lo son, pero también de muchas otras, de muchos otros dominios

### Norma 3. Las variables locales destacables de una función van al principio y con let

- Las variables locales más interesantes del algoritmo van arriba del todo, como:
```js
let output = undefined;
```
- Normalmente, el `output` es la más interesante de las variables, y es la primera y la última de la función
- Se usa `let` y no `const` porque:
   - se espera que estas variables sean modificadas
   - esas modificaciones ocurrirán dentro de ámbitos
   - pero tienen que estar accesibles más allá del ámbito que las inicializó o modificó
   - porque vamos a crear muchos ámbitos, Norma 4.
- La idea es, entonces, definir cada variable con un `let` y por orden de interés final
```js
// Valor final:
let output = undefined;
// Valores intermedios:
let intermediate1 = undefined;
let intermediate2 = undefined;
let intermediate3 = undefined;
```
- Luego hay otras variables que son más locales

Beneficios:

- Al entrar, ya ves rápidamente los datos un poco más interesantes que se van a usar.
   - Esto te permite usar CTRL+D para moverte rápido por las menciones y hacerte una idea más rápido de qué hace
   - Es compatible con crear muchos ámbitos nominados, que es la [Norma 4 - Ámbitos para todo](#norma-4-ámbitos-para-todo).

Reflexión:

- Yo siempre usaba `const`
   - Pero no puedes usar ámbitos entonces, y aclaran demasiado para no explotarlos

### Norma 4. Ámbitos para todo

- Los ámbitos aunque no uses `break`, mételos
- Aclaran mucho la secuencia
- Permiten englobar pasos
- Y finalmente, si lo necesitas, puedes tirar un `break` rápidamente
- Un ejemplo:
```js
Paso_1: {
   this.step1();
}
Paso_2: {
   this.step2();
}
Paso_3: {
   this.step3();
}
```
   - Es cierto que hemos convertido 3 líneas en 9
   - Pero también:
      - hemos puesto nombre a los pasos de la secuencia
      - hemos desacoplado métodos y pasos de secuencia
   - Para mí, es de las cosas que más aclara
   - Piensa en luego, entrar y ver las partes de una función
   - Piensa en luego, debugar cada fragmento de función, para cazar rápido de dónde viene el comportamiento no deseado
      - Solo tienes que poner console.logs al principio de cada ámbito
      - De la otra forma, tienes que reconstruir la intención de cada parte de la función nuevamente
         - que es no solo tiempo, sino también energía
      - Personalmente, no hay debate, aunque ChatGPT lo llamase "ruido", ni caso
         - sí, a nivel computacional no es lo óptimo
         - pero es que la computación no es el eslabón débil de la cadena aquí

### Norma 5. Los tipos try-catch

- La gestión de errores es una de las partes con las que más vas a estar dialogando en el desarrollo
- Interesa distinguir qué try-catches:
   - Silencian errores
      - un método que hace `catch` pero no vuelve a hacer un `throw` debe ser muy violento para ti a la hora de leer código
      - porque podría estar silenciando fallos importantes o con efectos colaterales y ni siquiera tienes un log que te avise
   - Debugan errores
      - un método que hace `catch` + `console.log` + `throw` es un try-catch de debugación
      - debería ser temporal y retirarse en algún momento
   - Controlan el flujo
      - los try-catch que *no siguen estos patrones anteriores* es probable que sí sean controles de flujo
      - estos try-catch vienen a decir que aunque salte un error, no es un comportamiento no previsto
      - este grupo de try-catch serían los que continúan a producción solamente

### Norma 6. Un único return por función, usa breaks si se complica

- Parece un consejo raro, porque luego te queda todo de breaks y tienes que reseguir el recorrido.
- Pero a la larga, querrás saber por dónde sale, y tener varios returns te va a complicar
- Más profundidad al problema:
   - en el fondo, un algoritmo se va componiendo por una suma de intenciones
   - no se ven, pero son intenciones lo que da sentido a cada línea de código
   - entonces las intenciones se van cruzando en una misma función
   - y lo que ayuda a aclarar eso es partirlo a otra función
      - o a otro snippet inyectable, con `$compile.inject.{source,module}`)
   - y lo que ayuda a aclarar eso es partirlo a otra función
   - y los ámbitos son un paso previo a *partirlo a otra función*
   - es decir, escribiendo una función, ya estás partiendo esa función, en líneas
      - pero entre la intención de la función y la intención de la línea, hay un mapa de carreteras
      - tu función, como programador, es diseñar ese mapa de carreteras
      - pues cada carretera es una intención de la función, tiene varias, es un mapa
         - hay carreteras que a veces no recorres, como el bloque no activado de un condicional
      - y cada línea está suscrita a una carretera
         - aunque no se vea, la línea `tracer.trace("UnaClase.unMetodo", arguments)` tiene una intención
         - y la línea `return 4 + c;` tiene otra intención
         - y la función en sí, tiene otra intención
            - pero puede pasar por cualquiera de esas carreteras con los parámetros adecuados
            - es decir que la función que hace `tracer.trace("...")` tiene una *subintención* más que la que no lo hace
               - en este caso, podríamos decir, que es:
               - *dejar una traza al iniciar la función conforme a un sistema de traza estandarizado anterior*, por ejemplo
   - perfecto, ¿qué tiene que ver las subintenciones de una función con poner un único `return`?
      - que hay 1 intención unificada en esa función de retornar algo con lo que ha entrado
      - y esa intención está en 1 único sitio
      - es en pasos anteriores donde se puede decidir qué contenido promociona esa intención
      - aclara la lectura
      - aisla el punto de salida
   - los `breaks` bien explicados pueden aclarar la intención que se cumple en cada fragmento de la función
   - cuando muchas intenciones convergen, te interesa tener un mapa claro, y no returns desperdigados
      - porque si es así, entras, hook antes del return, y te enteras
   - los ambitos aclaran la intención que cada fragmento de función está teniendo
      - la función se puede ver entonces como un sandwich con capas de intenciones
      - cada capa del sandwich se corresponde con un ámbito
         - y hay capas de capas
      - o siguiendo el ejemplo de las carreteras, o un queso agujereado
         - los `breaks` son caminos que te devuelven rápido a la carretera principal
         - pero el `return` siempre al final, y 1 único
            - aclarará mucho cuando vuelvas a entrar
               - tienes que usar los ámbitos y `breaks` bien, pero sí
            - te agilizará un posible debugging
               - de *qué pasa al final* y
               - en *todos los casos*

### Norma 7. Una pequeña memoria intrafunción te permitirá transportar el estado de la función a otras rápidamente

- A veces quieres fragmentar una función porque, simplemente, se está haciendo muy grande y cuesta de seguir
- Pero te encuentras con el problema que hay valores interesantes desperdigados 
- E intentas correr, e irlos reuniendo en cada llamada, verdad?
- VERDAD O NO!
- Pues la solución es una memoria intrafunción
- Creas un objeto `const memo = {};`
- Como esto entra en contradicción con usar `let` la solución que se propone es:
   - mantienes la implementación con `let` igual
   - y fabricas getters y setters como propiedades, así:
   ```js
   let output = undefined;
   let question = arguments[0];
   let state = "started";
   let message = null;
   const memo = {
      get question() { return question; }
      get state() { return state; }
      get message() { return message; }
      set question(value) { question = value; }
      set state(value) { state = value; }
      set message(value) { message = value; }
   };
   ```
   - se esta sencilla forma, puedes llevar tu memoria intrafunción a cualquier otra función
   - y esta feature es una candidata fuerte para usar como `FunctionSettings`
      - pero cuidado!
      - va a haber muchas funciones cruzándose
      - no solamente le querrás pasar la intramemoria de 1 función
      - por tanto no puedes ocupar el `settings.memo` simplemente
         - tendría que ser si un caso `settings.memos["functionId"]`
   - pero de momento queda fuera de rango decidir si es una buena idea
- Simplemente recordar que el diseño del lenguaje de JavaScript tiene esta limitación
   - que es una herencia de los lenguajes de tipo `C/C++`
   - y va unido al concepto de encapsulación funcional
      - en el momento que las variables creadas en una función no están visibles en otra
      - hablamos de encapsulación funcional
      - y toda esta rama de lenguajes de programación la heredan
      - y muchos otros
      - y la academia parece haber convergido en que esto es buena decisión
      - pero digamos, esto no es el debate, suficientemente difícil ya es, hay que reconocerlo
   - pero al menos llegamos a la conclusión de que esta diferencia existe
      - porque no tenemos un lenguaje aprendido que no tenga esta limitación y sea funcional a la vez
   - pero llegar a reconocer la feature como *limitación lingüística para facilitarnos el trabajo humano*
      - pero *limitación lingüística*
   - y reconocer que esta solución, de *memoria intrafunción* es el parche que proponemos desde aquí y ahora
      - y en adelante
      - todo esto **para poder delegar fragmentos de función a otras funciones rápidamente**
- Al final, encontraríamos códigos como este:
```js
class ProcesoEjemplo {
   _por2(args, {memo}) {
      memo.step = 2;
      memo.parts.push(args.input * 2);
   }
   _por3(args, {memo}) {
      memo.step = 3;
      memo.parts.push(args.input * 3);
   }
   _por4(args, {memo}) {
      memo.step = 4;
      memo.parts.push(args.input * 4);
   }
   tripleMultiplicacion(args = {}) {
      // Output:
      let output = undefined;
      // Function state:
      let step = 1;
      let parts = [];
      // Inner:
      let memo = undefined;
      Validation: {
         assert(typeof args === "object", `Parameter args must be object on ProcesoEjemplo.tripleMultiplicacion`);
         assert(typeof args.input === "number", `Parameter args.input must be number on ProcesoEjemplo.tripleMultiplicacion`);
      }
      Initialize_memory: {
         memo = {
            get step() { return step; }
            get parts() { return parts; }
            set step(val) { step = val; }
            set parts(val) { parts = val; }
         };
      }
      Digest_input: {
         this._por2(args, memo);
         this._por3(args, memo);
         this._por4(args, memo);
      }
      Return_output: {
         output = memo.parts;
         return output;
      }
   }
}
```
- La crítica sería:
```js
class ProcesoEjemplo{tripleMultiplicacion=(i)=>[i*2,i*3,i*4]}
```
- Y es correcto, es una crítica dura: *JavaScript tiene una versatilidad extrema*
- Me refiero a funciones grandes que se te puedan complicar
- Donde quieres mezclar muchas más *intenciones de debugging y control*
- Pero es una buena crítica, y la vamos a integrar con la siguiente norma
- Look, boy, JavaScript es increíblemente versátil
   - pero desde una función no puedes entrar en otra si no has puesto mecanismos para ello expresamente
   - la `memoria intrafunción` permite cierto juego, de acceso a información o llamadas incluso
   - pero no está terminado el juego todavía
   - necesitas poder hacer `return`
   - y después del `return` vienen el `break` y el `continue` y el `throw` tiene sentido también
   - y con todo esto, simplemente tienes herramientas para poder comunicarte entre ámbitos de función diferentes
   - pero desconozco el impacto en performance o memoria de toda esta ingeniería
      - yo me limito a describir los patrones que luego, de encontrarte, piensas...
      - *mi forma de solucionar no contempla este tipo de problemas*
      - pues las normas 8 y 9 hablarán de esto

### Norma 8. Diferentes estilos de redacción de función según el uso que quieras darle

- El consejo de memoria intrafunción y su crítica son paradigmáticos
- No todas las funciones requieren de la sobreingeniería de los consejos anteriores
- Pero te estoy proponiendo funciones estandarizadas para un sistema cross-APIs.
   - si quieres dejar funciones fuera del sistema, que no sigan el estándar ya es suficiente
   - sin embargo, piensa en qué funciones te va a interesar, en un futuro
      - poder trackear su progreso, o
      - incrementar sus features de manera transversal con otras funciones de otras APIs
      - sobre todo esa transversalidad con otras funciones de otras APIs es...
      - lo que realmente te lleva a la conclusión de `parameters:Object, settings:Object` de los métodos privados
- Por tanto, no todas las funciones son candidatas a featurizar con:
   - *firma de argumentos fija*
   - *intramemoria*
   - *ámbitos descriptivos*
   - *return único* y *juego con breaks*
- Yo metería todas ahora mismo
- Pero hay funciones muy sencillas que no te van a dar prob...
- Mira. Nada más que quieras tracear una función
   - Necesitas decirle cuál es el tracer
   - Fin de la discusión, nos volvemos a encontrar cuando estos patrones te hayan supuesto un golpe crítico en la performance
   - Si no te sucede esto, este es el patrón, y te recomendaría más bien que incluyas a todas tus funciones en estos patrones de codificación
   - Porque lo que estamos es controlando el sistema que construimos desde lo más abajo posible
   - Y las funciones es la unidad mínima
   - Entonces al final habrá 2 tipos de funciones: las que controlas, y las que se te escapan
   - Te interesa que caigan en las que controlas
   - Todos estos consejos:
      - te facilitarán la comprensión
      - estandarizarán tu redacción y
      - te permitirán boostear las posibilidades de tu código de una forma poco dolorosa
   - Sí, hay funciones que te da igual, como todas las funciones de librerías externas en general que no vas a controlar
   - Y sí, hay funciones que son muy sencillas, y no merecen trackeo
   - Pero si es una función que quieres controlar, hazla así y punto.
   - Si no lo haces, acepta que esa función no está bajo control, y no hay problema
   - Pero, si quieres, trackear todos los procesos, fine-grainear el monitoreo de todas las operaciones posibles, deberías seguir las pautas.

### Norma 9. Para juntar fragmentos de código tienes $compiler.inject.source


- Hay funciones que se hacen muy largas
   - y quieres componerla a partir de varias funciones distintas
   - y que compartan info, como con la *intramemoria*
   - pues `$compiler.inject.source` y no `$compiler.inject.module` te puede ayudar a ello
- Inicialmente esta norma se llamaba así:
   - **Los return, break, continue y throw entre subproceso y superproceso**
   - Pero acabo cayendo en que el `$compiler.inject.source` ya nos cubre
   - Lo dejo para que se vea el proceso, todavía, a estas alturas, de lo claro que está todo
- Nosotros dividimos una función en varias
   - pero cada función tiene sus propios parámetros
   - esto lo hemos resuelto con *intramemoria* que se pasa como parámetro
   - con la *intramemoria* tenemos acceso a variables y funciones de la función anterior
   - pero hay estructuras de control del flujo que no están al alcance
   - son la misma función pero fragmentada, y tenemos una memoria compartida, pero:
- JavaScript no tiene una instrucción para decir:
   - *lanza un error desde la función que me ha llamado*
   - *rompe el bucle de la iteración en la que la función que me ha llamado se encuentra*
   - *haz que la función que me ha llamado retorne este valor*
- Son casos que normalmente solucionaríamos escribiendo en un lado y en otro código
- Y en muchos casos, es mejor que empezar a meter más cosas
- Pero deberías tener una solución para estos casos:
- Y la solución pasa por una pequeña API que te ayude a entitizar estas señales de control de flujo (`return`, `break`, `continue` y `throw`)
```js
class FluxControl {
   static AbstractSignal = class AbstractSignal { constructor(val) { this.value = val; } }
   static ReturnSignal = class ReturnSignal extends AbstractSignal {}
   static BreakSignal = class BreakSignal extends AbstractSignal {}
   static ContinueSignal = class ContinueSignal extends AbstractSignal {}
   static ThrowSignal = class ThrowSignal extends AbstractSignal {}
   static isSignal(signal) {
      return signal instanceof this.AbstractSignal;
   }
}
class Proceso {
   procesoGeneral() {
      let response = undefined;
      response = this.subproceso1();
      if(FluxControl.isSignal(response)) {
         if(FluxControl.isReturn(response)) return response.value;
         if(FluxControl.isBreak(response)) break;
         if(FluxControl.isContinue(response)) continue;
         if(FluxControl.isThrow(response)) throw response.value;
      }
      response = this.subproceso2();
      if(FluxControl.isSignal(response)) {
         if(FluxControl.isReturn(response)) return response.value;
         if(FluxControl.isBreak(response)) break;
         if(FluxControl.isContinue(response)) continue;
         if(FluxControl.isThrow(response)) throw response.value;
      }
      response = this.subproceso3();
      if(FluxControl.isSignal(response)) {
         if(FluxControl.isReturn(response)) return response.value;
         if(FluxControl.isBreak(response)) break;
         if(FluxControl.isContinue(response)) continue;
         if(FluxControl.isThrow(response)) throw response.value;
      }
   }
   subproceso1() {
      if(isToday()) {
         return new FluxControl.ReturnSignal("Is today!");
      }
      if(isTomorrow()) {
         return new FluxControl.ContinueSignal();
      }
      if(wasYesterday()) {
         return new FluxControl.ThrowSignal("It was yesterday!");
      }
   }
   subproceso2() { ... }
   subproceso3() { ... }
}
```
- Nótese que el fragmento se repite 3 veces y acaba ocupando gran parte de la función:
```js
if(FluxControl.isSignal(response)) {
   if(FluxControl.isReturn(response)) return response.value;
   if(FluxControl.isBreak(response)) break;
   if(FluxControl.isContinue(response)) continue;
   if(FluxControl.isThrow(response)) throw response.value;
}
```
- Es exactamente el mismo snippet, repetido 3 veces
- Vale, pues para esto, hay alguna sintaxis en el `$compiler`, para que en tu código no se vea ese chorro de JS
   - que por otro lado **es necesario** para poder darle esta funcionalidad
- Quiero que se vea que lo único que estamos intentando es que 2 funciones compartan memoria y control de flujo
   - que 2 funciones se complementen para actuar como 1 misma función compuesta
   - que 2 funciones se comporten como 2 plantillas, una después de la otra
- Con esta feature no estamos dotando de poderes extra
   - solo queremos hablar en nombre de la función superior
   - y por diseño, desde C, esto no se puede hacer
   - y son políticas de seguridad del lenguaje, no es que "no se pueda hacer"
      - es simplemente que el diseño de los lenguajes tipo C aceptan como deseable que esto no se pueda hacer
      - y es razonable estar de acuerdo con ello, en general
   - pero C++ creo recordar que sí tenía plantillas
   - nosotros con `$compiler` ahora también
   - y este problema, que surge a raíz de no tener la feature de plantillas
   - solo se puede solucionar con plantillas, no hay una solución programática real posible
      - si te metes en el V8 puede ser, probablemente, pero ahora mismo, esto es así, y es una feature muy rara y que dudo que sea ni deseable tener
      - ¿por qué entonces?
      - porque para aprender, tener muchas opciones tampoco creo que sea lo mejor
      - pero cuando avanzas, y tienes funciones que hacen muuuuuuchas más cosas que sumar 2 números
      - ahí sí vas a ver interesante poder interrumpir funciones superiores
      - y ahí te vas a encontrar que tienes que estar pegando código entre línea y línea
      - y piensas: *es correcto? Estoy haciendo bien? Me estoy dejando algo?*
      - pues ahí recuerda que con un poco de magia de este tipo, `nyc` te hace *cobertura de código*
         - no es instrumentalizar, pero sí es código que podrías poner desde el árbol AST automáticamente, igual que `nyc`
         - lo que pasa que no es global, son cachos de funciones donde quieres permitir
         - a subfunciones hacer cosas que quedan fuera de rango por diseño en el lenguaje
         - y con ese proceso de *instrumentalización-like*, manipulando el AST con instrucciones supersencillas:
         - podrías conseguir un parche localizado
      - quiero decir que es un approach poderoso, y efectivo, y hay precedentes
      - aunque el código que resulta es feo, y de dudosa calidad, igual que los instrumentalizados
         - el efecto no podrías conseguirlo de otra manera con JavaScript
   - pero bueno, es el dilema de que es un código feo, y no estamos seguros
   - pues ya te lo digo yo: es que no hay otra forma, fin del asunto
- Es problemático, pero la solución es bastante sencilla, por lo cual, se deja el ejemplo para tener un modelo
- Probablemente se preste una API para estos casos
- Recalcar que todo esto es para poder escribir una función en varias funciones distintas

**Vale, un momento, olvida todo esto anterior.**

Vale, dejo la reflexión anterior, para que conste cómo es el proceso. Pero acabo de caer en que:

```js
function procesoGeneral() {
   $compiler.inject.source("./step1.js")
   $compiler.inject.source("./step2.js")
   $compiler.inject.source("./step3.js")
}
// ./step1.js:
if(whatever) continue;
if(whatever) break;
if(whatever) throw {};
if(whatever) return {};

// ...
```

- Ooooookay, bueno, me alegro de haber llegado al final del asunto
- Entonces, todo lo que había dicho antes, nada, basura
- Usas `$compiler.inject.source`
- OJO! No `$compiler.inject.module` porque ese te wrapea el código, y:
   - el `return` ya no sirve porque estás en otra función
   - el `throw` tendrá otro contexto de función
   - el `continue` y el `break` ya no sirven porque están en otro contexto de función
- PERO! El `$compiler.inject.source` sí puede hacerlo, no es problema
- Claro, el problema es reutilizar el código
- Se supone que si son partes de la misma función, esas partes no son reutilizables
   - Y si sí son reutilizables, pero quiero llamar a estas operaciones de la función superior?
   - Entonces se estaría liando mucho la cosa, porque
   - me estás pidiendo de manipular *cualquier función superior*
   - y eso si que no puedes llevarlo de ninguna manera y no te interesaría tampoco
   - Entonces, no, de momento hay solo estos 2 casos:
      - Funciones que quieren usar el `return/continue/break/throw` de arriba
         - porque son la misma función que la de arriba, solo que en un fragmento concreto
         - perfecto, acabas de describir la intención de `$compiler.inject.source`
      - Funciones normal y corrientes que hacen sus cosas sin preguntarse sobre la función superior
         - perfecto, JavaScript entero está pensado, y desde C viene la tradición, para que sea así
      - Ya está, no hay más, lo hemos solucionado
- No hagas el rollo de los `if` y los `FluxControl`.

### Norma 10. Puedes extender clases con objetos-rasgo y la cláusula static

- Hay una función sintáctica de JavaScript relativamente nueva
   - que permite cruzar objetos para definir tanto propiedades static como prototype
   - es la fórmula más rápida y clara de meter herencia horizontal sencilla en clases JavaScript
   - rápidamente querrás un `mergeByStrategy` para mezclar con cierta lógica y no simple sobreescritura, pero esto luego
- El caso es que de hace un tiempo se pueden mezclar rasgos programáticos en runtime para definir una clase sin salir de la clase:
```js
const assert = c => if(!c) throw new Error("Assertion error arised");
const StaticTrait1 = {
   st1: 1,
};
const StaticTrait2 = {
   st2: 2,
};
const PrototypeTrait1 = {
   pt1: 1,
};
const PrototypeTrait2 = {
   pt2: 2,
};
class Mixture {
   static {
      Object.assign(this, {
         ...StaticTrait1,
         ...StaticTrait2,
      });
      Object.assign(this.prototype, {
         ...PrototypeTrait1,
         ...PrototypeTrait2,
      });
   }
}
const mixture = new Mixture();
assert(Mixture.st1);
assert(Mixture.st2);
assert(mixture.pt1);
assert(mixture.pt2);
```
- Y lo de `mergeStrategy` viene a que te interesará rápidamente tener lógicas específicas al mezclar ciertas propiedades, no simple sobreescritura:
```js
const Humano = {
   tipo: "mamífero",
};
const Lagartija = {
   tipo: "reptil",
};
class HombreLagartija {
   static {
      Object.assign(this, Humano, Lagartija);
      Object.assign(this.prototype, Humano.prototype, Lagartija.prototype);
      Y_aqui_queremos_logicas_especificas: {
         this.prototype.tipo = new Set(...[Humano.tipo, Lagartija.tipo]);
      }
   }
};
assert(HombreLagartija.prototype.tipo.includes("mamífero"));
assert(HombreLagartija.prototype.tipo.includes("reptil"));
```
- Puedes hacerlo a mano de momento, o puedes llevarlo a más con una API
- pero lo importante es que te hagas una idea ya de esta nueva fórmula para extender clases

### Norma 11. Explica los algoritmos que se hacen más difíciles con las sintaxis de markdown en comentarios de CompilerV6

- Tienes varias sintaxis a tu disposición para explicar en markdown los algoritmos
- `/**` y `*/` para párrafos
- `///@@:` para párrafos inline
- `///@:` para líneas inline
- `///@+:` para línea con incremento tabular de 1
- `///@+++:` para línea con incremento tabular de 3
- `///@-:` para línea con decremento tabular de 1
- `///@---:` para línea con decremento tabular de 2
- `///&:` para continuación de línea con espacio intercalado
- `///&&:` para continuación de línea sin espacio intercalado
```js
///@~0: - Declaración de variables de nivel 1
///@+: - El output
let output = undefined;
///@-: - Declaración de variables de nivel 2
///@+: - El intermediate value 1
let iv1 = 0;
///@: - El intermediate value 2
let iv2 = 0;
///@: - El intermediate value 3
let iv3 = 0;
///@-: - Inicio de bucle
for(let i=0; i<10; i++) {
   ///@+: - Incremento de intermediate value 1
   iv1 += 1 * i;
   ///@: - Incremento de intermediate value 2
   iv2 += 2 * i;
   ///@: - Incremento de intermediate value 3
   iv3 += 3 * i;
   ///@: - Fin de bucle
}
///@-: - Suma de acumulación de valores intermedios
output = iv1 + iv2 + iv3;
///@: - División de la acumulación entre el número de valores intermedios
output = output / 3;
///@: - Retorno
return output;
```
- Parece que no, pero el esfuerzo de indentar la salida hará mucho más claro el markdown
- Pero es un coñazo y un tiempo mantener esto
   - si puedes enseñar a un LLM a que lo documente, mejor, te quitas toda esa faena, y te hace de pair programmer + qa + etc
- Queda en duda que esto ayude
- Pero si son algoritmos que se hacen muy complicados de seguir la intención, sí yo creo.

### Utilidad 1. Tienes los splittable.ClassName.class.js para hacer varias ediciones de golpe

- La funcionalidad CTRL+D en esta forma de edición la perdemos
   - porque al estar dividido en diferentes ficheros, no podemos encontrar matches de otras funciones
- Para esto nace el splittable class file
   - creas un `splittable.<ClassName>.class.js` en el directorio donde quieras editar varios `{prototype,static}.*.js`.
   - solo funcionará si solamente hay 1 clase dentro del splittable
   - el proceso afecta al `touchFile` y por tanto a todos los eventos `touch`, y dice así:
      - si el fichero es un `@/src/**/splittable.*.class.js`
      - solo funciona si dentro hay una clase
      - solo aplica si los métodos son prototype o static
      - guardar un splittable va a hacer que haya cambios en todo el directorio
         - por lo cual, el touchFile hace mutes y unmutes para ignorarlos
         - luego del proceso, y unmutear el directorio, lanzará un touchFile programático al class
      - si tiene un valor de ` = null;` significa que quieres leerlos
      - si tiene un valor de otra cosa significa que quieres sobreescribirlos
      - al final del proceso se vuelve a generar el splittable.class.js pero teniendo esto anterior en cuenta
         - se reconstruye la clase rellenando los null con el valor actual, básicamente