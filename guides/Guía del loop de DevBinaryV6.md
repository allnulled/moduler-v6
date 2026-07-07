# Guía del loop de DevBinaryV6

Esta es la guía del loop de DevBinaryV6.

## Índice

- [Guía del loop de DevBinaryV6](#guía-del-loop-de-devbinaryv6)
  - [Índice](#índice)
  - [Comando que inicia el loop](#comando-que-inicia-el-loop)
  - [Jerga de la API](#jerga-de-la-api)
  - [Pasos del touch](#pasos-del-touch)
  - [Patrones de ficheros o directorios sensibles en el loop](#patrones-de-ficheros-o-directorios-sensibles-en-el-loop)
  - [Directorios y ficheros importantes en el loop](#directorios-y-ficheros-importantes-en-el-loop)

## Comando que inicia el loop

El comando que inicia el loop, desde la consola, es:

```sh
devbin loop
```

La función que inicia el loop dentro, es:

```js
await $devbin.shadowCommands.loop(["--arg", "something"]);
await $devbin.shadowCommands.loop({ arg: "something" });
await $devbin.command(["loop", "--arg", "something" ]);
await $devbin.command({ _:["loop"], arg: "something" });
```

## Jerga de la API

- El *loop* consiste en escucha cambios en ficheros y reaccionar, sea compilando código o documentación, ejecutando tests, o lo que sea.
- El *touch* es la acción de *"tocar un fichero"*. Esta es la acción que el loop dispara cuando un fichero sensible es modificado.

## Pasos del touch

A continuación se explican los pasos del touch, la acción del loop:

- 1. Mira si el fichero es `*.entry.{js,css,md}`:
- 2. Si no lo es:
   - 2.a. Busca un entry superior y vuelve a empezar estos pasos
   - 2.b. Si no encuentra un entry superior y llega al root, retorna.
- 3. Si sí lo es:
   - 3.1. Crea el `dist/{dir}/{filename}.dist.{js,css,md}`
   - 3.2. Crea el `test/unit/{dir}/{filename}.test.js` si no existe ya
      - Que debe exportarse en una función
      - Que esta función importa al devbin sacado mediante path.relative al fabricar este fichero
      - 
   - 3.3. Ejecuta el test y muestra los resultados
   - 3.4 {= 2.a}. Busca un entry superior y vuelve a empezar estos pasos
   - 3.5 {= 2.b}. Si no encuentra un entry superior y llega al root, retorna.

## Patrones de ficheros o directorios sensibles en el loop

Hay una serie de patrones de rutas de fichero o directorio que pueden interferir en el loop:

- Los `src/**/*.entry.{js,css,md}` son los ficheros susceptibles de procesarse por el loop
   - Te permite compilar APIs recursivamente
   - Los que no acaben con `.entry.{js,css,md}` no disparan el touch del loop dentro del directorio `@/src`
- Los `test/**/*.test.{js,css,md}` son ficheros susceptibles de disparar una auto-ejecución
   - Te permite probar el test mientras lo manipulas
   - Los que no acaben con `.test.{js,css,md}` no disparan el touch del loop dentro del directorio `@/test`

## Directorios y ficheros importantes en el loop

Los directorios importantes son:

- `dist/{dir}/{filename}.dist.{js,css,md}`:
   - donde `{dir}` es el directorio del fichero cambiado desde el rootdir del proyecto
   - donde `{filename}` es el nombre del fichero cambiado, sin la extensión
   - en esta ruta se van sobreescribiendo los distribuibles que generan los `src/**/*.entry.js`
- `test/unit/{dir}/{filename}.test.{js,css,md}`:
   - en esta ruta se van sobreescribiendo los tests unitarios para cada `src/**/*.entry.js`