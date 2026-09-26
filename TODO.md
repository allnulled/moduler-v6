NEXT COMMIT:

la global $moduler será siempre global, el import inyecta otra variable diferente, $localModuler, para poder usar el basedir.

- [ ] CAMBIO GORDO: en lugar de inyectar $moduler, inyectaremos $localModuler
   - [ ] porque si no, nos jode la variable global en todos lados
   - [ ] todo por la mierda del basedir, que:
      - [ ] SÍ SE USA, ojo cuidado, es una feature muy demandada
      - [ ] PERO no a costa de la variable global $moduler, que tiene que ser indistinguiblemente accesible
      - [ ] y pensábamos, bueno, que eclipse a la global
         - [ ] y así, en los casos donde estamos usándola como variable global, que se distinga accediendo a ModulerV6.globalInstance o $globalModuler
         - [ ] pero NO ES ASÍ:
            - [ ] el $moduler lo queremos usar SIEMPRE y FÁCIL y DESAMBIGUADAMENTE
            - [ ] el $localModuler, en cambio, es siempre para la feature del basedir, siempre va con "./"
            - [ ] entonces, no nos interesa distinguir cuándo usamos $moduler como local o como global
            - [ ] nos interesa mucho más tener la global en $moduler siempre
               - [ ] y si hace falta, sacrificar el $moduler.import("./...")
               - [ ] porque se usa muy poco y en desarrollos ya avanzados
               - [ ] pero la global $moduler tiene utilidades interesantes que sí queremos utilizar dentro de funciones
                  - [ ] $moduler.utils.{normalizeObject,normalizeParameters,normalizeOptions}
                  - [ ] $moduler.normalizationOf
                  - [ ] $moduler.rootdirOf
                  - [ ] $moduler.utils.makeClass
                  - [ ] $moduler.utils.makeInterface
                  - [ ] entonces, nos cargamos el eclipsador de "$moduler" con instancia local
                  - [ ] y lo reemplazamos con $localModuler
                     - [ ] corregimos los tests que hagan falta
                     - [ ] y subimos, cambio gordo.