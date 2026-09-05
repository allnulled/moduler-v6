# API de Std.Checker

La **motivación** de centrarse en el `Checker` y el `Asserter` tan tempranamente es porque:

- Sobre el `Checker`:
   - Las expresiones booleanas son las operaciones más elementales del lenguaje
   - Se van a repetir mucho: normalizarlas nos puede facilitar mucho la lectura
   - `Checker` se encarga de esto precisamente
   - `Checker.createCheck` se encarga de esto precisamente
   - Todos los métodos que siguen admiten alternativamente `check(x).is.not.{método}`:
      - `check(x).is()` // como el equal ===
      - `check(x).is.defined()` // or not undefined
      - `check(x).is.truthy()` // como !!
      - `check(x).is.falsy()` // como !!!
      - `check(x).is.boolean()`
      - `check(x).is.number()`
         - `check(x).is.integer(a)`
         - `check(x).is.float(a)`
         - `check(x).is.infinity(a)`
         - `check(x).is.naN(a)`
      - `check(x).is.array()`
         - `check(x).is.empty()`
      - `check(x).is.string()`
         - `check(x).is.empty()`
      - `check(x).is.object()`
         - `check(x).is.empty()`
      - `check(x).is.null()`
      - `check(x).is.function()`
      - `check(x).is.instanceOf(a)`
      - `check(x).is.date(a)`
      - `check(x).is.lessThan(a)`
      - `check(x).is.moreThan(a)`
      - `check(x).is.equalTo(a)`
      - `check(x).is.equalOrLessThan(a)`
      - `check(x).is.equalOrMoreThan(a)`
      - `check(x).has.property(a)`
      - `check(x).has.value(a)`
      - `check(x).its(y)` // aquí la API se repite pero habiendo checkeado que x[y] es accesible
      - `check.onSuccess = callback` para cambiar el comportamiento en aciertos
      - `check.onError = callback` para cambiar el comportamiento en errores
      - `check.value` para acceder al valor seleccionado
      - `check.not` para saber si está negando o no (default `false`)
      - `check.operation` para saber la operación que tiene cargada (default `null`)
      - `check.clone` para crear una copia con los mismos {.onSuccess, .onError, .value, .not, .operation}
      - `check.predicatesOf.{is,has,its}` para saber las funciones que se permiten en cada verbo
      - `check.and` y `check.it` para concatenar expresiones
   - Un ejemplo de uso sería:
      - `check(x).has.property(y) && check(x).its(y).is.function()` // aquí se ve cómo comprobar antes si la propiedad existe

```js
console.log(check(500, `Este error se debe a que bla bla bla`).is.number());
console.log(check(500, {
    message: "Mensaje del error",
    esPorMalUso: 0,
    esNuevo: 0, // 
    esExterno: 0, // 
    esEsperable: 0, // 
    esTolerable: 0, // 
    esAislable: 0, // 
    esReproducible: 0, // 
    esLegible: 0, // 
    estaConcentrado: 0, // 
    esPocoConcurrido: 0, // 
    noSePropaga: 0, // 
    esAltoNivel: 0, // 
    esFacil: 0, // 
}).is.number());


check({ name: "carlos", age: 35 })
    .is.object({
        esPorNuevasFeatures: 0,
        tieneCulpaElUsuario: 0,
        eraDeEsperar: 0,
        noEsCritico: 0,
        noEsMuyConcurrido: 0,
        noSePercibe: 0,
        esUnCasoDeUsoRaro: 0,
        noEntraEnLaEspecificacion: 0,
        eraUnaFeaturePocoEstable: 0,
        esFacilmenteSeparable: 0,
        esFacilmenteReproducible: 0,
        esFacilmenteLegible: 0,
        ...{
            tienePocasCausas: 0,
            tieneOrigenAccesible: 0,
            tieneCausasAccesibles: 0,
            tienePocasConsecuencias: 0,
            tieneConsecuenciasAccesibles: 0,
            tieneFinalAccesible: 0,
        }

        esIdentificable: 0,
        esUnaUnidad: 0,
        noEstaMezclado: 0,
        esPorParametros: [1, {
            sePorQueRecibeMalosParametros: 0
        }],
    })
    .its("name")
        .is.string("Property «name» must be stirng")
        .is.equalTo("carlos", "Property «name» must be 'carlos'")
        .back()
        .root() // también debería poderse, por qué no
    .its("age").
        .is.number("Introduce una edad válida")
        .is.greaterThan(34, "No puede ser menos de 35 porque tal y cual en el índice ${x} la posición ${p}")
        .is.lessThan(36, "No puede ser más de 35")

```

