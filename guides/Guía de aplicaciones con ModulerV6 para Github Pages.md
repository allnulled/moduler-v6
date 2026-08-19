# Guía de aplicaciones con ModulerV6 para Github Pages

A continuación se explican las features y buenas prácticas a tener en cuenta al crear aplicaciones para Github Pages.


## Índice

- [Guía de aplicaciones con ModulerV6 para Github Pages](#guía-de-aplicaciones-con-modulerv6-para-github-pages)
  - [Índice](#índice)
  - [Principales features asociadas a Github Pages](#principales-features-asociadas-a-github-pages)
    - [El comando devbin build github pages](#el-comando-devbin-build-github-pages)
    - [La sintaxis $compiler.inject.module](#la-sintaxis-compilerinjectmodule)
    - [El basedir del ModulerV6.constructor](#el-basedir-del-modulerv6constructor)
  - [Buenas práticas](#buenas-práticas)
    - [El fichero index de la landing page](#el-fichero-index-de-la-landing-page)
    - [Los ficheros de app de la landing page](#los-ficheros-de-app-de-la-landing-page)
    - [La mejor combinación de técnicas de modulación](#la-mejor-combinación-de-técnicas-de-modulación)
      - [Mejor module.exports que return](#mejor-moduleexports-que-return)
      - [Mejor moduler.import que moduler.export por ahora](#mejor-modulerimport-que-modulerexport-por-ahora)
      - [Mejor rutas enraizadas que relativas](#mejor-rutas-enraizadas-que-relativas)
      - [Mejor compiler.inject.module que moduler.import](#mejor-compilerinjectmodule-que-modulerimport)

## Principales features asociadas a Github Pages

A continuación se explican algunas features asociadas.

### El comando devbin build github pages

- El comando `devbin build github pages` desde `ShadowCommands`
   - Copia `@/dist/www/**` a `@/docs/dist/www/**`
   - Copia `@/dist/www/index.html` a `@/docs/index.html`
   - Copia `@/dist/www/app.dist.js` a `@/docs/app.dist.js`
   - Copia `@/dist/www/app.dist.css` a `@/docs/app.dist.css`

### La sintaxis $compiler.inject.module

- El `$compiler.inject.module` que:
   - Hace lo mismo que el `$compiler.inject.source`
   - Pero lo wrapea para que `module.exports` y `exports` afecte localmente
- Es la más nueva
- Es la que al final es más recomendable por su **ambivalencia sintáctica**:
   - Funciona en node.js si lo usas con `module.exports` o `exports.<prop>`
   - Funciona en browser aunque lo uses con `module.exports` o `exports.<prop>`
   - Funciona con `$compile.inject.module` para compilation time
   - Funciona con `$module.{import,export}` para runtime
   - Las rutas se mantienen igual si usas `@/` entre *compilación* o *importación*

### El basedir del ModulerV6.constructor

- En el `ModulerV6.constructor` se tiene que decidir el `this.basedir` de la instancia
- Hay un hook para que, si estás en `*.github.io`:
   - tome el nombre del proyecto: `*.github.io/<project>`
   - y use la URL que sale como `basedir` / `rootdir`
   - esto es siempre: en el caso de por defecto, no si le pasas un `basedir` explícito
      - y el `ModulerV6.globalInstance` es este caso, porque se construye con `new this()` tal cual

## Buenas práticas

A continuación se explican algunas buenas prácticas.

### El fichero index de la landing page

- Tu aplicación en Github Pages quiere un `index.html`
- Todo el `@/dist/www` se copia, pero en `@/docs/dist/www`, por lo cual no puedes pasar un `index.html` a la raíz del `docs`
- El comando `devbin build github pages` sí toma de `@/dist/www/index.html` y lo pone en `@/docs/index.html`
- Estos 3 ficheros tienen propiedades especiales por esta misma razón:
   - `@/dist/www/index.html`
   - `@/dist/www/app.dist.js`
   - `@/dist/www/app.dist.css`
- El desarrollo lo haces con `refrescador` pero la producción está con `github pages`
   - este es el conflicto que queremos aclarar en esta guía
   - los links del js pueden usar `ModulerV6.prototype.normalizationOf`
   - pero los links del css necesitan rutas más deterministas
   - y los links del html también
      - de momento tienes el método `ModulerV6.updateAllHtmlLinks`
      - que te apaña los links tipo `<a data-mv6-href="@/ruta/relativa.js">` del html
      - pero es una solución para hacer una landing global de links internos y ya
      - si quieres más, usas `vue2` o el que quieras tú
         - y ahí ya tienes el `normalizationOf` otra vez

### Los ficheros de app de la landing page

- Los ficheros `@/dist/www/app.dist.{js,css}` también tienen la misma política de enviarse al `@/docs` con `devbin build github pages`.
- Los links del js tienes `ModulerV6.prototype.normalizationOf`
- Los links del css no tenemos una solución todavía como definitiva

### La mejor combinación de técnicas de modulación

Como has visto, hay muchas formas de modular, pero no todas tienen los mismos beneficios. A continuación se explican las mejores técnicas.

#### Mejor module.exports que return

- `module.exports` para comunicarse con el script invocador
   - `return` no porque rompe compatibilidad con node.js

#### Mejor moduler.import que moduler.export por ahora

- `$moduler.import` para incorporar lógica externa
- `$moduler.export` te fuerza a definir un `#Section`
   - pero te interesa tener las definiciones en el `ModulerV6.prototype.settings.data.sectionsMap`
   - porque así consigues cargar módulos según su nombre de sección
      - y no al revés, cargar secciones por su nombre de módulo, que es lo que haces con `$moduler.export`
   - el problema es que `ModulerV6.prototype.settings.data.sectionsMap` sobreescribe la sección
      - y `$moduler.export` también
      - y ahora mismo está como que eso no debería suceder, y salta error
      - si en el futuro esta feature cambiase y `$moduler.export` no petara, podría volverse la mejor opción
         - e incluso extraer las `sectionsMap` de los tokens
         - pero no estamos en ese punto
         - ahora mismo las `sectionsMap` se tienen que poner manualmente
            - porque los `$moduler.export` no significan nada para `sectionsMap`

#### Mejor rutas enraizadas que relativas

- `@/rutas/relativas.js` es la sintaxis preferible para rutas universales
   - y `@/dist/www/` sigue siendo la raíz del repositorio en general
   - la razón es que es inmune a deslocalización
      - no le afecta el `basedir`, se basa en el `rootdir` que es fijo en toda la aplicación
      - si ese fichero lo copias y pegas luego en otro lado, no es problema

#### Mejor compiler.inject.module que moduler.import

- La idea es que los módulos te puedan servir tanto para modulación en runtime como en compilation time
   - con `$moduler.{import,export}` puedes modular en runtime 
      - esto implica llamadas AJAX mediando que son muy lentas comparado
   - con `$compiler.inject.{source,module}` puedes modular en devtime/compilation time
      - esto es preferible
      - porque la carga de la aplicación es más rápida
   - la gracia es que los módulos puedan usarse con ambas estrategias de modulación
      - pero al final uno tiene que decidir con cuál y de qué forma
      - pues módulos estáticos mejor que runtime, por performance básicamente