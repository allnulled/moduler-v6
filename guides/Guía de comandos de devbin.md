# Guía de comandos de devbin

Esta es la guía oficial de los comandos de `devbin`, el ejecutable por línea de comandos que se puede conseguir haciendo `npm link` por el `package.json#bin/devbin`.

## Índice

- [Guía de comandos de devbin](#guía-de-comandos-de-devbin)
  - [Índice](#índice)
  - [El patrón general del comando de consola](#el-patrón-general-del-comando-de-consola)
  - [El puente con la API](#el-puente-con-la-api)
  - [Comandos iniciales](#comandos-iniciales)
    - [devbin loop](#devbin-loop)
    - [devbin new project](#devbin-new-project)
    - [devbin ensure core](#devbin-ensure-core)
    - [devbin touch](#devbin-touch)
  - [Ventajas](#ventajas)

## El patrón general del comando de consola

- Los comandos del `devbin` siguen siempre el patrón: `devbin <ruta de comando> <parametros>`

## El puente con la API

- El `devbin`, por debajo, siempre llama al método `DevBinaryV6.prototype.command(args:Array<String>)` con un `["devbin", "ruta", "de", "comando", "--parametro1", "valor"]`.
- Si quieres ver ejemplos de cómo se escribe un comando, puedes mirar en el directorio:
   - [@src/DevBinaryV6/ShadowCommands](../src/DevBinaryV6/ShadowCommands)
   - aquí se definen los comandos por defecto del `devbin`
   - `devbin` siempre busca en este orden:
      - primero en `@/dev/bin/<ruta/a/comando>/command.js`
      - segundo en la API de ShadowCommands: `DevBinaryV6.ShadowCommands.prototype`.

## Comandos iniciales

Estos comandos del `devbin` siempre están disponibles.

Son comandos reales con parámetros reales, funcionan por defecto en cualquier proyecto gracias a la *DevBinaryV6 ShadowCommands API*:

```sh
devbin loop # busca en dev/bin/loop/command.js o en la DevBinaryV6/ShadowCommands API
devbin new project # busca en dev/bin/new/project/command.js o en la DevBinaryV6/ShadowCommands API
devbin ensure core # busca en dev/bin/ensure/core/command.js o en la DevBinaryV6/ShadowCommands API
devbin touch # busca en dev/bin/touch/command.js o en la DevBinaryV6/ShadowCommands API
```

### devbin loop

Inicia el loop de escucha de ficheros para el proyecto.

- Cuando se toca a un `*.entry.*` llama al evento `touch`

Parámetros: no tiene.

📚 Si quieres saber más del `devbin loop`, tienes la [Guía del loop de DevBinaryV6](./guides/Gu%C3%ADa%20del%20loop%20de%20DevBinaryV6.md).

### devbin new project

Crea un proyecto desde 0. Requiere el directorio en blanco.

Parámetros:

- `--from` - String - el directorio en blanco desde el cual iniciar un proyecto.

### devbin ensure core

Es como el [`new project`](#devbin-new-project) pero:

- No requiere de un directorio en blanco
- Sobreescribirá los ficheros que requiera

Parámetros: los mismos que [`new project`](#devbin-new-project).

### devbin touch

El evento touch es el evento encargado de compilar y testear los ficheros `*.entry.{js,css,md}`.

El proceso puede ser consultado en estos 2 ficheros:

- [@/src/DevBinaryV6/ShadowCommands/prototype.touch.js](../src/DevBinaryV6/ShadowCommands/prototype.touch.js)
- [@/src/DevBinaryV6/Utils/prototype.touchFile.js](../src/DevBinaryV6/Utils/prototype.touchFile.js)

📚 Si quieres saber más del `devbin touch`, tienes la [Guía del loop de DevBinaryV6](./guides/Gu%C3%ADa%20del%20loop%20de%20DevBinaryV6.md).

⚠️ En desarrollo y con detalles poco estables.

Parámetros:

- `--file` - String - Fichero tocado
- `--uncacheInjections` - Boolean - Si se activa, se salta el cacheo propio del `touch`
- `--trace` - String - Mensaje para traza, debug-purposed.

## Ventajas

- El `devbin` espera ser complementado por el usuario en cada proyecto de forma distinta
   - desde el patrón de ficheros `@/dev/bin/{ruta/a/comando}/command.js` puedes ir expandiendo los comandos del `devbin`
- El `devbin` puede usarse desde cualquier directorio de 1 proyecto:
   - el `devbin` buscará el directorio raíz desde donde fue llamado, hacia arriba
   - que en principio era el primero que tenga un `package.json`
   - y así encontrará los comandos y configuraciones locales por su cuenta
- El `devbin` ofrece los comandos más fundamentales, y de ahí ya puedes personalizar:
   - `devbin new project` - proyecto en blanco
   - `devbin ensure core` - proyecto inyectado
   - `devbin touch` - proceso de compilación de los `*.entry.{js,css,md}`
   - `devbin loop` - el touch en bucle de escucha de ficheros