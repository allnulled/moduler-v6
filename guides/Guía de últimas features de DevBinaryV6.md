# Guía de últimas features de DevBinaryV6

A continuación se explican las últimas features implementadas en las 3 APIs: `ModulerV6`, `CompilerV6` y `DevBinaryV6`.

## Índice

- [Guía de últimas features de DevBinaryV6](#guía-de-últimas-features-de-devbinaryv6)
  - [Índice](#índice)
  - [Lista de features](#lista-de-features)
    - [19-08-2026](#19-08-2026)
    - [18-08-2026](#18-08-2026)

## Lista de features

A continuación la lista, cronológicamente invertida.

### 19-08-2026

...

### 18-08-2026

- [x] El `ModulerV6.prototype.{import,export}`
   - [x] soportan ahora el prefijo `!` para las rutas
   - [x] este prefijo permite importar igual pero, *si no existe el recurso* (no si el script tiene errores, ojo!), devuelve `undefined` y no lanza error
   - [x] los tests están en 307
   ```js
   await $moduler.import("!./missing.js"); // si missing no existe, simplemente devolverá undefined ahora
   ```
- [x] Corregido 1 bug del `Runtime` en el que:
   - [x] en el `Runtime.load`
   - [x] si `@/dist/www/settings.dist.js` no existe, ya no peta
   - [x] porque se importa usando el prefijo `!` precisamente