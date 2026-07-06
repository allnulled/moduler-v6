OK: lógica del import
OK: lógica del export
OK: css manager (mínimo)
OK: el normaliztionOf bueno lo tiene el moduler, hay que pasárselo al compiler
FALTA: la base para el cli del dev: DevBinaryV6

const devbin = DevBinaryV6.create("path/to/rootdir");

devbin.command(["touch", "--file", "whatever.js"])
devbin.selfDispatch - para llamar a command automáticamente con los process.argv
devbin.compiler
devbin.moduler
devbin.utils.<y aquí sí va toda la pesca>

Los comandos mínimos que se esperan en la misma api son:

- devbin.hooks["new project"]
- devbin.hooks.touch
- devbin.hooks.loop