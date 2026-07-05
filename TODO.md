OK: lógica del import
OK: lógica del export
OK: css manager (mínimo)
FALTA: el normaliztionOf bueno lo tiene el moduler, hay que pasárselo al compiler
  PROBLEMA 1: el del Moduler no sirve para pasar los tests del Compiler: habría que ver de imitar más al de node.js en el del Moduler
  PROBLEMA 2: el basedir del compiler debería venir directamente del basedir del moduler, así te aseguras que no hay incongruencias
  PROBLEMA 3: el rootdir del compiler debería venir directamente del rootdir del moduler, así te aseguras que no hay incongruencias
    SOLUCIÓN: parece que el proxy sería una solución, pero una clase específica para ResolvablePath sería mejor idea
    - con prototype.normalizationOf
    - con prototype.basedirOf
    - con prototype.rootdirOf
    - con prototype.basedir
    - con prototype.rootdir
    - con prototype.prevdir
FALTA: la base para el cli del dev: DevBinaryV6
