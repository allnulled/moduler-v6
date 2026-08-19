# Guía de aplicaciones con ModulerV6 para Github Pages

A continuación se explican las features y buenas prácticas a tener en cuenta al crear aplicaciones para Github Pages.


## Índice

- [Guía de aplicaciones con ModulerV6 para Github Pages](#guía-de-aplicaciones-con-modulerv6-para-github-pages)
  - [Índice](#índice)
  - [Principales features asociadas a Github Pages](#principales-features-asociadas-a-github-pages)

## Principales features asociadas a Github Pages

- El `githubPagesSlug` del `@/dev/settings.js`
   - Sirve para decirle a `ModulerV6`
   - Este feature no llegará a existir, porque
      - `ModulerV6` averiguará por su cuenta si está en `*.github.io` o no, y
      - aplicará la configuración necesaria sin pedir más parámetros
- El comando `devbin build github pages` desde `ShadowCommands`
   - Solamente copia `@/dist/www` a `@/docs/dist/www`
- El `$compiler.inject.module` que:
   - hace lo mismo que el `$compiler.inject.source`
   - pero lo wrapea para que `module.exports` y `exports` y todo esto afecte localmente