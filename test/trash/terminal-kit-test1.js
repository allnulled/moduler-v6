const terminalKit = require("terminal-kit");
const { terminal: term, TextBox } = terminalKit;

(async () => {

  while (true) {

    term.fullscreen(true);
    term.clear();

    const menu = await term.singleColumnMenu([
      "Nombre",
      "Edad",
      "Ciudad",
      "Salir"
    ]).promise;

    if (menu.selectedIndex === 3) {
      break;
    }

    term.clear();


    const value = await term.inputField({
      default: "valor",
      cancelable: true
    }).promise;

    console.log();
    console.log("Valor:", value);

  }

  term.fullscreen(false);
  term.clear();
  term.grabInput(false);
  process.stdin.pause();
  console.log("Saliendo...");


})();