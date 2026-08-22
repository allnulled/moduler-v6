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