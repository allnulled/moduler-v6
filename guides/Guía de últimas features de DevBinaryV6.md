# Guía de últimas features de DevBinaryV6

A continuación se explican las últimas features implementadas en las 3 APIs: `ModulerV6`, `CompilerV6` y `DevBinaryV6`.

## Índice

- [Guía de últimas features de DevBinaryV6](#guía-de-últimas-features-de-devbinaryv6)
  - [Índice](#índice)
  - [Lista de features](#lista-de-features)
    - [26-08-2026, miércoles](#26-08-2026-miércoles)
    - [25-08-2026, martes](#25-08-2026-martes)
    - [19-08-2026](#19-08-2026)
    - [18-08-2026](#18-08-2026)

## Lista de features

A continuación la lista, cronológicamente invertida.

### 26-08-2026, miércoles

- Mensaje de commit 1:
   - `el evento touch ahora actualiza los splittable.*.class.js que encajen con el nombre del target y el miembro en el splittable`

- [x] FEATURE: el touch también tiene ahora una ruta por la cual actualiza los miembros de los `splittable.*.class.js`
   - [x] permite que los miembros que ya existen del `splittable.*.class.js` se actualicen si se hace un `touch` a ellos
   - [x] simplemente tienen que darse las condiciones:
      - [x] tiene que hacerse un touch al `{static,prototype}.<name>.js` (no al `splittable.*.js`, esta operación es la que lo actualiza)
      - [x] tiene que coincidir el nombre del fichero con el nombre del miembro (propiedad o método, estático o prototipo) de la clase:
         - [x] el fichero que inicia esta ruta es el `{static,prototype}.<name>.js`
         - [x] y actualiza al `splittable.*.js`
      - [x] la clase del `splittable` tiene que tener ese método definido como prototype o static
   - [x] en tanto que esto se dé, el contenido del fichero será incrustado en el miembro correspondiente del `splittable.*.class.js`

### 25-08-2026, martes

- Mensaje de commit:
   - `ModulerV6.Toolkit y su prototype.toolkit con normalizeParams y normalizeOptions para las apis internas del starter + refrescador usa dev/unlistened.json para saber en vivo los patrones glob a ignorar + DevBinaryV6.prototype tiene mute y unmuteTouchListenerOf para meter y sacar del unlistened.json + touchFile tiene nueva ruta con ficheros splittable.*.class.js donde se pueden editar los campos de los métodos rápidamente + evaluateSource inyecta a mano require y __dirname`

- [x] FEATURE: Se han incorporado la clase ModulerV6.Toolkit con su instancia ModulerV6.prototype.toolkit y dentro los métodos:
   - [x] Las funciones de normalización de los métodos privados de clase según la «Guía de programación de funciones para DevBinaryV6»
     - [x] ModulerV6.Toolkit.prototype.normalizeParams
     - [x] ModulerV6.Toolkit.prototype.normalizeOptions
   - [x] así que se queda porque ha funcionado, pero no entiendo todavía por qué pasa esto
- [x] FEATURE: DevBinaryV6.Refrescador ahora escucha los patrones glob indicados en @/dev/unlistened.json
   - [x] y puedes cambiarlo en devtime que funcionará igualmente
   - [x] esta convención permite la feature que le sigue
- [x] FEATURE: DevBinaryV6 ahora tiene DevBinaryV6.prototype.{muteTouchListenerOf,unmuteTouchListenerOf}
   - [x] permite silenciar/desilenciar patrones glob a la escucha del Refrescador
   - [x] que es la raíz del evento de touchFile
   - [x] los touchFile programáticos siguen siendo atendidos igualmente, por eso
- [x] FEATURE: DevBinaryV6.Utils.prototype.touchFile tiene una ruta de procesamiento nueva
   - [x] si el fichero es un `@/src/**/splittable.*.class.js`
   - [x] solo funciona si dentro hay una clase
   - [x] solo aplica si los métodos son prototype o static
   - [x] guardar un splittable va a hacer que haya cambios en todo el directorio
      - [x] por lo cual, el touchFile hace mutes y unmutes para ignorarlos
      - [x] luego del proceso, y unmutear el directorio, lanzará un touchFile programático al class
   - [x] si tiene un valor de ` = null;` significa que quieres leerlos
   - [x] si tiene un valor de otra cosa significa que quieres sobreescribirlos
   - [x] al final del proceso se vuelve a generar el splittable.class.js pero teniendo esto anterior en cuenta
      - [x] se reconstruye la clase rellenando los null con el valor actual, básicamente
   - [x] explicación añadida en la guia
- [x] BUG: De DevBinaryV6 cuando haces el import.module del dev-binary-v6.dist.js peta por tener comentarios tipo `/**`
   - [x] Cambiar la sintaxis
   - [x] Corregir todos los tests
   - [x] Que este opener `/**` tenga que ser este `/**@:`
   - [x] A ver si así se puede hacer el import.module bien
   - [x] Ha habido que cambiar el beautifier, el `terser` lo estaba jodiendo todo, y el "beautifyJs" con babel nos ha apañado el asunto
- [ ] BUG: De ModulerV6 ha salido la ejecución del unit test del entry se hace 2 veces cuando guardas el fichero .entry.js concretamente:
   - [ ] Y no debería, solo 1 vez
   - [ ] Debería detectar si es la segunda vez o ignorar 1 de las 2
   - [ ] No son dos touch, es 2 unit test exec
- [x] BUG: Se ha hookeado el método ModulerV6.prototype.evaluateSource para que inyecte siempre el require global a la AsyncFunction
   - [x] Pero hay un aviso en comentarios, esto no debería suceder según mi entendimiento
   - [x] porque he hecho una prueba en el repl del nodejs y sí encuentra al require en AsyncFunction, y nada está eclipsando el nombre
   - [x] también ha habido que hacerlo con __dirname

### 19-08-2026

- [x] El comando en dev/bin/build/github/pages/command.js
   - [x] No hay un fichero de comando, se hace con ShadowCommands
   - [x] Solamente copia "dist/www" en "docs/dist/www"
   - [x] Tiene un test en 205
- [x] El $compiler.inject.module
   - [x] Permite módulos doblemente compatibles, con: $moduler.{import,export} y $compiler.inject
   - [x] Tiene un test en 011
- [x] El DevBinary.prototype.command no lanzaba error al no encontrar el comando
   - [x] ahora debería lanzarlo
- [x] El moduler-v6-starter tiene apps en el dist/www:
   - [x] se tienen que poder ver en github pages gracias al comando devbin build github pages
      - [x] gracias a que el basedir del ModulerV6 detecta si estás en github.io
      - [x] y se configura solo para que el rootdir sea la raíz del docs de ese proyecto
      - [x] y sobreentiende que los módulos de distribución están en "@/docs/dist/www" (en producción de github pages)
      - [x] aunque se acceden con "@/dist/www" igualmente
   - [x] se tiene que poder explotar la modulación estática y programática con módulos ambivalentes
      - [x] gracias a $compiler.inject.module y a $moduler.{import,export}
   - [x] se tienen que poder omitir los script tags para bindearlo con el refrescador
      - [x] ModulerV6 sabiendo el entorno debe saber también resolver esos 2 scripts y poder omitirlos del index.html si importas ModulerV6
      - [x] ModulerV6 sabiendo el entorno debe saber también resolver esos 2 scripts y poder omitirlos del index.html si importas ModulerV6
   - [x] Iterar con npm run up hasta que funcione en github pages (?)

- [x] La guía para aplicaciones de Github Pages
   - [x] Explicar la modulación ambivalente
      - [x] $compiler.inject.module para js
      - [x] @injects para css
      - [x] devbin build github pages para compilar
   - [x] Aclarar la historieta de las rutas
      - [x] Que si usas @/dist/www/ se entienden los 2
      - [x] Que si estás en github.io el ModulerV6 automáticamente se asigna el rootdir
   - [x] Tipo all-in-1-HTML 
      - [x] Pero reaprovechando módulos programáticos con $compiler.inject.module

### 18-08-2026

- [x] El `ModulerV6.prototype.{import,export,module}`
   - [x] soportan ahora el prefijo `!` para las rutas
   - [x] este prefijo permite importar igual pero, *si no existe el recurso* (no si el script tiene errores, ojo!), devuelve `undefined` y no lanza error
   - [x] los tests están en 307
- [x] Corregido 1 bug del `Runtime` en el que:
   - [x] en el `Runtime.load`
   - [x] si `@/dist/www/settings.dist.js` no existe, ya no peta
   - [x] porque se importa usando el prefijo `!` precisamente
- [x] 22:40pm Los ficheros html permiten @injects y $compiler.inject.source
   - [x] ahora puedes tener aplicaciones html con todo dentro
   - [x] escapa los cierres de html tag peligrosos en el caso de js y css respectivamente
- [x] Permitir importar ficheros html con el compilador
   - [x] permitir al CompilerV6.prototype._fetchCompilable la extensión de html
   - [x] permitir al CompilerV6.prototype._tokenizeText la extensión de html
   - [x] habilitar un parser forHtml con las gramáticas mínimas de @injects y $compiler.inject.source solamente
   - [x] permitir al CompilerV6.prototype._compileAsInjects la extensión de html
   - [x] preparar un test que compile un html con estas sintaxis
   - [x] permitir al CompilerV6.prototype._compileAsInjectSource la extensión de html
   - [x] pasar el test