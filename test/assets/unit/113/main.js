/**
 * Esto es un bloque de markdown.
 * 
 * Al principio tiene un salto de línea.
 * 
 */
///@@: Esto es un nuevo párrafo
///@@: Esto es otro nuevo párrafo

///@: Esto es una nueva línea con la misma tabulación, que se acopla al párrafo.

$compiler.inject.source("./interno.js")

///@~0: - Puedes empezar listas así
///@~0: - Esto es una nueva línea con tabulación 0
///@~1: - Esto es una nueva línea con tabulación 1
///@~2: - Esto es una nueva línea con tabulación 2
///@~3: - Esto es una nueva línea con tabulación 3

///@~0: - Inicio
///@+: - Esto es una nueva línea con +1 de tabulación
///@~0: 
///@++: - Esto es una nueva línea con +2 de tabulación
///@~0: 
///@+++: - Esto es una nueva línea con +3 de tabulación

///@~5: - Aquí lo hemos puesto en tabulación 5 a mano
///@~6: - Aquí lo hemos puesto en tabulación 6 a mano
///@-: - Esto es una nueva línea con -1 de tabulación
///@--: - Esto es una nueva línea con -2 de tabulación
///@---: - Esto es una nueva línea con -3 de tabulación


///@&: y esto es la continuación de la línea anterior con 1 espacio
///@&&:  y esto es la continuación de la línea anterior sin espacios