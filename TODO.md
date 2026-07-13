Estamos con el src/CompilerV6/prototype._compileAsInjectTemplate.js

Queremos que pueda compilar el $compiler.inject.template
  - Debe aceptar un string para el file
  - Debe aceptar un parámetros para la template
  - Y no tenemos el render todavía
    - Podríamos usar TJS
      - Pero tiene muchos métodos innecesarios
      - Y si lo hacemos con este no sé,
         - no es tanto vaya
         - y para mantener a 2, mejor claramente este
         - que le hago pim y le meto una nueva

Hay algunos fallos menores acumulados:

- Sections, retirarlo del analizer, mala suerte tú, files y gou
- El parser duplica el match en outer y en text
- El parser duplica contenidos en token y en formatter
- Faltan traceos de métodos dinámicos (estáticos mala suerte tú)
  - En el moduler/compiler y devbinary creo que no tiene ni 1
