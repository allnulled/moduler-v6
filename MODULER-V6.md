# ModulerV6: paper de concepción

En este paper se habla sobre ModulerV6 y CompilerV6 y sus fundamentos teóricos y prácticos.

## Índice

- [ModulerV6: paper de concepción](#modulerv6-paper-de-concepción)
  - [Índice](#índice)
  - [Explicación práctica](#explicación-práctica)
    - [Ejemplos práticos](#ejemplos-práticos)
    - [Inyectar desde js a js](#inyectar-desde-js-a-js)
    - [Inyectar desde js a css](#inyectar-desde-js-a-css)
    - [Inyectar desde js a md](#inyectar-desde-js-a-md)
    - [Inyectar desde js a html u otros textos](#inyectar-desde-js-a-html-u-otros-textos)
    - [Inyectar desde css a css](#inyectar-desde-css-a-css)
    - [Inyectar desde css a md](#inyectar-desde-css-a-md)
    - [Inyectar desde md a md](#inyectar-desde-md-a-md)
    - [Firma de importar: dependency:String](#firma-de-importar-dependencystring)
    - [Firma de importar: dependencies:Array](#firma-de-importar-dependenciesarray)
    - [Firma de importar: factory:Function](#firma-de-importar-factoryfunction)
    - [Firma de importar: dependencies:Array, factory:Function](#firma-de-importar-dependenciesarray-factoryfunction)
    - [Firma de exportar: String:id, dependency:String](#firma-de-exportar-stringid-dependencystring)
    - [Firma de exportar: String:id, dependencies:Array](#firma-de-exportar-stringid-dependenciesarray)
    - [Firma de exportar: String:id, factory:Function](#firma-de-exportar-stringid-factoryfunction)
    - [Firma de exportar: String:id, dependencies:Array, factory:Function](#firma-de-exportar-stringid-dependenciesarray-factoryfunction)
  - [Explicación teórica](#explicación-teórica)
    - [¿De qué se trata?](#de-qué-se-trata)
    - [¿Qué resuelven?](#qué-resuelven)
    - [¿Cómo se usan?](#cómo-se-usan)
      - [¿Cómo se instala?](#cómo-se-instala)
      - [¿Cómo se importa?](#cómo-se-importa)

## Explicación práctica

En esta sección se habla de los fundamentos práticos.

- Principalmente serán ejemplos de código para recordar rápidamente cómo se hacen las cosas.
- Pero pueden intercalarse secciones de explicación o pregunta

### Ejemplos práticos

Los siguientes ejemplos incluyen el uso tanto de `CompilerV6` como de `ModulerV6`.

- ver la sección de [¿Cómo se usan?](#cómo-se-usan) para recordar qué implica usar uno y otro.
- el ejemplo no va a atender a diferencias de entorno, todo eso se da por entendido.

En los siguientes ejemplos se van a repetir los mismos parámetros:

- `dependency:String`: puede ser un id de módulo o una ruta de módulo
   - pero los `id:String` empiezan siempre por `#`
   - y las `file:String` no deberían, pero pueden empezar:
      - por `./file.js` para el `this.basedir`
      - por `../file.js` para el `this.basedir` pero su superior
      - por `@/file.js` para el `this.rootdir`
      - por protocolo `http://` o cualquier otro
      - por ruta absoluta tipo Linux `/some/file.js`
      - el soporte a Windows no está testeado
- `dependencies:Array`: se refiere a un array de `dependency:String`
- `factory:Function`: se refiere a un callback que puede ser `async` y debería hacer `return` con el valor del módulo
- `id:String`: se refiere a una `dependency` pero en lugar de 

### Inyectar desde js a js

```js
$compiler.inject.source("./file.js")
/*@injects:./file.md*/
```

### Inyectar desde js a css

```js
$compiler.inject.source("./file.css")
/*@injects:./file.md*/
```

### Inyectar desde js a md

```js
$compiler.inject.source("./file.md")
/*@injects:./file.md*/
```

### Inyectar desde js a html u otros textos

```js
const texto = $compiler.inject.string("./file.html")
```

### Inyectar desde css a css

```css
/*@injects:./file.css*/
```

### Inyectar desde css a md

```css
/*@injects:./file.md*/
```

### Inyectar desde md a md

```md
/*@injects:./file.md*/
```

Esto será reemplazado antes de volver del `ComilerV6.prototype.compile`, por lo que no se verá luego.

### Firma de importar: dependency:String

```js
await $moduler.import("# Own module name");
await $moduler.import("./file.js");
await $moduler.import("../file.js");
await $moduler.import("@/file.js");
await $moduler.import("/file.js");
await $moduler.import("C:/file.js");
await $moduler.import("//file.js");
await $moduler.import("http://file.js");
```

### Firma de importar: dependencies:Array

```js
const [js, css, md] = await $moduler.import([
   "./file.js",
   "./file.css",
   "./file.md",
]);
```

### Firma de importar: factory:Function

```js
await $moduler.import(async function() {
   return {};
});
```

### Firma de importar: dependencies:Array, factory:Function

```js
await $moduler.import(["#a", "#b", "#c" ], async function(a, b, c) {
   return { a, b, c };
});
```

### Firma de exportar: String:id, dependency:String

```js
await $moduler.export("#name1", "./file.js");
await $moduler.export("#name2", "#previousName1");
```

### Firma de exportar: String:id, dependencies:Array

```js
await $moduler.export("#name3", [
   "./file.js",
   "#previousName2",
]);
```

### Firma de exportar: String:id, factory:Function

```js
await $moduler.export("#name4", function() {
   return 100;
});
```

### Firma de exportar: String:id, dependencies:Array, factory:Function

```js
await $moduler.export("#name5", ["#a", "#b", "#c"], function(a,b,c) {
   return {a,b,c};
});
```

## Explicación teórica

En esta sección se habla de los fundamentos teóricos.

- La API del `CompilerV6` contiene a `ModulerV6` dentro.
- La API de ambos está contenida en un fichero solamente.
   - Pero `CompilerV6` usa `node_modules` y `require`
   - Los ficheros están explicados en la sección de [Cómo se importa](#cómo-se-importa), más adelante.

### ¿De qué se trata?

Se trata de tener una solución ya bien pensada:

- para **modular código básico**
   - js, css, html, md
- en *devtime* y en *runtime*
- para optimizar el diseño y
- para optimizar la carga
- de cada parte de cualquier software final.

Y se consiguen más cosas, pero lo principal es esto.

### ¿Qué resuelven?

> Con CompilerV6 hemos resuelto los puntos de modulación en development-time, con el que optimizamos la carga, y que incluye:

- inyectar js, css y md (con `$compiler.inject.source` o `@injects:`)
- inyectar texto plano desde un fichero (con `$compiler.inject.string`)
- generar ficheros js, css y md distribuibles a partir de esto
- análisis estático de dependencias (basadas en ModulerV6 y CompilerV6)
   - dependencias en development-time: porque las tiene que inyectar
   - dependencias en runtime: porque las parsea igualmente
      - con la excepción de cuando las mezclas con código con variables (del runtime)
      - en tal caso, el análisis estático no puede resolver

> Con ModulerV6 queremos resolver los puntos de modulación en runtime, con el que optimizamos:

- Para js:
   - fabricación funcional de módulos js
   - carga de módulos js asíncronos
   - almacenamiento de módulos js asíncronos
   - compatible con CompilerV6 para análisis estático de dependencias en development-time
- Para css:
   - soporte para módulos css
      - incluyendo parseo de directivas css en runtime
      - incluyendo carga real en la página actual (de navegador) de todos los módulos añadidos
- Para html:
   - soporte para inyección de html como string legible
- Para md:
   - soporte para recolección de documentación en markdown

### ¿Cómo se usan?

Hay que:

- **instalar** el proyecto, por si usas `CompilerV6`, necesitas varias dependencias de node.js
   - si solo quieres usar `ModulerV6` no hace falta, porque no necesita dependencias de node.js
- **importar** el fichero que te interese (según quieras solo `ModulerV6` o `CompilerV6` entero) en el proceso que te interese
   - aunque `CompilerV6` está pensado para el devtime y node.js, e incluye a `ModulerV6` dentro
   - en cambio `ModulerV6` está pensado para el runtime
   - ambos usan también `` está pensado para el runtime

#### ¿Cómo se instala?

Primero, instalarlo con git clone + npm install:

```sh
git clone https://github.com/allnulled/moduler-v6.git .
npm install
```

#### ¿Cómo se importa?

Segundo, insertando por alguna forma con `<script src>` en navegador o `require` en node.js:

- Para usar ambos `CompilerV6` y `ModulerV6`, donde se sobreentiende `node.js` como entorno:
   - `dist/compiler-v6.dist.js`
   - `dist/compiler-v6.min.dist.js`
- Para solamente usar `ModulerV6`:
   - `dist/moduler-v6.dist.js`
   - `dist/moduler-v6.min.dist.js`
