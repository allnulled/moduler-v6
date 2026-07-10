# moduler-v6

Proyecto para desarrollo modular basado en JS, CSS y HTML.

## Índice

- [moduler-v6](#moduler-v6)
  - [Índice](#índice)
  - [Instalación](#instalación)
  - [Requisitos](#requisitos)
  - [Composición](#composición)
  - [Usos](#usos)
  - [Documentación complementaria](#documentación-complementaria)

## Instalación

```sh
git clone https://github.com/allnulled/moduler-v6.git .
npm install
```

## Requisitos

- Utiliza los módulos `node_modules` especificados en el [package.json#devDependencies](./package.json).
- No utiliza ningún módulo `node_modules` en producción, por lo que el [package.json#dependencies](./package.json) está vacío.

## Composición

En el proyecto se incluyen 3 ficheros distribuibles:

- `dist/moduler-v6.dist.js`
   - para modulación en runtime
   - el más ligero y versátil
   - pensado para soporte cross-environment (browser y node.js)
   - incluye un parser-factory
- `dist/compiler-v6.dist.js`
   - para modulación en devtime
   - pensado para node.js con `require` y no `import`/`export`
   - incluye a `moduler-v6.dist.js`
- `dist/dev-binary-v6.dist.js`
   - para automatizar el devtime
   - como herramientas de soporte para el devtime
   - pensado para node.js con `require` y no `import`/`export`
   - incluye a `moduler-v6.dist.js` y a `compiler-v6.dist.js`

## Usos

- Para modular mediante ficheros código js, css o md
- Para modulación en compilation-time: el `CompilerV6`
   - Tienes `$compiler.inject.source`
   - Tienes `$compiler.inject.string`
   - Tienes `/*@injects:"./file.{js,css,md}"*/`
- Para modulación en runtime: el `ModulerV6`
   - Tienes `$moduler.import`
   - Tienes `$moduler.export`
   - Tienes `/*@requires:"./file.{js,css,md}"*/`
- Para modulación jerárquica: el `DevBinaryV6`
   - Tienes la propagación del evento *touch* del `DevBinaryV6`
   - Compila los `*.entry.{js,css,md}` que encuentre en directorios superiores

## Documentación complementaria

- [Fundamentos de ModulerV6 y CompilerV6](./guides/Fundamentos%20de%20ModulerV6%20y%20CompilerV6.md)
   - Se explican las firmas básicas de modulación:
      - `$compiler.inject.source`
      - `$compiler.inject.string`
      - `/*@injects:"./file.js"*/`
      - `$moduler.import`
      - `$moduler.export`
      - `/*@requires:"./file.js"*/`
- [Guía de modulación con ModulerV6](./guides/Gu%C3%ADa%20de%20modulaci%C3%B3n%20con%20ModulerV6.md)
   - Se explican los criterios típicos para determinar el tipo de modulación óptima
   - Se incluye algún ejemplo práctico pero de forma abstracta, no código
- [Guía del loop de DevBinaryV6](./guides/Gu%C3%ADa%20del%20loop%20de%20DevBinaryV6.md)
   - Se explican los pasos que sigue el evento *touch* de (todas van al mismo sitio):
      - el comando `devbin loop` desde línea de consola
      - la llamada a `DevBinaryV6.prototype.shadowCommands.loop`
      - el método `DevBinaryV6.ShadowCommands.prototype.loop`
      - van a `DevBinary.Utils.prototype.touchFile`
- [Guía de comandos de devbin](./guides/Gu%C3%ADa%20de%20comandos%20de%20devbin.md)
   - Se explican los pasos que sigue el evento *touch* de (todas van al mismo sitio):
