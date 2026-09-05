# Guía general de Std

### La Core Std API

La `Core Std API` es el nivel más bajo de API dentro del Std: todas las demás pueden querer usar algo de ello, y se entiende que debe estar accesible

#### La reducción algorítmica universal

- Punto 1: parámetros de función privada
- Punto 2: inicialización de variable de salida
- Punto 3: inicialización de variables intermedias
- Punto 4: digestión
- Punto 5: retorno

#### Principales decoraciones de la reducción algorítmica universal

- Asinquificación: que sea async ya es una decoración, nativa.
- Trificación/Aislación: cuando la digestión se produce en un try-catch-finally
   - Produce los hooks de:
      - onInitialize: devuelve 1 objeto con las variables intermedias
      - onTry: la función, mismamente
      - onCatch: lo del catch
      - onFinally: lo del finally
   - El Std.classes.Isolate soporta los 4
- 

```js
const Example_State = {
    errors: [],
};
const Example_Metadata = {
    pid: "Example_Class.prototype.Example_Process~1.Validation",
};
const Example_Steps = {
    receive: algo.receive,
    validate: algo.validate,
    transform: algo.transform,
};
const Example_Cycle = ["receive", "validate", "transform"];
const Example_Catch = {
    name: Example_Metadata.pid,
    message: `Validation of «Example_Process» failed for some reason`,
};
const Example_Success = {
    name: Example_Metadata.pid,
    message: `Validation of «Example_Process» has finished successfully`,
};
const Example_Finally = {
    name: Example_Metadata.pid,
    message: `Validation of «Example_Process» has finished successfully`,
};

Std.Isolate.new.configure({
    name: "Validation of {something}",
    async: true, // hace el proceso con una async function
    scoped: true, // hace .call(this)
    state: Example_State, 
    onCatch: Std.Catch.new.configure(Example_Catch).make({ trace: true }),
    onSuccess: Std.Success.new.configure(Example_Success).make({ trace: true }),
    onFinally: Std.Finally.new.configure(Example_Finally).make({ trace: false }),
    runnables: Example_Steps,
    life: Example_Cycle,
}).make("life", {}, "runnables"); // Aquí le estoy diciendo: «El ciclo definido en la propiedad "life", basándote en el mapa de pasos definido en la propiedad "runnables"

Isolate.new.configure(...)).make(({ isolate }) => isolate.make("life", "runnables"))

Los `configure(...)` y `make(...)` sobrentienden que todas las propiedades que apuntas son **privadas** por lo cual, se prefijan con un "_" delante

// sync/async/new: para crear
// config: para manipular el estado
// return: para agrupar la ejecución/reuso de métodos

const iso = Isolate.async.configure(...);

iso.make(function() {
    return this.make(action = String|Function|Array<Runnable>, injection = Object, actionables = String|Object, scope = any)
    return this.make()
    return this.make({
        cycle: "main", // (Runnable = (String | Function)) | Array<Runnable>
        steps: { main: console.log },
        scope: false, // force .call(this)
        params: { message: "local execution message" },
    });
    return this.make("main", {}, this, false); // Esto sería el: «por defecto» o make(undefined, undefined, undefined, undefined) o make()
    return this.make(() => {}, undefined);
    return this.make(function() {});
    // No es conflicto con make(Object) porque este es siempre make(Array):
    return this.make(["first", "second"], {startedAt:new Date()}, {first:x, second:y}, this);
}):
```

#### La herencia con flateneo de prototipos

#### La herencia con composibilidad por rasgos y por miembros

#### Booleanos y expresiones booleanas

- Confirmada en un: 100%
   - No hay dudas: el asserter contiene en `$assert.check` a un checker hookeado para que lance errores tipo asserter
   - Son 2 APIs diferentes, pero tienen que poder combinarse
   - Y el último punto para no mezclarlas en el Asserter es que:
      - assert es la función de aserción, no la instancia de `Asserter`
      - esto quiere decir que ni en `assert` está la API de `Asserter`
      - y en `check` ocurre igual: es una función, no es una instancia de `Checker` propiamente
      - es el caso de 2 APIs cuya entry es una función
         - es un caso un poco particular
         - y no porque no se puedan mezclar
            - es porque su marco de entrada de trabajo es una función común
            - no es una función de un objeto, es una función
            - 
- La API de Std.classes.Checker
- La API de Std.classes.Asserter

#### Cajas lógicas

- Confirmada en un: 94%
   - Hay dudas, porque probablemente puedan unificarse
   - Por tanto, está dentro, pero el formato se revisará
- La API de Std.classes.Isolator
- La API de Std.classes.Cycler

#### Errores

- Confirmada en un: 89%
   - Hay dudas, porque probablemente Proxy pueda estar de más, y las otras pueden unificarse
   - Por tanto, está dentro, pero el formato se revisará
- La API de Std.classes.ErrorFactory
- La API de Std.classes.ErrorProxy
- La API de Std.classes.ErrorHandler
- La API de Std.classes.ErrorDissector
- La API de Std.classes.ErrorProsecutor

#### Debug

- La API de Std.classes.Tracer

#### Clases y objetos

- Confirmada en un: 68%
   - Hay dudas, porque extends + static es muy poderoso de por sí y no necesita boilerplate
- La API de Std.classes.Merger.byStrategy
- La API de Std.classes.ClassBuilder

#### 
