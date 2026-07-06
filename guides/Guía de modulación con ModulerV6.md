# Guía de modulación con ModulerV6

Esta es la guía de modulación con DevBinaryV6.

Con DevBinaryV6 se incluyen CompilerV6 y ModulerV6.

## Definiciones iniciales

- Un **módulo acoplado** se refiere a una **inyección de código** y no a un módulo programático.
   - Hablamos del `CompilerV6.prototype.compile` + `$compiler.inject.source` y variantes.
- Un **módulo desacoplado** se refiere a **un módulo programático** y no a una inyección de código.
   - Hablamos del `ModulerV6.prototype.{import,export}`.
- La **dependencia horizontal**:
   - Se refiere a la relación entre módulos del mismo nivel jerárquico, concretamente en el aspecto de requerirse entre sí.
      - A más dependencia horizontal, más requires cruzados habría entre ellas
   - Es una medida útil para discriminar casos de modulación
      - Cuando la dependencia horizontal es alta, el acoplamiento es más interesante
      - Cuando la dependencia horizontal es baja, el desacoplamiento puede ser más rentable
   - Puede aplicarse a APIs (conjuntos programáticos), estructuras o funciones sueltas incluso
   - Por ejemplo, el caso de una API de ficheros y otra de normalización de rutas
      - Son 2 APIs

## El principal problema que intenta resolver esta guía

Hay diferentes tipos de modulación que encajan con diferentes casuísticas.

Esta guía intenta facilitar averiguar cuál es el método óptimo para cada casuística.

## Las variables principales

Las variables principales *para discriminar el método óptimo de modulación* son:

- La **dependencia horizontal** entre sus partes.
   - Si las funciones internas se necesitan unas a otras mucho, interesa acoplar
   - Si las funciones internas funcionan muy independientes y no se necesitan unas a otras, interesa desacoplar
- La **frecuencia de uso** en general.
   - Si la API es muy utilizada, no importará acoplar
   - Si la API se usa muy esporádicamente, interesa desacoplar
- El **volumen de cómputo total**.
   - Si la API es inmensa, interesa desacoplar
   - Si la API es pequeña, interesa acoplar

Las variables clásicas en computación universal han sido y serán estas:

- La **memoria** a favor del desacoplamiento:
   - Si no te importa llenar la memoria de APIs, interesa acoplar
   - Si no quieres llenar la memoria de APIs, interesa desacoplar
- La **velocidad** a favor del acoplamiento:
   - Si no te importa que cargue lento la lógica de APIs, interesa desacoplar
   - Si no quieres que cargue lento la lógica de APIs, interesa acoplar

Las variables que no deben contar para nada:

- La **reutilización** o la **accesibilidad**
   - Todos los métodos que programes deberían estar accesibles para ser reutilizados
   - El acceso a todas las funciones que modules con acoplamiento **también está accesible programáticamente para reutilización**
      - Incluyendo los prototype de las clases
- El **trackeo**
   - Porque el reporte del compilador también va a cazar las dependencias por inyección (módulo acoplado)

## El ejemplo paradigmático

Con este ejemplo se pretenden abarcar los 3 casos más típicos donde la modulación plantea una respuesta clara:

- Una pool dinámica de comandos independientes:
   - **Dependencia horizontal**: baja
      - Son comandos muy independientes unos de otros
   - **Frecuencia de uso**: baja
      - Esta pool de comandos se utiliza esporádicamente
   - **Volumen de cómputo**: alto
      - Hay muchos comandos
   - Es un caso de óptimamente: **desacoplados**
      - Aunque cada comando tarde un poco en cargar
      - La carga prematura de todos los comandos no interesa por, críticamente, una cuestión de no polucionar la memoria
- Un agrupamiento de APIs de framework, de dominios de uso independientes:
   - **Dependencia horizontal**: mediana-alta
      - Las APIs se van a utilizar entre sí bastante
   - **Frecuencia de uso**: alta
      - Son APIs muy comúnmente usadas en la aplicación
      - No son APIs superraras, algunas más que otras, pero todas útiles
   - **Volumen de cómputo**: bajo
      - Para lo que permiten, son pocos bytes en memoria
   - Es un caso de óptimamente: **acoplados**
      - Sobre todo, la frecuencia de uso y la dependencia horizontal son los discriminadores más importantes
      - Queremos una carga rápida
      - Y sabemos que se utilizará más adelante fácilmente.

Los dos casos anteriores es donde más nos vamos a ver, porque al final son lo mismo pero con diferentes acentos:

- La API de framework es también una API de comandos independientes
   - Pero menos voluminosa
   - Más compacta
   - Más interrelacionada
   - Más incurrida, que comandos satelitales esporádicos
- Y la API de pool de comandos, es también una API, claramente
   - Más abierta, menos definida
   - Menos controlada
   - Menos interrelacionada
   - Pero una API

Al final, en estos dos casos:

- En el caso del framework
   - Haríamos inyecciones de código para modular con acoplamiento.
   - Para conseguir una sola carga rápida
- En el caso de la pool de comandos
   - Haríamos import/export para cargar dinámicamente el comando que quisiéramos.
   - Para conseguir pequeñas cargas lentas y no cargar la memoria

¿Y el tercer caso?

El tercer caso es el punto intermedio: una API grande, pero con muchas (o muy pesadas) APIs satelitales de apoyo.

Este caso, los frameworks suelen resolverlo distinguiendo:

- Una parte de la API es el Core
   - Se carga de 1 vez para todas
   - Incluye lo que tiene más frecuencia de uso
   - Incluye el esqueleto de la dependencia horizontal
- Las otras partes de la API son módulos
   - Se cargan a medida que se precisan de usar

Esto puede verse por ejemplo en APIs grandes como Babylon.js, donde tienes una parte central, pero tienes otras varias satelitales que también forman parte de la API.