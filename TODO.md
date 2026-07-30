TODO claro y conciso:

- Vale, el www está medio-solucionado porque básicamente los 2 entornos apuntan a: dist/www
- Es decir, igual no es muy elegante, pero te quita de un percal-que-flipas
   - El percal consiste en que un símbolo extra para referirse al entorno es super-ambiguo
   - Y todo sería para parchear el slug intermedio entre el rootdir del "dist/www"
   - Y estarías obligado a desambiguar, según el entorno, en todo el medio de varias funciones calientes
      - desde normalizationOf, rootdirOf
      - hasta import, export, etc.
      - probablemente el normalizationOf sea el más conflictivo porque no siempre estás opinionándote
      - es una feature de lo más indeseable y complicada
      - todo esto se subsana con el slug "dist/www" que permite acceder:
         - acceso de forma uniforme
         - desde nodejs y browser por igual
         - a los módulos de distribución
      - fin, así se cierra este conflicto.

- Entonces, pasamos al siguiente conflicto: el dev/settings.js
   - El dev/settings.js es uno, y
   - El src/www/dev/settings.entry.js es otro
   - En el browser lo que haces es: `$moduler.import("@/dist/www/dev/settings.dist.js")`
      - Aquí estás importando los settings del moduler-v6
         - es compatible con el browser
         - y es compatible con el nodejs
   - En el nodejs lo que haces es: `$moduler.importFile("@/dev/settings.js")` (o con el require, vaya)
      - Aquí estás importando los settings del devbinary-v6 realmente
         - no es compatible con el browser
         - solo es compatible con el nodejs