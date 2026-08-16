# Guía de documentación con CompilerV6

En esta guía se profundiza en cómo documentar con DevBinaryV6/CompilerV6/ModulerV6.

## Índice

- [Guía de documentación con CompilerV6](#guía-de-documentación-con-compilerv6)
  - [Índice](#índice)
  - [DevBinaryV6 en cuanto a documentar](#devbinaryv6-en-cuanto-a-documentar)
  - [Sintaxis de documentación](#sintaxis-de-documentación)
  - [Sintaxis ocultas de documentación](#sintaxis-ocultas-de-documentación)
  - [Aspectos técnicos](#aspectos-técnicos)
  - [Buenas prácticas](#buenas-prácticas)

## DevBinaryV6 en cuanto a documentar

- El framework de `devbin` ya proporciona generación de `*.md` en cada `touch` del `@/src/**/*.entry.js`
- cada `@/dist/**/*.dist.js` puede generar su homólogo `*.md`
   - en la compilación, hay una memoria reservada para `js`, otra para `css`, y otra para `md`
      - pues la única condición para generar el `*.md` es que se aporte información al `md` en la compilación
   - para ello hay varias formas
   - y se explican a continuación
   - estas formas se basan en sintaxis específicas
   - pero la funcionalidad de documentación debería
      - convivir tranquila y silenciosamente en tu desarrollo y
      - armonizar con la jerarquía vertical de dependencias
         - donde cada `*.entry.js` suma 1 nivel de indentación titular
         - pero si no entiendes esto aún, sigue leyendo

## Sintaxis de documentación

Hay varias sintaxis que inyectan contenido al `md` en la compilación.

- El injects con un md
   ```js
   /*@injects:"./fichero.md"*/
   ```
   - no respeta indentación de lista
- El comentario de multilínea
   ```js
   /**
    * Aquí puede ir contenido md. Respeta indentación de lista
    */
   ```
   - sí respeta indentación de lista
- El comentario de incremento de tabulación
   ```js
   ///@+: suma 1 en la indentación de lista
   ///@++: suma 2 en la indentación de lista
   ///@+++: suma 3 en la indentación de lista
   ```
   - sí respeta indentación de lista
- El comentario de decremento de tabulación
   ```js
   ///@-: resta 1 en la indentación de lista
   ///@--: resta 2 en la indentación de lista
   ///@---: resta 3 en la indentación de lista
   ```
   - sí respeta indentación de lista
- El comentario de tabulación precisa
   ```js
   ///@~0: establece la tabulación de lista en 0
   ///@~1: establece la tabulación de lista en 1
   ///@~2: establece la tabulación de lista en 2
   ```
   - sí respeta indentación de lista
- El comentario de nueva línea
   ```js
   ///@: añade una nueva línea
   ```
   - sí respeta indentación de lista
- El comentario de nuevo parágrafo
   ```js
   ///@@: añade un nuevo parágrafo
   ```
   - sí respeta indentación de lista
- El comentario de continuación de línea
   ```js
   ///&: añade un espacio y el texto en la misma línea
   ```
   - no respeta indentación de lista porque no hay salto de línea
- El comentario de continuación de línea sin espacio intercalado
   ```js
   ///&&: añade el texto en la misma línea y sin espacio anterior
   ```
   - no respeta indentación de lista porque no hay salto de línea


## Sintaxis ocultas de documentación

- Además de las anteriores, si en el md pones estos strings, se inyectará cierta información del `entry.js` inmediato en formato md.
   - `{{ Table of contents }}` inyectará una lista tipo índice con los links a los títulos de esta entry
   - `{{ Relations }}` inyectará una lista con las dependencias arrastradas en esta entry
- Estas sintaxis solo aplican al md, y no están en el parser, forman parte de un `replace` tardío que se hace en el proceso de compilación del `touch`


## Aspectos técnicos

- La indentación de lista aplica a las listas
- La indentación de títulos aplica a los títulos
- Las sintaxis suelen respetar la indentación de línea
   - Pero entre ficheros (js), no deberías continuar estas listas
      - Las listas siempre son internas al fichero
   - Este aspecto es importante:
      - Cada fichero (js) debería tener su propio título principal y opcionalmente secundarios
      - El título corta la lista, por tanto, entre ficheros no se propagan las listas
- La indentación titular se incrementa cada vez que añades un nuevo `.entry.js` a la compilación
   - Y se corresponderá a el número de `.entry.js` que cada fichero tiene en la memoria de la compilación
   - Si llevas 4 entry.js de profundidad, los títulos tendrán 4 `#` más del original.

## Buenas prácticas

- Cada entry.js empieza con un título de indentación 0
- Cada fichero debería tener un título de indentación relativa a su propio entry.js
- Las listas no se continúan entre ficheros
- Los comentarios van dentro de la función, clase u objeto, no fuera
   - Hay razones, no es un capricho, pero ahora no las recuerdo
- Que toda la información esté en formato lista ayuda luego a moverse más rápido por la documentación y familiarizarse con sus partes
   - Pero tampoco lo veo una obligación
- Los algoritmos más complicados deberían respetar que:
   - Un nivel de indentación de lista es:
      - O un condicional
      - O un bucle
      - O una función/método/clase/objeto/propiedad
      - O un ámbito propio, en un sentido amplio
   - Se esta forma, al ver la indentación de lista, ves rápidamente en qué nivel de profundidad estás del algoritmo
- Javadoc no... aporta demasiado
   - Puede ir bien, y es suficiente, pero te constriñe y es ambiguo
   - No se ha dado soporte a sintaxis tipo javadoc porque ahora mismo no es prioritario, y no está claro que sea para bien, por un poco de legibilidad
- TypeScript está fuera
   - Su sintaxis de tipos puede ser útil, si no tienes nada, como notación, en el markdown
   - Pero TypeScript es un tooling muy caro de integrar en muuuuchos aspectos, incluyendo potencial de JavaScript
   - Yo, no lo meto, bueno, de hecho, mucho de todo esto es, "porque TypeScript..."
- Meter un `{{ Table of contents }}` y un `{{ Relations }}` por cada entry es clave para tener en la documentación un vistazo rápido efectivo
   - Lo suyo es llamar a cada sección de este tipo, así mismo:
      - `## Table of contents`
      - `## Relations`
   - Y dejarlas en el primer nivel también es lo suyo, que la indentación titular se ocupe
- Vale, esto es importante, en el primer nivel del entry, SOLO va el título, lo demás debería ir dentro
   - La otra opción es no ponerle título dentro
      - sino dejar que el título del entry lo marquen desde fuera
      - no lo he explorado, es una opción, te ahorras 1 nivel de indentación que aportaría claridad