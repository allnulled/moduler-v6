# La API de Std.classes.Asserter

- Sobre el `Asserter`:
   - Uno de los usos es enviar condiciones booleanas a errores en el flujo común
   - `Asserter.createAssert` se encarga de esto precisamente
   - En la API del `Asserter` tenemos:
      - `assert(condition, message)`
      - `assert.throw(callback, message, secondCondition)`
      - `assert.not.throw(callback, message, secondCondition)`
      - `assert.check` que por defecto apuntaría al `Checker.globalInstance`
         - con este puedes hacer los `check(x).{is,has,its}` y lanzará el error además del check condicional

```js
const assert = Asserter.create({
    check: Checker.create({
        onStart() {},
        onSuccess() {},
        onError() {},
        onFinally() {},
    }),
    onStart() {},
    onSuccess() {},
    onError() {},
    onFinally() {},
});
assert.check(100).is.number();
```