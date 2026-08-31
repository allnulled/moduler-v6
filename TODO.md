- [ ] Ahora mismo es: feature de splittable class
   - [ ] Primero crear un muter/unmuter basado en un fichero .mutedir 
      - [ ] que sobreescriba a los de ahora que atacan al listened.js
      - [ ] si ya existía, nada al entrar + no umutear al salir
      - [ ] si no existía, mutear al entrar + DevBinaryV6.Process.on("exit", ?) al salir
         - [ ] si no existía, mutear al entrar + DevBinaryV6.Process.on("exit", ?) al salir
      - [x] hazte una clase/método basado en Reactor para que con
         - [x] compromise = DevBinaryV6.System.Process.on("exit").add(callback)
         - [x] compromise.cancel()
   - [ ] Segundo implementar el muter/unmuter en el método touchFile
      - [ ] Que ignore el evento entero si encuentra un .mutedir
- [ ] Aquí podemos seguir con la splittable class:
   - [ ] Hacemos que en los sincronice use el muter/unmuter
      - [ ] El cual funcionaría solo si al mutear no está muteado
      - [ ] Si ya lo han muteado antes, no cancela el callback ni desmutea el directorio al salir


RESUMEN

- [x] touchFile: meter un has(".mutedir").then(break) al principio
- [x] {un?muteTouchListenerOf}, que se usan en los synchronizeSplittable que usen el .mutedir + DevBinaryV6.System.Process.on("exit") + {cancel()}
   - [x] Lo tenemos, jiuston. Jiuston, jiuston. 
   - [x] Con apaño al final, pero... lo tenemos.

Y yastáaaaaaaaaaaaa, tanto roollo tanto rooooollo, hombré!